from skyfield.api import load
import pandas as pd
import re
import calendar
import math
from skyfield.magnitudelib import planetary_magnitude
from data.dates import dates

ts = load.timescale()

def convert_body_to_name(body):
    non_alphabet = re.compile('[^a-zA-Z]')
    barycenter_string = re.compile(re.escape('barycenter'), re.IGNORECASE)
    half_cleaned = non_alphabet.sub("",body.target_name)
    return barycenter_string.sub("", half_cleaned).capitalize()

def ra_to_sha(ra):
    return 360 - ra

def find_sha_offset(year,month,days,sun,earth):
    sun_shas = [ra_to_sha(earth.at(ts.utc(year, month, day)).observe(sun).apparent().radec(epoch='date')[0]._degrees) for day in days]
    return sum(sun_shas)/len(sun_shas)

def ra_to_offset_sha(ra, offset):
    sha = ra_to_sha(ra)
    return sha - offset if sha > offset else 360 + sha - offset

def dec_to_ecliptic_lat(dec_degrees, ra_degrees):
    return dec_degrees - math.degrees(math.atan(math.sin(math.radians(ra_degrees)) * math.tan(math.radians(23.4))))

def get_planet_data(dates):
    """
    Takes a dictionary of dates and returns planetary data formatted for csv upload
    Example input:
    {
      2020 : {
        1 : [2,10,31],
        2: [5,8,28]
      },
      2021 : {
        1 : [1,5,14,31],
        2 : [4,8,28]
      }
    }
    """

    planets = load('de421.bsp')
    earth = planets["earth"]
    other_bodies = planets["venus"], planets["mars"], planets["jupiter barycenter"], planets["saturn barycenter"], planets["sun"], planets["moon"], planets["mercury"]
    venus, mars, jupiter, saturn, sun, moon, mercury = other_bodies
    data_dict = {"DATES":[]}

    sha_offset_data = {"MONTH":[],"sha_offset":[]}
    magnitudes = {
      "Mercury Magnitude": [],
      "Venus Magnitude": [],
      "Jupiter Magnitude": [],
    }

    for year, monthly_data in dates.items():
        for month, days in monthly_data.items():
            sha_offset = find_sha_offset(year,month,days,sun,earth)
            sha_offset_data["MONTH"].append(f"{calendar.month_name[month]} {year}")
            sha_offset_data["sha_offset"].append(sha_offset)

            for day in days:
                data_dict["DATES"].append((f"{month}/{day}/{year}"))

                here = earth.at(ts.utc(year, month, day))

                for body in other_bodies:
                    body_name = convert_body_to_name(body)
                    offset_sha_name = body_name + " sha_offsetSHA"
                    ecliptic_lat_name = body_name + " ecliptic_lat"

                    if not data_dict.get(offset_sha_name):
                        data_dict[offset_sha_name] = []
                    if not data_dict.get(ecliptic_lat_name):
                        data_dict[ecliptic_lat_name] = []

                    apparent = here.observe(body).apparent()

                    ra, dec, dis = apparent.radec(epoch='date') 

                    if body_name + " Magnitude" in magnitudes.keys():
                        magnitudes[body_name + " Magnitude"].append(planetary_magnitude(apparent))

                    data_dict[offset_sha_name].append(ra_to_offset_sha(ra._degrees, sha_offset))
                    data_dict[ecliptic_lat_name].append(dec_to_ecliptic_lat(dec._degrees, ra._degrees))

    data_dict.update(magnitudes)
    return (data_dict, sha_offset_data)

data, sha_offset_data = get_planet_data(dates)

planet_df = pd.DataFrame(data)
planet_df.to_csv("./output_files/sha_offsetSHA_and_ecliptic_lats_2020-2021.csv", index=False)
sha_offset_df = pd.DataFrame(sha_offset_data)
sha_offset_df.to_csv("./output_files/sha_offsets_2020-2021.csv", index=False)

