import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Exercise,
  MuscleGroup,
  Profile,
  TrainingDayTag,
  WorkoutEntry,
} from "../../entities/exercise/model/types";

import { indexedDBStorage } from "./indexedDBStorage";

type AddExerciseData = {
  title: string;

  muscleGroups: MuscleGroup;

  trainingDay: TrainingDayTag;
};

type GymStore = {
  exercises: Exercise[];

  profiles: Profile[];

  activeProfileId: string;

  addProfile: (name: string) => void;

  setActiveProfile: (id: string) => void;

  addExercise: (exercise: AddExerciseData) => void;

  removeExercise: (exerciseId: string) => void;

  saveWorkout: (exerciseId: string, workout: WorkoutEntry) => void;

  moveExerciseToDay: (exerciseId: string, newDay: TrainingDayTag) => void;

  removeProfile: (id: string) => void;

  reset: () => void;
};

const defaultProfileId = "default-profile";

export const useGymStore = create<GymStore>()(
  persist(
    (set, get) => ({
      profiles: [
        {
          id: defaultProfileId,
          name: "Мой",
        },
      ],

      activeProfileId: defaultProfileId,

      removeProfile: (id) =>
        set((state) => {
          if (id === defaultProfileId) return state;

          const filtered = state.profiles.filter((p) => p.id !== id);

          let newActiveId = state.activeProfileId;

          if (state.activeProfileId === id) {
            newActiveId =
              filtered.find((p) => p.id === defaultProfileId)?.id ??
              filtered[0]?.id ??
              defaultProfileId;
          }

          return {
            profiles: filtered,
            activeProfileId: newActiveId,
          };
        }),

      exercises: [],

      addProfile: (name) =>
        set((state) => ({
          profiles: [
            ...state.profiles,
            {
              id: crypto.randomUUID(),
              name,
            },
          ],
        })),

      setActiveProfile: (id) =>
        set(() => ({
          activeProfileId: id,
        })),

      addExercise: ({ title, muscleGroups, trainingDay }) => {
        const profileId = get().activeProfileId;

        if (!profileId) return;

        set((state) => ({
          exercises: [
            ...state.exercises,
            {
              id: crypto.randomUUID(),

              title,

              muscleGroups,

              profiles: {
                [profileId]: {
                  trainingDay,
                  history: [],
                },
              },
            },
          ],
        }));
      },

      removeExercise: (exerciseId) =>
        set((state) => ({
          exercises: state.exercises.filter((ex) => ex.id !== exerciseId),
        })),

      saveWorkout: (exerciseId, workout) => {
        const profileId = get().activeProfileId;

        if (!profileId) return;

        set((state) => ({
          exercises: state.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) {
              return exercise;
            }

            const profileData = exercise.profiles[profileId] ?? {
              trainingDay: "день-1",
              history: [],
            };

            const today = new Date().toDateString();

            const existingIndex = profileData.history.findIndex(
              (entry) => new Date(entry.createdAt).toDateString() === today,
            );

            let updatedHistory = [...profileData.history];

            if (existingIndex !== -1) {
              updatedHistory[existingIndex] = workout;
            } else {
              updatedHistory.push(workout);
            }

            return {
              ...exercise,

              profiles: {
                ...exercise.profiles,

                [profileId]: {
                  ...profileData,

                  history: updatedHistory,
                },
              },
            };
          }),
        }));
      },

      moveExerciseToDay: (exerciseId, newDay) => {
        const profileId = get().activeProfileId;

        if (!profileId) return;

        set((state) => ({
          exercises: state.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) {
              return exercise;
            }

            const profileData = exercise.profiles[profileId] ?? {
              trainingDay: "день-1",
              history: [],
            };

            return {
              ...exercise,

              profiles: {
                ...exercise.profiles,

                [profileId]: {
                  ...profileData,

                  trainingDay: newDay,
                },
              },
            };
          }),
        }));
      },

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

        profiles: state.profiles,

        activeProfileId: state.activeProfileId,
      }),
    },
  ),
);
