import { useEffect, useRef, useState } from "react";
import { MUSCLE_META } from "../../entities/exercise/model/muscle-meta";
import type {
  Exercise,
  TrainingDayTag,
} from "../../entities/exercise/model/types";
import { MySelect } from "../../ui/MySelect/MySelect";
import cl from "./ExerciseCard.module.css";

type Props = {
  exercise: Exercise;
  onClick: () => void;
  onMoveToDay?: (exerciseId: string, day: TrainingDayTag) => void;
};

export const ExerciseCard = ({ exercise, onClick, onMoveToDay }: Props) => {
  const historyRef = useRef<HTMLDivElement>(null);

  const DAYS: TrainingDayTag[] = [
    "день-1",
    "день-2",
    "день-3",
    "день-4",
    "день-5",
    "день-6",
    "день-7",
  ];

  const [isEditingDay, setIsEditingDay] = useState(false);

  useEffect(() => {
    const el = historyRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, [exercise.history]);


  const meta = MUSCLE_META[exercise.muscleGroups as keyof typeof MUSCLE_META];

  return (
    <div className={cl.card} onClick={onClick}>
      <div className={cl.left}>
        <div className={cl.tag}>
          {meta.icon && <img src={meta.icon} className={cl.icon} />}

          <p className={cl.tagLabel}>{meta.label}</p>
        </div>
        {!isEditingDay ? (
          <div
            className={cl.dayTag}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingDay(true);
            }}
          >
            {exercise.trainingDay.replace("день-", "День ")}
          </div>
        ) : (
          <MySelect
            className={cl.dayTag}
            value={exercise.trainingDay}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setIsEditingDay(false)}
            onChange={(e) => {
              const newDay = e.target.value as TrainingDayTag;

              onMoveToDay?.(exercise.id, newDay);
              setIsEditingDay(false);
            }}
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day.replace("день-", "День ")}
              </option>
            ))}
          </MySelect>
        )}
      </div>
      <div className={cl.right}>
        <h3 className={cl.title}>{exercise.title}</h3>

        <div className={cl.history} ref={historyRef}>
          {exercise.history.map((entry, index) => {
            const lastSet = entry.sets[entry.sets.length - 1];

            const isLast = index === exercise.history.length - 1;

            return (
              <div
                key={entry.id}
                className={`${cl.historyItem} ${
                  isLast ? cl.activeHistoryItem : ""
                }`}
              >
                <p>{new Date(entry.createdAt).toLocaleDateString()}</p>

                {entry.comment && <p>{entry.comment}</p>}

                <strong>
                  {lastSet.weight}kg × {lastSet.reps}
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
