type WorkoutSet = {
  id: string;
  reps: number;
  weight: number;
};

type WorkoutEntry = {
  id: string;
  createdAt: string;

  comment?: string;

  sets: WorkoutSet[];
};


type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "abs"
  | "calves";

type TrainingDayTag =
  | "день-1"
  | "день-2"
  | "день-3"
  | "день-4"
  | "день-5"
  | "день-6"
  | "день-7";

type Exercise = {
  id: string;

  title: string;

  muscleGroups: MuscleGroup;

  trainingDay: TrainingDayTag;

  image?: string;

  notes?: string;

  history: WorkoutEntry[];
};

export type {
  Exercise,
  MuscleGroup,
  TrainingDayTag,
  WorkoutEntry,
  WorkoutSet
};

