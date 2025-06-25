# ISO Tracker

This is a minimal skeleton for an ISO merchant management app. It provides basic lead and merchant APIs using Node.js, Express and MongoDB. A full CRM dashboard and residual auditing system would be built on top of this foundation.

## Running the backend

```
cd backend
npm install
npm start
```

The server will start on port 5000. Because static files are resolved relative to
`backend/server.js`, you can also run the server from the project root using
`node backend/server.js` without encountering missing file errors.

Open your browser to `http://localhost:5000/` to view the dashboard that lists
leads and merchants from the API.

## Connecting to MongoDB Atlas

This project uses Mongoose, which relies on the MongoDB Node.js driver. If you
want to connect to a MongoDB Atlas cluster, ensure the `mongodb` driver is
installed:

```bash
npm install mongodb
```

Set the `MONGO_URI` environment variable or update `server.js` with your
connection string. A sample `.env.example` file is provided at the project root.
Copy it to `.env` and replace the placeholder with your database URI. The server
uses `dotenv` so values from `.env` are automatically loaded when you run
`npm start`. A sample connection string is shown below:

```
mongodb+srv://iso_user:iso_pass123@isoapp.i6ozni3.mongodb.net/?retryWrites=true&w=majority&appName=isoapp
```

## Adding a sample merchant

Once your `MONGO_URI` is configured you can insert a test merchant with name and email `"t"` by running the seed script:

```bash
cd backend
npm run seed
```

The script connects to your MongoDB database and creates the merchant if it doesn't already exist.
