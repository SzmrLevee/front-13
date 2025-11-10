#!/bin/bash

docker run --rm  -v "$(pwd)/frontend:/app" --entrypoint pnpm  idomi27/vue:26 install --dangerously-allow-all-builds

docker compose up -d
