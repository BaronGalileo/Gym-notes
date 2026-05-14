import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Exercise,
  TrainingDayTag,
  WorkoutEntry,
} from "../../entities/exercise/model/types";

import { indexedDBStorage } from "./indexedDBStorage";

type GymStore = {
  exercises: Exercise[];

  addExercise: (exercise: Exercise) => void;

  removeExercise: (exerciseId: string) => void;

  saveWorkout: (exerciseId: string, workout: WorkoutEntry) => void;

  moveExerciseToDay: (exerciseId: string, newDay: TrainingDayTag) => void;

  reset: () => void;
};

export const useGymStore = create<GymStore>()(
  persist(
    (set, get) => ({
      exercises: [],

      addExercise: (exercise) =>
        set((state) => ({
          exercises: [...state.exercises, exercise],
        })),

      removeExercise: (exerciseId) =>
        set((state) => ({
          exercises: state.exercises.filter((ex) => ex.id !== exerciseId),
        })),

      saveWorkout: (exerciseId, workout) =>
        set((state) => ({
          exercises: state.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) return exercise;

            const today = new Date().toDateString();

            const existingIndex = exercise.history.findIndex(
              (entry) => new Date(entry.createdAt).toDateString() === today,
            );

            if (existingIndex !== -1) {
              const updatedHistory = [...exercise.history];

              updatedHistory[existingIndex] = workout;

              return {
                ...exercise,
                history: updatedHistory,
              };
            }

            return {
              ...exercise,
              history: [...exercise.history, workout],
            };
          }),
        })),

      moveExerciseToDay: (exerciseId, newDay) =>
        set((state) => ({
          exercises: state.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, trainingDay: newDay } : ex,
          ),
        })),

      reset: () =>
        set(() => ({
          exercises: [],
        })),
    }),
    {
      name: "gym-storage",

      storage: indexedDBStorage,

      partialize: (state) => ({
        exercises: state.exercises,
      }),
    },
  ),
);
