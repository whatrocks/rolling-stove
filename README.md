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
npm install react-leaflet -w rolling-stove-client
```

## Architecture

### Server

#### Tech Stack
* Express.js
* Typescript
* NPM

#### Features
* Package management with NPM
* Testing
* Cross-Origin Resource Sharing enabled using cors
* Secured HTTP Headers using helmet

## Future Features
* Logging with winston
* Environment variables
* Compression
* Git Hooks
* Containerization


* No database
* No data model for trucks, locations, etc
* Not dealing with timezones

### Both
* Shared types between client and server