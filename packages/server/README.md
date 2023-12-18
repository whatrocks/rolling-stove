# rolling-stove-api

The API server for Rolling Stove app

## Setup

Use node version 21.4.0

```bash
npm install
npm run dev
```

## Shortcuts

* No DB, loading data into memory once (not ideal for updates / horizontal scaling)
* Ignoring User timezones / daylight savings etc
* Using a popular package for haversine (ideally would have had more time to research this and potentially implement our own)

## Productionization

TO ADD