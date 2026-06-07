import { MUSCLE_META } from "../../entities/exercise/model/muscle-meta";
import type {
  MuscleGroup,
  WorkoutEntry,
  WorkoutSet,
} from "../../entities/exercise/model/types";
import { useGymStore } from "./gym.store";

describe("GymStore", () => {
  const defaultProfileId = "default-profile";
  const workoutID = crypto.randomUUID();

  (beforeAll(() => {
    useGymStore.getState().reset();
  }),
    it("default id profile", () => {
      const profiles = useGymStore.getState().profiles;
      expect(profiles).toContainEqual(
        expect.objectContaining({ id: defaultProfileId, name: "Мой" }),
      );
    }),
    it("addProfile", () => {
      const profiles = useGymStore.getState().profiles.length;
      useGymStore.getState().addProfile("New Profile TEST");
      expect(useGymStore.getState().profiles.length).toBe(profiles + 1);
    }));
  it("setActiveProfile", () => {
    const activeProfileId = useGymStore.getState().activeProfileId;
    expect(activeProfileId).toBe(defaultProfileId);
    const profile = useGymStore
      .getState()
      .profiles.find((p) => p.name === "New Profile TEST");
    if (profile) {
      useGymStore.getState().setActiveProfile(profile.id);
    }
    expect(useGymStore.getState().activeProfileId).toBe(profile?.id);
  });
  (it("removeProfile", () => {
    const profiles = useGymStore.getState().profiles.length;
    const profile = useGymStore
      .getState()
      .profiles.find((p) => p.name === "New Profile TEST");
    if (profile) {
      useGymStore.getState().removeProfile(profile.id);
    }
    expect(useGymStore.getState().profiles.length).toBe(profiles - 1);
    expect(useGymStore.getState().activeProfileId).toBe(defaultProfileId);
  }),
    it("addExercise", () => {
      expect(useGymStore.getState().exercises.length).toBe(0);
      const profileId = useGymStore.getState().activeProfileId;
      const title = "Test Exercise";
      const muscleGroups = Object.keys(MUSCLE_META)[0] as MuscleGroup;
      const trainingDay = "день-1";
      useGymStore.getState().addExercise({ title, muscleGroups, trainingDay });
      expect(useGymStore.getState().exercises.length).toBe(1);
      const exercise = useGymStore.getState().exercises.slice(-1)[0];
      expect(exercise.title).toBe(title);
      expect(exercise.muscleGroups).toBe(muscleGroups);
      expect(exercise.profiles[profileId].trainingDay).toBe(trainingDay);
    }),
    it("saveWorkout", () => {
      const profileId = useGymStore.getState().activeProfileId;
      const exercise = useGymStore.getState().exercises.slice(-1)[0];
      const workoutComment = "Test Comment";
      const workoutCreatedAt = new Date().toISOString();
      const DEFAULT_SETS: WorkoutSet[] = [
        {
          id: crypto.randomUUID(),
          reps: 10,
          weight: 0,
        },
      ];
      expect(exercise.profiles[profileId].history.length).toBe(0);
      useGymStore.getState().saveWorkout(exercise.id, {
        id: workoutID,
        createdAt: workoutCreatedAt,
        comment: workoutComment,
        sets: DEFAULT_SETS,
      } as WorkoutEntry);
      const workouts = useGymStore.getState().exercises.slice(-1)[0].profiles[
        profileId
      ].history;
      expect(workouts.length).toBe(1);
      expect(workouts.slice(-1)[0].id).toBe(workoutID);
      expect(workouts.slice(-1)[0].comment).toBe(workoutComment);
      expect(workouts.slice(-1)[0].createdAt).toBe(workoutCreatedAt);
    }));
  (it("removeWorkout", () => {
    const workouts = useGymStore.getState().exercises.slice(-1)[0].profiles[
      defaultProfileId
    ].history;
    expect(workouts.length).toBe(1);
    const exerciseID = useGymStore.getState().exercises.slice(-1)[0].id;
    useGymStore.getState().removeWorkout(exerciseID, workoutID);
    expect(
      useGymStore.getState().exercises.slice(-1)[0].profiles[defaultProfileId]
        .history.length,
    ).toBe(0);
  }),
    it("removeExercise", () => {
      expect(useGymStore.getState().exercises.length).toBe(1);
      const exerciseID = useGymStore.getState().exercises.slice(-1)[0].id;
      useGymStore.getState().removeExercise(exerciseID);
      expect(useGymStore.getState().exercises.length).toBe(0);

    }));
});
