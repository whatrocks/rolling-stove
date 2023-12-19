# rolling-stove

Rolling Stove is a food truck discovery app - the easiest way to find nearby food trucks open right now!

![Rolling Stone app UI](./rolling-stove.png)

## Packages

This monorepo is managed with Lerna and NPM workspaces.

* client - Mobile-responsive front-end written in Typescript using React
* server - API server written in Typescript using ExpressJS

## Local development

Install the dependencies and run the client and server locally:

```
npm install
npm run dev
```

The server will be running on `http://localhost:5173/` and client on `http://localhost:8080`. Open the client url in a browser to try out the app.

You can also test the API server via `curl`:

```bash
curl --request GET 'http://localhost:8080/ping'
```

This should return a `Hello, World!` JSON response if the server is up and running: `{"message":"Hello World!"}`.

### Adding new npm packages

To add a new dep to a package, use the `-w` flag to specify the workspace. Run this command from the project root directory.

```bash
npm install <dep-name> -w rolling-stove-client
```

### Tests

Run the client and server unit tests

```bash
npm run test
```

### Linting and Formatting

Format and lint both packages

```bash
npm run format
npm run lint
```

## Architecture

Rolling Stove uses a client-server architecture. The application is currently "read-only". Updates to the food truck data may be done ad-hoc, as needed (e.g. using schedule jobs).

The apps's current architecture supporting the following user stories:

### User Stories
* [x] As a user, I can see my current location centered on an zoomable map
* [x] As a user, I can click a button to search for the three nearest food trucks open right now (and view the results without scrolling)
* [x] As a user, I can click a food truck result and have the map zoom to the food trucks location
* [x] As a user, I can click "Directions" to get directions to a selected food truck from my current location

### Server

#### Tech Stack
* Express.js
* Typescript
* NPM

#### Functional Features
* [x] In-memory "database" of food trucks (scraped from API)
* [x] RESTful JSON API to search food trucks by:
    - day of week
    - is open right now
    - response sorted by "haversine" distance from user's current location (returning up to 3 results, restrictued to a 5 mile radius)

#### Technical Features
* [x] Testing with Jest and Supertest
* [x] Request validation and error-handling
* [x] Cross-Origin Resource Sharing enabled using cors
* [x] Secured HTTP Headers using helmet

### Future Features

####  Functional 
* [ ] Improved searching (e.g. cuisines, future dates)
* [ ] User registration / management
* [ ] Value-add features (e.g. ratings, favorites)

#### Technical
* [ ] Logging (winston)
* [ ] Environment variables (dotenv)
* [ ] Compression
* [ ] Containerization
* [ ] Add SQL database with geospatial query capabilities
* [ ] Devise relational data model for trucks, locations, users.


### Client

#### Tech Stack

* React
* Typescript
* Vite
* Leaflet

#### Features
* [ ] 
* [ ]


### Monorepo

* [ ] Shared types between client and server
* [ ] Git Hooks for linting
* [ ] CI automation (testing, linting, etc)