# ISO Tracker

This is a minimal skeleton for an ISO merchant management app. It provides basic lead and merchant APIs using Node.js, Express and MongoDB. A full CRM dashboard and residual auditing system would be built on top of this foundation.

## Running the backend

```
cd backend
npm install
npm start
```

The server will start on port 5000.

Open your browser to `http://localhost:5000/` to view the static welcome page.

## Connecting to MongoDB Atlas

This project uses Mongoose, which relies on the MongoDB Node.js driver. If you
want to connect to a MongoDB Atlas cluster, ensure the `mongodb` driver is
installed:

```bash
npm install mongodb
```

Set the `MONGO_URI` environment variable or update `server.js` with your
connection string. A sample connection string is provided below:

```
mongodb+srv://iso_user:<db_password>@isoapp.i6ozni3.mongodb.net/?retryWrites=true&w=majority&appName=isoapp
```

## Environment Variables

The backend expects the following environment variables when running locally or
in production:

| Variable   | Description                                   |
| ---------- | --------------------------------------------- |
| `MONGO_URI`| MongoDB connection string **(required)**       |
| `PORT`     | Port the server listens on (defaults to `5000`)|

Ensure these are configured in your environment or in the Vercel dashboard
when deploying.

## Deploying to Vercel

1. [Sign up](https://vercel.com/signup) for a Vercel account and install the
   GitHub integration.
2. Import this repository into Vercel and set the `MONGO_URI` environment
   variable in the project settings.
3. Vercel will detect the `vercel.json` file and build the API using
   `backend/server.js` as the entry point.
4. After the build completes, Vercel provides a unique deployment URL such as
   `https://your-project-name.vercel.app` which you can use to access the API.
