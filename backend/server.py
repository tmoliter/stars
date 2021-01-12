import json
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
from utils import get_planetary_plot_data
from dateutil.tz import *
from models.planet import ExobodyNames, Planet
import urllib.parse as parse
import dateparser
import os

ON_HEROKU = os.environ.get("ON_HEROKU")


class PlanetServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_url = parse.urlparse(self.path)
        if parsed_url.path == "/data":
            query_dict = parse.parse_qs(parsed_url.query)
            start = (
                dateparser.parse(query_dict.get("start")[0] + " UTC")
                if query_dict.get("start")
                else None
            )
            end = (
                dateparser.parse(query_dict.get("end")[0] + " UTC")
                if query_dict.get("end")
                else None
            )
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            if start and end:
                self.wfile.write(
                    json.dumps(
                        get_planetary_plot_data(
                            start,
                            end,
                            [Planet(body_name) for body_name in ExobodyNames],
                        )
                    ).encode("utf-8")
                )
            else:
                self.wfile.write(
                    "No start and end date provided in query parameters".encode("utf-8")
                )
        elif parsed_url.path == "" or parsed_url.path == "/":
            self.path = "/dist/"
            return SimpleHTTPRequestHandler.do_GET(self)
        else:
            return SimpleHTTPRequestHandler.do_GET(self)


def run(server_class=HTTPServer, handler_class=PlanetServer, port=80):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)

    print(f"Starting httpd on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    if ON_HEROKU:
        port = int(os.environ.get("PORT", 80))
    else:
        port = 80
    run(port=port)
