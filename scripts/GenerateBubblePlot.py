from utils import Exobody, get_planetary_plot_data, yearly_date_dict_to_datetime
from skyfield.magnitudelib import planetary_magnitude
import matplotlib.pyplot as plt
from data.dates import dates

fig, ax = plt.subplots()
bodies_with_magnitudes = {"Mercury":"fuchsia","Venus":"aqua","Jupiter":"orangered"}

def plot_month():

    year = 2020

    planetary_plotting_data = get_planetary_plot_data(yearly_date_dict_to_datetime(year,dates[year]),[body for body in Exobody])

    for body, plot_data in planetary_plotting_data.items():
        for plot_datum in plot_data:
            x, y, magnitude, color = plot_datum
            ax.scatter(x, y, s=magnitude, c=color, edgecolors='black')
                    
    ax.grid(True)

if __name__ == "__main__":
    plot_month()

    plt.xlim([0,360])
    plt.ylim([-65,65])
    plt.show()
