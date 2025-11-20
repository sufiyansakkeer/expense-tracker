
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import expenseRoutes from './src/routes/expense.routes.js';

dotenv.config(
    {
        path: `.env.${process.env.NODE_ENV}`
    }
);

console.log("Loaded ENV:", process.env.NODE_ENV);

// Connect to MongoDB
connectDB();

const app = express();


// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





// ```
// This `server.js` file sets up a basic Express application for your expense tracker project, incorporating the dependencies identified in your `npm-shrinkwrap.json` file.

// Here's a breakdown of what it does:

// 1.  **Imports**: It imports `express` for the web framework, `mongoose` for MongoDB interaction, `morgan` for logging HTTP requests, `cookie-parser` for parsing cookies, and `http-errors` for creating HTTP error objects. It also includes `dotenv` for environment variable management.
// 2.  **Database Connection**: It connects to a MongoDB database using Mongoose. It attempts to use a `MONGODB_URI` environment variable, falling back to a local MongoDB instance (`mongodb://localhost:27017/expense_tracker_db`) if the environment variable is not set. It includes basic error handling for the connection.
// 3.  **Middleware**:
//    *   `morgan('dev')`: Logs HTTP requests to the console in a developer-friendly format.
//    *   `express.json()`: Parses incoming requests with JSON payloads. This is a built-in middleware in Express 4.16.0+ and replaces the need for a separate `body-parser.json()`.
//    *   `express.urlencoded({ extended: false })`: Parses incoming requests with URL-encoded payloads. This also replaces `body-parser.urlencoded()`.
//    *   `cookieParser()`: Parses cookies attached to the client request object.
// 4.  **Routes**: A simple root route (`/`) is provided as an example. You would typically define separate route files (e.g., `routes/expenses.js`, `routes/users.js`) and mount them here.
// 5.  **Error Handling**:
//    *   A 404 handler catches requests that don't match any defined routes and forwards them to the error handling middleware.
//    *   A general error handler catches all other errors, logs them, and sends an appropriate JSON response to the client. It provides more detailed error information in development mode.
// 6.  **Server Start**: The server listens on the port specified by the `PORT` environment variable or defaults to `3000`.

// **To use this file:**

// *   Save it as `server.js` in the root of your `expense_tracker` project.
// *   Make sure you have a `.env` file in your project root if you want to use environment variables for `MONGODB_URI` or `PORT`. For example:
//    ```
//    PORT=3000
//    MONGODB_URI=mongodb://localhost:27017/expense_tracker_db
//    ```
// *   Install `dotenv` if you haven't already: `npm install dotenv`.
// *   You'll need to create your route files (e.g., `routes/expenses.js`) and define your Mongoose schemas/models.


