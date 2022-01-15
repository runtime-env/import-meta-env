#!/bin/sh

# TODO

sed -i '/s/<!--__runtime_config__ BEGIN--><!--__runtime_config__ END-->/<script>window.__runtime_config__={NAME:"Ernest"}</script>/g' $1;
