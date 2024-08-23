import express from 'express';
import { Router } from 'express';

// Import controller functions for handling workout-related requests
import {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
} from '../../controllers/workout.controller.js';

// Create an instance of the Router
const router = Router();

// Define routes and associate them with the appropriate controller functions

// GET /api/v1/ - Get all workouts
router.route('/').get(getAllWorkouts);

// GET /api/v1/:workoutId - Get a specific workout by ID
router.route('/:workoutId').get(getOneWorkout);

// POST /api/v1/ - Create a new workout
router.route('/').post(createNewWorkout);

// PATCH /api/v1/:workoutId - Update a specific workout by ID
router.route('/:workoutId').patch(updateOneWorkout);

// DELETE /api/v1/:workoutId - Delete a specific workout by ID
router.route('/:workoutId').delete(deleteOneWorkout);

export default router;
