from models.planet import ExobodyNames, Planet
from datetime import datetime
from utils import get_planetary_plot_data
import matplotlib.pyplot as plt
from dateutil.tz import *

fig, ax = plt.subplots()


def plot_all_bodies(start: datetime, end: datetime):

    planetary_plotting_data = get_planetary_plot_data(
        start, end, [Planet(body_name) for body_name in ExobodyNames]
    )

    for body, dates in planetary_plotting_data.items():
        for i, plot_datum in enumerate(dates):
            ax.scatter(
                plot_datum["x"],
                plot_datum["y"],
                s=plot_datum["magnitude"],
                c=plot_datum["color"],
                edgecolors="black",
            )

    ax.grid(True)


if __name__ == "__main__":

    start = datetime(2020, 12, 1, tzinfo=tzutc())
    end = datetime(2020, 12, 31, tzinfo=tzutc())
    plot_all_bodies(start, end)

    plt.xlim([0, 360])
    plt.ylim([-65, 65])
    plt.show()
