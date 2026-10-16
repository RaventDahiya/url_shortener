# URL Shortener

A small URL-shortening REST API built with Node.js, Express, and MongoDB. It creates short IDs for original URLs, redirects visitors to the original URL, and records visit counts for analytics.

## Features

- Generate an 8-character short ID for an original URL
- Redirect a short URL to its original URL
- Track each redirect visit in MongoDB
- Return visit-count analytics for a short URL
- Includes a Postman collection for testing the API

## Tech stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- nanoid
- Nodemon

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- MongoDB running locally on the default port `27017`
- npm

The application connects to this MongoDB database:

```text
mongodb://127.0.0.1:27017/url_shortener
```

## Getting started

1. Clone the repository and open the project directory:

   ```bash
   cd url_shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB locally.

4. Start the API:

   ```bash
   npm start
   ```

The server starts at:

```text
http://localhost:8001
```

## API reference

### Create a short URL

```http
POST /url
```

Request body:

```json
{
  "originalUrl": "https://github.com/RaventDahiya"
}
```

The API also accepts URL-encoded form data with the `originalUrl` field.

Example response:

```json
{
  "message": "short id for https://github.com/RaventDahiya is Gp603ZGK",
  "shortId": "Gp603ZGK"
}
```

The response status is `201 Created`.

### Redirect to the original URL

```http
GET /url/:shortId
```

Example:

```text
http://localhost:8001/url/Gp603ZGK
```

The API records a visit and redirects the client to the stored original URL.

If the short ID does not exist, the API returns:

```json
{
  "error": "Short URL not found"
}
```

The response status is `404 Not Found`.

### Get analytics

```http
GET /url/analytics/:shortId
```

Example:

```text
http://localhost:8001/url/analytics/Gp603ZGK
```

Example response:

```json
{
  "visitCount": 3
}
```

## Testing with Postman

Import [`url_shortner.postman_collection.json`](./url_shortner.postman_collection.json) into Postman. The collection contains requests for:

1. Creating a short URL
2. Redirecting to the original URL
3. Fetching visit analytics

Update the short ID in the redirect and analytics requests after creating a new short URL.

## Project structure

```text
url_shortener/
├── controllers/
│   └── url.controller.js   # URL creation, redirect, and analytics logic
├── db/
│   └── connection.js       # MongoDB connection
├── models/
│   └── url.models.js       # Mongoose URL schema
├── routes/
│   └── url.router.js       # API route definitions
├── index.js                # Express application entry point
├── package.json
└── url_shortner.postman_collection.json
```

## Data model

Each URL document contains:

- `shortId`: Generated short identifier
- `redirectUrl`: Original URL
- `visitHistory`: Timestamps recorded when the short URL is visited
- `createdAt` and `updatedAt`: Automatically added by Mongoose

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the server with Nodemon |
| `npm test` | Placeholder script; tests are not configured yet |

## Current limitations

- The MongoDB connection string is currently defined directly in `db/connection.js`.
- Input validation currently checks that `originalUrl` is present, but does not validate its URL format.
- Automated tests are not configured yet.

## License

This project is currently marked as `ISC` in `package.json`.
