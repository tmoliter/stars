from skyfield.magnitudelib import planetary_magnitude
import matplotlib.pyplot as plt
from data.dates import dates
from utils import dec_to_ecliptic_lat, earth, find_sha_offset, ra_to_offset_sha,sun,ts,other_bodies,convert_body_to_name

fig, ax = plt.subplots()
bodies_with_magnitudes = {"Mercury":"fuchsia","Venus":"aqua","Jupiter":"orangered"}

def plot_month(year, month, days):
    sha_offset = find_sha_offset(2021,month,days,sun,earth)
    for day in days:
        here = earth.at(ts.utc(year, 1, day))
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

if __name__ == "__main__":
    plot_month(2021,1,dates.get(2021).get(1))

    plt.xlim([0,360])
    plt.ylim([-65,65])
    plt.show()