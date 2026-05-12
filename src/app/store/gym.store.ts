import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Exercise,
  WorkoutEntry,
} from "../../entities/exercise/model/types";

type GymStore = {
  exercises: Exercise[];

  addExercise: (exercise: Exercise) => void;

  removeExercise: (exerciseId: string) => void;

  saveWorkout: (exerciseId: string, workout: WorkoutEntry) => void;

  reset: () => void;
};

export const useGymStore = create<GymStore>()(
  persist(
    (set) => ({
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
            if (exercise.id !== exerciseId) {
              return exercise;
            }

            const today = new Date().toDateString();

            const existingIndex = exercise.history.findIndex(
              (entry) => new Date(entry.createdAt).toDateString() === today,
            );

            const FORCE_NEW = true;

            if (!FORCE_NEW && existingIndex !== -1) {
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


      reset: () =>
        set(() => ({
          exercises: [],
        })),
    }),
    {
      name: "gym-storage",
    },
  ),
);
