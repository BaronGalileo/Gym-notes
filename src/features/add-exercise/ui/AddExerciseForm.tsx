import { useState } from "react";
import { useGymStore } from "../../../app/store/gym.store";
import type {
  ExerciseTag,
  MuscleGroup,
  TrainingDayTag,
} from "../../../entities/exercise/model/types";
import { MyInput } from "../../../ui/MyInput/MyInput";
import { MySelect } from "../../../ui/MySelect/MySelect";

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

const DAYS: TrainingDayTag[] = [
  "день-1",
  "день-2",
  "день-3",
  "день-4",
  "день-5",
  "день-6",
  "день-7",
];

export const AddExerciseForm = () => {
  const addExercise = useGymStore((state) => state.addExercise);

  const exercises = useGymStore((state) => state.exercises);

  const [title, setTitle] = useState("");

  const [muscle, setMuscle] = useState<MuscleGroup>("chest");

  const [day, setDay] = useState<TrainingDayTag>("день-1");

  const handleAdd = () => {
    const exists = exercises.some(
      (ex) => ex.title.trim().toLowerCase() === title.trim().toLowerCase(),
    );

    if (exists) {
      alert("Упражнение уже существует");
      return;
    }

    const tags: ExerciseTag[] = [muscle, day];

    addExercise({
      id: crypto.randomUUID(),
      title,
      tags,
      history: [],
    });

    setTitle("");
  };

  return (
    <div>
      <MyInput
        placeholder="Название упражнения"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <MySelect
        value={muscle}
        onChange={(e) => setMuscle(e.target.value as MuscleGroup)}
      >
        {MUSCLES.map((m) => (
          <option key={m} value={m}>
            {MUSCLE_LABELS[m]}
          </option>
        ))}
      </MySelect>

      <br />

      <MySelect
        value={day}
        onChange={(e) => setDay(e.target.value as TrainingDayTag)}
      >
        {DAYS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </MySelect>

      <br />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
