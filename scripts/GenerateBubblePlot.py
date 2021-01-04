from datetime import datetime
from typing import List
from utils import Exobody, get_planetary_plot_data, yearly_date_dict_to_flat_datetimes
from skyfield.magnitudelib import planetary_magnitude
import matplotlib.pyplot as plt
from data.dates import hardcoded_lunar_dates

fig, ax = plt.subplots()


def plot_all_bodies(dates: List[datetime]):

    planetary_plotting_data = get_planetary_plot_data(dates, [body for body in Exobody])

    for body, date in planetary_plotting_data.items():
        for plot_datum in date:
            x, y, magnitude, color = plot_datum
            ax.scatter(x, y, s=magnitude, c=color, edgecolors="black")

    ax.grid(True)


if __name__ == "__main__":

    dates = yearly_date_dict_to_flat_datetimes(2021, hardcoded_lunar_dates[2021])
    plot_all_bodies(dates)

    plt.xlim([0, 360])
    plt.ylim([-65, 65])
    plt.show()
