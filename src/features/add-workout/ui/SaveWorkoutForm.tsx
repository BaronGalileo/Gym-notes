import { useMemo, useState } from "react";

import { useGymStore } from "../../../app/store/gym.store";

import type {
  Exercise,
  WorkoutSet,
} from "../../../entities/exercise/model/types";
import { MyButton } from "../../../ui/MyButton/MyButton";
import { MyInput } from "../../../ui/MyInput/MyInput";

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

  const todayWorkout = null;

  // const todayWorkout = useMemo(() => {
  //   return exercise.history.find(
  //     (entry) =>
  //       new Date(entry.createdAt).toDateString() === new Date().toDateString(),
  //   );
  // }, [exercise.history]);

  const lastWorkout = useMemo(() => {
    return todayWorkout ?? exercise.history[exercise.history.length - 1];
  }, [exercise.history, todayWorkout]);

  const [sets, setSets] = useState<WorkoutSet[]>(
    lastWorkout
      ? lastWorkout.sets.map((set) => ({
          ...set,
          weight: set.weight ?? lastWorkout.sets[0]?.weight ?? 0,
        }))
      : DEFAULT_SETS,
  );

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
    setSets((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        reps: 10,
        weight: 0,
      },
    ]);
  };

  const removeSet = (id: string) => {
    setSets((prev) => {
      if (prev.length <= 1) return prev; // 👈 защита

      return prev.filter((set) => set.id !== id);
    });
  };

  const handleSaveWorkout = () => {
    saveWorkout(exercise.id, {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      comment,
      sets,
    });
    onClose();
  };

  // const handleSaveWorkout = () => {
  //   saveWorkout(exercise.id, {
  //     id: todayWorkout?.id ?? crypto.randomUUID(),
  //     createdAt: todayWorkout?.createdAt ?? new Date().toISOString(),
  //     comment,
  //     sets,
  //   });
  // };

  return (
    <div>
      {sets.map((set, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div>
            <label>KG</label>
            <MyInput
              type="number"
              value={set.weight}
              onChange={(e) =>
                updateSet(index, "weight", Number(e.target.value))
              }
              placeholder="kg"
            />
          </div>
          <div>
            <label>REPS</label>
            <MyInput
              type="number"
              value={set.reps}
              onChange={(e) => updateSet(index, "reps", Number(e.target.value))}
              placeholder="reps"
            />
          </div>
          <MyButton
            style={{ height: "50%", background: "red" }}
            onClick={() => removeSet(set.id)}
          >
            -
          </MyButton>
        </div>
      ))}
      <div>
        <MyInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="комментарий"
        />
      </div>

      <MyButton onClick={addSet}>+ Set</MyButton>
      <br />

      <MyButton onClick={handleSaveWorkout}>Сохранить</MyButton>
    </div>
  );
};
