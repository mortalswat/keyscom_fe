# Keyscom Angular web

## About

This project is the fronted app for the Keyscom

## Installation

Run `cp src/environments/config-dist.json src/environments/config.json` and change the configuration settings in the `config.json` file.

Edit `src/environments/config.json` and set the backend port (default `8080`).

Run `docker-compose up -d` to run app.

The application is running in `http://localhost:4200`

## Utils

### Generate Translation

Execute `docker-compose exec angular npm run i18n:extract`
