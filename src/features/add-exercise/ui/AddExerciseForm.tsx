import { useState } from "react";
import { useGymStore } from "../../../app/store/gym.store";
import type {
  Exercise,
  MuscleGroup,
  TrainingDayTag,
} from "../../../entities/exercise/model/types";
import { ConfirmModal } from "../../../shared/ui/ConfirmModal/ConfirmModal";
import { IconButton } from "../../../ui/IconButton/IconButton";
import { MyButton } from "../../../ui/MyButton/MyButton";
import { MyInput } from "../../../ui/MyInput/MyInput";
import { MySelect } from "../../../ui/MySelect/MySelect";
import { ExerciseModal } from "../../../widgets/exercise-modal/ExerciseModal";
import cl from "./AddExerciseForm.module.css";

type Props = {
  setIsVisible: (visible: boolean) => void;
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

export const AddExerciseForm = ({ setIsVisible }: Props) => {
  const addExercise = useGymStore((state) => state.addExercise);

  const exercises = useGymStore((state) => state.exercises);

  const [title, setTitle] = useState("");

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [muscle, setMuscle] = useState<MuscleGroup>("chest");

  const [day, setDay] = useState<TrainingDayTag>("день-1");

  const handleAdd = () => {
    const existingExercise = exercises.find(
      (ex) => ex.title.trim().toLowerCase() === title.trim().toLowerCase(),
    );

    if (existingExercise) {
      setIsConfirmOpen(true);
      setSelectedExercise(existingExercise);
      return;
    } else {
      addExercise({
        title,
        muscleGroups: muscle,
        trainingDay: day,
      });
      setTitle("");
      setIsVisible(false);
    }
  };

  const handleConfirm = () => {
    setIsOpenModal(true);
    setIsConfirmOpen(false);
  };

  return (
    <div className={cl.wrapper}>
      {isConfirmOpen && selectedExercise && (
        <ConfirmModal
          title="Упражнение есть"
          description={`Перейти в ${selectedExercise.title}`}
          btnCancelText="Назад"
          btnOkText="Перейти"
          onConfirm={() => {
            setIsOpenModal(true);
            handleConfirm();
          }}
          onCancel={() => setSelectedExercise(null)}
        />
      )}
      {isOpenModal && selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
      <IconButton className={cl.closeBtn} onClick={() => setIsVisible(false)} />
      <h2>Новое упражнение</h2>
      <MyInput
        label="Введите название упражнения"
        placeholder="Название упражнения"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MySelect
        label="Группа мышц"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value as MuscleGroup)}
      >
        {MUSCLES.map((m) => (
          <option key={m} value={m}>
            {MUSCLE_LABELS[m]}
          </option>
        ))}
      </MySelect>

      <MySelect
        label="День тренировки"
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

      <MyButton disabled={!title} onClick={handleAdd}>
        Добавить
      </MyButton>
    </div>
  );
};
