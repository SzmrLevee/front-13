#!/bin/bash

docker run -v "$(pwd)/frontend:/app" --entrypoint pnpm idomi27/vue:26 install

docker compose up -d