from datetime import datetime
from skyfield.api import load
from skyfield.magnitudelib import planetary_magnitude
import enum

from data import eph

ts = load.timescale()


class ExobodyNames(enum.Enum):
    Sun = "Sun"
    Moon = "Moon"
    Jupiter = "Jupiter"
    Saturn = "Saturn"
    Venus = "Venus"
    Mars = "Mars"
    Mercury = "Mercury"


EXOBODY_BINARY_MAPPING = {
    ExobodyNames.Sun: eph["sun"],
    ExobodyNames.Moon: eph["moon"],
    ExobodyNames.Jupiter: eph["jupiter barycenter"],
    ExobodyNames.Saturn: eph["saturn barycenter"],
    ExobodyNames.Venus: eph["venus"],
    ExobodyNames.Mars: eph["mars"],
    ExobodyNames.Mercury: eph["mercury"],
}
EXOBODY_COLORS = {
    ExobodyNames.Sun: "yellow",
    ExobodyNames.Moon: "grey",
    ExobodyNames.Jupiter: "maroon",
    ExobodyNames.Saturn: "orange",
    ExobodyNames.Venus: "aqua",
    ExobodyNames.Mars: "crimson",
    ExobodyNames.Mercury: "fuchsia",
}
EXOBODY_MEAN_MAGNITUDE = {
    ExobodyNames.Sun: 7 + 26.74,
    ExobodyNames.Moon: 7 + 12.74,
    ExobodyNames.Jupiter: 7 + 2.20,
    ExobodyNames.Saturn: 7 - 0.46,
    ExobodyNames.Venus: 7 + 4.14,
    ExobodyNames.Mars: 7 - 0.71,
    ExobodyNames.Mercury: 7 - 0.23,
}


class Planet:
    def __init__(self, name):
        if name not in ExobodyNames and name != "Earth":
            raise Exception("Planet name must be that of an exobody or Earth")
        self.name = name

    def get_name(self):
        return self.name if isinstance(self.name, str) else self.name.value

    def get_body(self):
        return (
            eph["earth"]
            if self.name == "Earth"
            else EXOBODY_BINARY_MAPPING.get(self.name, eph)
        )

    def get_color(self):
        return EXOBODY_COLORS.get(self.name)

    def _get_mean_magnitude(self):
        return EXOBODY_MEAN_MAGNITUDE.get(self.name)

    def get_magnitude(self, date: datetime):
        if self.name in ["Mercury", "Venus", "Jupiter"]:
            apparent_magnitude = planetary_magnitude(
                eph["earth"]
                .at(ts.utc(date.year, date.month, date.day))
                .observe(self.get_body())
                .apparent()
            )
            return abs(apparent_magnitude) * 10
        else:
            return self._get_mean_magnitude() * 10

    def __repr__(self):
        return self.get_name()

    def __str__(self):
        return self.get_name()
