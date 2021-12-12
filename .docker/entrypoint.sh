#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

if [ ! -d "node_modules" ]; then
  npm install
fi

npm run start:dev
