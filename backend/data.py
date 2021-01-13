from skyfield.api import load

eph = load("de421.bsp")


if __name__ == "__main__":
    # Run this at start-up to prevent long response time on first request
    eph