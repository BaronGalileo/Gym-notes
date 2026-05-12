import { useMemo, useState } from "react";

import { useGymStore } from "../../app/store/gym.store";

import type {
    Exercise,
    MuscleGroup,
    TrainingDayTag,
} from "../../entities/exercise/model/types";

import { MySelect } from "../../ui/MySelect/MySelect";
import { ExerciseModal } from "../../widgets/exercise-modal/ExerciseModal";
import { ExerciseCard } from "./ExerciseCard";

const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: "Грудь",
  back: "Спина",
  legs: "Ноги",
  shoulders: "Плечи",
  biceps: "Бицепс",
  triceps: "Трицепс",
  abs: "Пресс",
  calves: "Икры",
};

const MUSCLES: MuscleGroup[] = [
  "chest",
  "back",
  "legs",
  "shoulders",
  "biceps",
  "triceps",
  "abs",
  "calves",
];

const DAYS: TrainingDayTag[] = [
  "день-1",
  "день-2",
  "день-3",
  "день-4",
  "день-5",
  "день-6",
  "день-7",
];

export const ExercisesList = () => {
  const exercises = useGymStore((state) => state.exercises);

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | "all">(
    "all",
  );

  const [selectedDay, setSelectedDay] = useState<TrainingDayTag | "all">("all");

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchMuscle =
        selectedMuscle === "all"
          ? true
          : exercise.tags.includes(selectedMuscle);

      const matchDay =
        selectedDay === "all" ? true : exercise.tags.includes(selectedDay);

      return matchMuscle && matchDay;
    });
  }, [exercises, selectedMuscle, selectedDay]);

  return (
    <>
      <MySelect
        value={selectedMuscle}
        onChange={(e) =>
          setSelectedMuscle(e.target.value as MuscleGroup | "all")
        }
      >
        <option value="all">Все мышцы</option>

        {MUSCLES.map((muscle) => (
          <option key={muscle} value={muscle}>
            {MUSCLE_LABELS[muscle]}
          </option>
        ))}
      </MySelect>

      <MySelect
        value={selectedDay}
        onChange={(e) =>
          setSelectedDay(e.target.value as TrainingDayTag | "all")
        }
      >
        <option value="all">Все дни</option>

        {DAYS.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </MySelect>

      {filteredExercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onClick={() => setSelectedExercise(exercise)}
        />
      ))}
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
};
