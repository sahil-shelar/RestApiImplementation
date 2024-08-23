// Importing necessary modules and utilities
import data from '../db/db.json' assert { type: "json" }; // Import workout data from a JSON file
import { addWorkout } from '../utils/addWorkout.utils.js'; // Import utility function to save data
import { v4 as uuid } from 'uuid'; // Import UUID generator to create unique workout IDs

// Controller function to get all workouts
const getAllWorkouts = (req, res) => {
  res.status(200)
    .json(data); // Respond with the entire workouts data with a 200 OK status
};

// Controller function to get a single workout by its ID
const getOneWorkout = (req, res) => {
  const { workoutId } = req.params; // Extract workoutId from request parameters

  // Validate workoutId
  if (!workoutId?.trim()) {
    return res.status(400).json({ message: "Workout id is missing" });
  }

  // Find the workout with the given ID
  const workout = data.workouts.find((workout) => workout.id.toLowerCase() === workoutId.toLowerCase());

  // Check if the workout was found
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  // Respond with the found workout
  return res.status(200)
    .json(workout);
};

// Controller function to create a new workout
const createNewWorkout = (req, res) => {
  try {
    const { name, mode, equipment, exercises, trainerTips } = req.body; // Extract data from request body

    // Validate the presence of all required fields
    if (!name || !mode || !equipment || !exercises || !trainerTips) {
      return res.status(400).json({ message: "All fields are Mandatory" });
    }

    // Create a new workout object with a unique ID and current timestamps
    const newWorkout = {
      id: uuid(), // Generate a unique ID for the new workout
      name,
      mode,
      equipment,
      exercises,
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), // Set creation timestamp
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), // Set update timestamp
      trainerTips
    };

    // Check if a workout with the same name already exists
    const isAlreadyAdded = data.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
      return res.status(200)
        .json({ message: "Workout already exists" });
    }

    // Add the new workout to the workouts array
    data.workouts.push(newWorkout);
    addWorkout(data); // Save updated data to storage or database

    // Respond with a success message and the created workout
    return res.status(200)
      .json({ message: `Workout created successfully`, newWorkout });

  } catch (error) {
    // Handle any errors that occur during the creation process
    return res.status(500)
      .json({ message: "An error occurred while creating the workout", error: error.message });
  }
};

// Controller function to update an existing workout
const updateOneWorkout = (req, res) => {
  try {
    const { workoutId } = req.params; // Extract workoutId from request parameters
    const { id, name, mode, equipment, exercises, trainerTips } = req.body; // Extract updated data from request body

    // Validate workoutId
    if (!workoutId?.trim()) {
      return res.status(400).json({ message: "Workout id is missing" });
    }

    // Find the workout with the given ID
    const workout = data.workouts.find((workout) => workout.id === workoutId);

    // Check if the workout was found
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Validate the presence of all required fields
    if (!name || !mode || !equipment || !exercises || !trainerTips) {
      return res.status(400).json({ message: "All fields are Mandatory" });
    }

    // Create an updated workout object with the provided data and current timestamp
    const updatedWorkout = {
      id, // Preserve the original ID
      name,
      mode,
      equipment,
      exercises,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), // Set update timestamp
      trainerTips
    };

    // Find the index of the workout to update
    const indexToUpdate = data.workouts.indexOf(workout);

    // Update the workout at the found index
    data.workouts[indexToUpdate] = updatedWorkout;
    addWorkout(data); // Save updated data to storage or database

    // Respond with the updated workout
    return res.status(200)
      .json(updatedWorkout);

  } catch (error) {
    // Handle any errors that occur during the update process
    return res.status(500)
      .json({ message: "An error occurred while updating the workout", error: error.message });
  }
};

// Controller function to delete a workout
const deleteOneWorkout = (req, res) => {
  try {
    const { workoutId } = req.params; // Extract workoutId from request parameters

    // Validate workoutId
    if (!workoutId?.trim()) {
      return res.status(400).json({ message: "Workout id is missing" });
    }

    // Find the workout with the given ID
    const workout = data.workouts.find((workout) => workout.id === workoutId);

    // Check if the workout was found
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Find the index of the workout to delete
    const indexToDelete = data.workouts.indexOf(workout);
    data.workouts.splice(indexToDelete, 1); // Remove the workout from the array
    addWorkout(data); // Save updated data to storage or database

    // Respond with a success message and the remaining data
    return res.status(200)
      .json({ message: "Workout deleted successfully", data });

  } catch (error) {
    // Handle any errors that occur during the deletion process
    return res.status(500)
      .json({ message: "An error occurred while deleting the workout", error: error.message });
  }
};

// Exporting controller functions for use in routes
export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
