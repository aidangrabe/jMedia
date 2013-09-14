#!/bin/bash

IN=jmedia.js
OUT=jmedia.min.js

uglifyjs "$IN" -mco "$OUT"
