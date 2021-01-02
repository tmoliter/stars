from skyfield.api import load
import re
import math

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