import { useEffect, useRef } from "react";
import { MUSCLE_META } from "../../entities/exercise/model/muscle-meta";
import type { Exercise } from "../../entities/exercise/model/types";
import cl from "./ExerciseCard.module.css";

type Props = {
  exercise: Exercise;

  onClick: () => void;
};

export const ExerciseCard = ({ exercise, onClick }: Props) => {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = historyRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, [exercise.history]);

  const isMuscle = (tag: string): tag is keyof typeof MUSCLE_META =>
    tag in MUSCLE_META;

  const formatTag = (tag: string) => {
    if (isMuscle(tag)) {
      return MUSCLE_META[tag];
    }

    return {
      label: tag,
      icon: null,
    };
  };

  return (
    <div className={cl.card} onClick={onClick}>
      <div className={cl.left}>
        {exercise.tags.map((tag) => {
          const meta = formatTag(tag);

          return (
            <div key={tag} className={cl.tag}>
              {meta.icon && <img src={meta.icon} className={cl.icon} />}

              <div>
                <p className={cl.tagLabel}>{meta.label}</p>
              </div>
            </div>
          );
        })}
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
                className={`${cl.historyItem} ${isLast ? cl.activeHistoryItem : ""}`}
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
