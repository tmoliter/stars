#!/usr/bin/env bash
set -ex

cd $(dirname $(dirname "$0"))

black ./
