import { useMemo, useState } from "react";
import { useGymStore } from "../../../app/store/gym.store";
import type {
  Exercise,
  WorkoutSet,
} from "../../../entities/exercise/model/types";

import { MyButton } from "../../../ui/MyButton/MyButton";
import { MyInput } from "../../../ui/MyInput/MyInput";

import cl from "./SaveWorkoutForm.module.css";

type Props = {
  exercise: Exercise;

  onClose: () => void;
};

const DEFAULT_SETS: WorkoutSet[] = [
  {
    id: crypto.randomUUID(),

    reps: 10,

    weight: 0,
  },
];

export const SaveWorkoutForm = ({ exercise, onClose }: Props) => {
  const saveWorkout = useGymStore((state) => state.saveWorkout);

  const activeProfileId = useGymStore((state) => state.activeProfileId);

  const profileData = useMemo(() => {
    if (!activeProfileId) {
      return {
        trainingDay: "день-1" as const,

        history: [],
      };
    }

    return (
      exercise.profiles[activeProfileId] ?? {
        trainingDay: "день-1" as const,

        history: [],
      }
    );
  }, [exercise.profiles, activeProfileId]);


  const todayWorkout = useMemo(() => {
    return profileData.history.find(
      (entry) =>
        new Date(entry.createdAt).toDateString() === new Date().toDateString(),
    );
  }, [profileData.history]);

  const lastWorkout = useMemo(() => {
    return todayWorkout ?? profileData.history[profileData.history.length - 1];
  }, [profileData.history, todayWorkout]);

  const [sets, setSets] = useState<WorkoutSet[]>(() => {
    if (!lastWorkout) {
      return DEFAULT_SETS;
    }


    const isToday =
      new Date(lastWorkout.createdAt).toDateString() ===
      new Date().toDateString();

    if (isToday) {
      return lastWorkout.sets.map((set) => ({
        ...set,

        weight: set.weight ?? lastWorkout.sets[0]?.weight ?? 0,
      }));
    }

    const lastSet = lastWorkout.sets[lastWorkout.sets.length - 1];

    return [
      {
        id: crypto.randomUUID(),

        reps: lastSet?.reps ?? 10,

        weight: lastSet?.weight ?? 0,
      },
    ];
  });

  const [comment, setComment] = useState<string>("");

  const updateSet = (
    index: number,
    field: "weight" | "reps",
    value: number,
  ) => {
    setSets((prev) =>
      prev.map((set, i) =>
        i === index
          ? {
              ...set,

              [field]: value,
            }
          : set,
      ),
    );
  };

  const addSet = () => {
    setSets((prev) => {
      const lastSet = prev[prev.length - 1];

      return [
        ...prev,
        {
          id: crypto.randomUUID(),

          reps: lastSet?.reps ?? 10,

          weight: lastSet?.weight ?? 0,
        },
      ];
    });
  };

  const removeSet = (id: string) => {
    setSets((prev) => {
      if (prev.length <= 1) {
        return prev;
      }

      return prev.filter((set) => set.id !== id);
    });
  };

  const handleSaveWorkout = () => {
    const normalizedComment = /^\d+$/.test(comment.trim())
      ? `${comment.trim()} повт.`
      : comment.trim();

    saveWorkout(exercise.id, {
      id: todayWorkout?.id ?? crypto.randomUUID(),

      createdAt: todayWorkout?.createdAt ?? new Date().toISOString(),

      comment: normalizedComment,

      sets,
    });

    onClose();
  };

  return (
    <div className={cl.form}>
      <div className={cl.sets}>
        {sets.map((set, index) => (
          <div key={set.id} className={cl.setCard}>
            <MyInput
              label="Kg"
              type="number"
              value={set.weight}
              onChange={(e) =>
                updateSet(index, "weight", Number(e.target.value))
              }
              placeholder="Вес"
            />

            <MyInput
              label="Повторы"
              type="number"
              value={set.reps}
              onChange={(e) => updateSet(index, "reps", Number(e.target.value))}
              placeholder="Повторы"
            />

            <MyButton
              className={cl.removeBtn}
              onClick={() => removeSet(set.id)}
            >
              Х
            </MyButton>
          </div>
        ))}
      </div>

      <div className={cl.comment}>
        <MyInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Комментарий"
          label="Комментарий"
        />
      </div>

      <div className={cl.actions}>
        <MyButton className={cl.addBtn} onClick={addSet}>
          + подход
        </MyButton>

        <MyButton className={cl.saveBtn} onClick={handleSaveWorkout}>
          Сохранить
        </MyButton>
      </div>
    </div>
  );
};
