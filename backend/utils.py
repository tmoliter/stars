from models.planet import ExobodyNames, Planet
from typing import Dict, List
from skyfield.api import load
from skyfield import almanac
import math
from datetime import datetime
from data import eph

from skyfield.magnitudelib import planetary_magnitude

earth = Planet("Earth")
sun = Planet(ExobodyNames.Sun)
ts = load.timescale()


def get_lunar_dates_and_phases(start: datetime, end: datetime):
    times, phases = almanac.find_discrete(
        ts.from_datetime(start), ts.from_datetime(end), almanac.moon_phases(eph)
    )
    return [(time.utc_datetime(), phases[i]) for i, time in enumerate(times)]


def monthly_date_list_to_flat_datetimes(year, month, days: List[int]):
    return [datetime(year, month, day) for day in days]


def yearly_date_dict_to_flat_datetimes(year, dates: Dict[int, List[int]]):
    return [
        date
        for monthly_dates in [
            monthly_date_list_to_flat_datetimes(year, month, days)
            for month, days in dates.items()
        ]
        for date in monthly_dates
    ]


def ra_to_sha(ra):
    return 360 - ra


def find_sha_offset(dates: datetime):
    sun_shas = []
    for date in dates:
        sun_shas.append(
            ra_to_sha(
                earth.get_body()
                .at(ts.utc(date.year, date.month, date.day))
                .observe(sun.get_body())
                .apparent()
                .radec(epoch="date")[0]
                ._degrees
            )
        )
    return sum(sun_shas) / len(sun_shas)


def ra_to_offset_sha(ra, offset):
    sha = ra_to_sha(ra)
    return sha - offset if sha > offset else 360 + sha - offset


def dec_to_ecliptic_lat(dec_degrees, ra_degrees):
    return dec_degrees - math.degrees(
        math.atan(math.sin(math.radians(ra_degrees)) * math.tan(math.radians(23.4)))
    )


def get_planetary_plot_data(start: datetime, end: datetime, planets: List[Planet]):

    dates = [data[0] for data in get_lunar_dates_and_phases(start, end)]
    sha_offset = find_sha_offset(dates)
    planetary_plotting_data = {}

    for planet in planets:
        for date in dates:
            here = earth.get_body().at(ts.utc(date.year, date.month, date.day))
            apparent = here.observe(planet.get_body()).apparent()

            ra, dec, dis = apparent.radec(epoch="date")

            x, y = (
                ra_to_offset_sha(ra._degrees, sha_offset),
                dec_to_ecliptic_lat(dec._degrees, ra._degrees),
            )

            if not planetary_plotting_data.get(planet.get_name()):
                planetary_plotting_data[planet.get_name()] = []
            planetary_plotting_data[planet.get_name()].append(
                {
                    "x": x,
                    "y": y,
                    "magnitude": planet.get_magnitude(date),
                    "color": planet.get_color(),
                    "date": date.strftime("/%-m/%d/%y"),
                }
            )

    return planetary_plotting_data
