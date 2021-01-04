import itertools
from typing import Dict, List, Tuple
from skyfield.api import load
import re
import math
from datetime import datetime
import enum

from skyfield.magnitudelib import planetary_magnitude

planets = load("de421.bsp")
earth = planets["earth"]


class Exobody(enum.Enum):
    Sun = "Sun"
    Moon = "Moon"
    Jupiter = "Jupiter"
    Saturn = "Saturn"
    Venus = "Venus"
    Mars = "Mars"
    Mercury = "Mercury"


EXOBODY_BINARY_MAPPING = {
    Exobody.Sun: planets["sun"],
    Exobody.Moon: planets["moon"],
    Exobody.Jupiter: planets["jupiter barycenter"],
    Exobody.Saturn: planets["saturn barycenter"],
    Exobody.Venus: planets["venus"],
    Exobody.Mars: planets["mars"],
    Exobody.Mercury: planets["mercury"],
}
EXOBODY_COLORS = {
    Exobody.Sun: "yellow",
    Exobody.Moon: "grey",
    Exobody.Jupiter: "maroon",
    Exobody.Saturn: "orange",
    Exobody.Venus: "aqua",
    Exobody.Mars: "crimson",
    Exobody.Mercury: "fuchsia",
}
EXOBODY_MEAN_MAGNITUDE = {
    Exobody.Sun: 7 + 26.74,
    Exobody.Moon: 7 + 12.74,
    Exobody.Jupiter: 7 + 2.20,
    Exobody.Saturn: 7 - 0.46,
    Exobody.Venus: 7 + 4.14,
    Exobody.Mars: 7 - 0.71,
    Exobody.Mercury: 7 - 0.23,
}

ts = load.timescale()


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
    sun_shas = [
        ra_to_sha(
            earth.at(ts.utc(date.year, date.month, date.day))
            .observe(EXOBODY_BINARY_MAPPING[Exobody.Sun])
            .apparent()
            .radec(epoch="date")[0]
            ._degrees
        )
        for date in dates
    ]
    return sum(sun_shas) / len(sun_shas)


def ra_to_offset_sha(ra, offset):
    sha = ra_to_sha(ra)
    return sha - offset if sha > offset else 360 + sha - offset


def dec_to_ecliptic_lat(dec_degrees, ra_degrees):
    return dec_degrees - math.degrees(
        math.atan(math.sin(math.radians(ra_degrees)) * math.tan(math.radians(23.4)))
    )


def get_magnitude(date: datetime, body: Exobody):
    if body in [Exobody.Mercury, Exobody.Venus, Exobody.Jupiter]:
        here = earth.at(ts.utc(date.year, date.month, date.day))
        apparent_magnitude = planetary_magnitude(
            here.observe(EXOBODY_BINARY_MAPPING[body]).apparent()
        )
        return abs(apparent_magnitude) * 10
    else:
        return EXOBODY_MEAN_MAGNITUDE[body] * 10


def get_planetary_plot_data(dates: List[datetime], bodies: List):
    """
    Example return:
    {
      "Sun" : {
        datetime(12/25/20): (x, y, magnitude, color),
        datetime(12/25/21): (x, y, magnitude, color),
      },
      "Mercury" : {
        datetime(12/25/20): (x, y, magnitude, color),
        datetime(12/25/21): (x, y, magnitude, color),
      }
    }
    """

    sha_offset = find_sha_offset(dates)
    planetary_plotting_data = {}

    for body in bodies:
        for date in dates:
            here = earth.at(ts.utc(date.year, date.month, date.day))
            apparent = here.observe(EXOBODY_BINARY_MAPPING[body]).apparent()

            ra, dec, dis = apparent.radec(epoch="date")

            x, y = (
                ra_to_offset_sha(ra._degrees, sha_offset),
                dec_to_ecliptic_lat(dec._degrees, ra._degrees),
            )

            if not planetary_plotting_data.get(body.value):
                planetary_plotting_data[body.value] = []
            planetary_plotting_data[body.value].append(
                (x, y, get_magnitude(date, body), EXOBODY_COLORS[body])
            )

    return planetary_plotting_data
