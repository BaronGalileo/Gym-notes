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

type ExerciseTag = MuscleGroup | TrainingDayTag;

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

  tags: ExerciseTag[];

  image?: string;

  notes?: string;

  history: WorkoutEntry[];
};


export type {
  Exercise,
  ExerciseTag,
  MuscleGroup,
  TrainingDayTag,
  WorkoutEntry,
  WorkoutSet
};

