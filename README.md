# rolling-stove

Rolling Stove is a food truck discovery app - the easiest way to find nearby food trucks open right now!

## Packages

This monorepo is managed with Lerna.

* client - Mobile-responsive front-end written in Typescript using React
* server - API server written in Typescript using ExpressJS

## Local development

Run the client and server localling with this command.

```
npm install
npm run dev
```

Add new dep to a package

```bash
npm install <dep-name> -w rolling-stove-client
```

## Architecture

### Server

#### Tech Stack
* Express.js
* Typescript
* NPM

#### Features
* [x] Package management with NPM
* [x] Testing with Jest and Supertest
* [x] Cross-Origin Resource Sharing enabled using cors
* [x] Secured HTTP Headers using helmet

## Future Features
* [ ] Logging (winston)
* [ ] Environment variables (dotenv)
* [ ] Compression
* [ ] Containerization
* [ ] No database
* [ ] No data model for trucks, locations, etc
* [ ] Not dealing with timezones

### Monorepo Setup

* [ ] Shared types between client and server
* [ ] Git Hooks for linting
* [ ] CI automation (testing, linting, etc)