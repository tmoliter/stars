from skyfield.magnitudelib import planetary_magnitude
import matplotlib.pyplot as plt
from data.dates import dates
from utils import dec_to_ecliptic_lat, earth, find_sha_offset, ra_to_offset_sha,sun,ts,other_bodies,convert_body_to_name

dates_2021 = dates.get(2021)
january_days = dates_2021.get(1)

fig, ax = plt.subplots()

bodies_with_magnitudes = {"Mercury":"fuchsia","Venus":"aqua","Jupiter":"orangered"}

sha_offset = find_sha_offset(2021,1,january_days,sun,earth)

for day in january_days:
    here = earth.at(ts.utc(2021, 1, day))
    for body in other_bodies:
        body_name = convert_body_to_name(body)
        if body_name in bodies_with_magnitudes.keys() or body_name == "Sun" or body_name == "Moon":

            apparent = here.observe(body).apparent()

            ra, dec, dis = apparent.radec(epoch='date')

            x, y = (ra_to_offset_sha(ra._degrees, sha_offset), dec_to_ecliptic_lat(dec._degrees, ra._degrees))

            if body_name in bodies_with_magnitudes.keys():
                magnitude = abs(planetary_magnitude(apparent)) * 25
                color = bodies_with_magnitudes[body_name]
            elif body_name == "Sun":
                magnitude = 700
                color = "yellow"
            else: 
                magnitude = 300
                color = "lightslategrey"
            
            ax.scatter(x, y, c=color, s=magnitude, edgecolors='black')
                

ax.grid(True)

plt.show()