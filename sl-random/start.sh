#!/bin/bash

docker run -v "$(pwd)/:/app" --entrypoint pnpm idomi27/vue:26 install

docker compose up -d