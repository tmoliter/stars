from datetime import datetime
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from utils import get_planetary_plot_data
from dateutil.tz import *
from models.planet import ExobodyNames, Planet
import urllib.parse as parse
import dateparser


class PlanetServer(BaseHTTPRequestHandler):
    def do_GET(self):
        query_dict = parse.parse_qs(parse.urlparse(self.path).query)
        start = (
            dateparser.parse(query_dict.get("start")[0] + " UTC")
            if query_dict.get("start")
            else datetime(2020, 12, 1, tzinfo=tzutc())
        )
        end = (
            dateparser.parse(query_dict.get("end")[0] + " UTC")
            if query_dict.get("end")
            else datetime(2020, 12, 31, tzinfo=tzutc())
        )
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(
            json.dumps(
                get_planetary_plot_data(
                    start, end, [Planet(body_name) for body_name in ExobodyNames]
                )
            ).encode("utf-8")
        )


def run(server_class=HTTPServer, handler_class=PlanetServer, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)

    print(f"Starting httpd on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
