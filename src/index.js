import express from 'express';
import workoutRouter from './v1/routes/workout.routes.js'; // Import the workout router
import cookieParser from 'cookie-parser'; // Import cookie-parser for handling cookies

// Create an instance of the Express application
const app = express();

// Define the port number for the server
const PORT = process.env.PORT || 3000;

// Middleware setup
// Parse incoming JSON requests with a limit of 16kb
app.use(express.json({ limit: '16kb' }));

// Parse URL-encoded data with a limit of 16kb and extended syntax
app.use(express.urlencoded({ limit: '16kb', extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse cookies from incoming requests
app.use(cookieParser());

// Use the workoutRouter for routes starting with "/api/v1/workout"
app.use('/api/v1/workout', workoutRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
