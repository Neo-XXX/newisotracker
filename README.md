# ISO Tracker

This is a minimal skeleton for an ISO merchant management app. It provides basic lead and merchant APIs using Node.js, Express and MongoDB. A full CRM dashboard and residual auditing system would be built on top of this foundation.

## Running the backend

```
cd backend
npm install
npm start
```

The server will start on port 5000.

## Connecting to MongoDB Atlas

This project uses Mongoose, which relies on the MongoDB Node.js driver. If you
want to connect to a MongoDB Atlas cluster, ensure the `mongodb` driver is
installed:

```bash
npm install mongodb
```

Set the `MONGO_URI` environment variable or update `server.js` with your
connection string. A sample `.env.example` file is provided at the project root.
Copy it to `.env` and replace the placeholder with your database URI. A sample
connection string is shown below:

```
mongodb+srv://iso_user:<db_password>@isoapp.i6ozni3.mongodb.net/?retryWrites=true&w=majority&appName=isoapp
```
