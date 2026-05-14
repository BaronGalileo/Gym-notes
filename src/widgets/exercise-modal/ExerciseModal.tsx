// import { useState } from "react";
// import type { Exercise } from "../../entities/exercise/model/types";

// import { SaveWorkoutForm } from "../../features/add-workout/ui/SaveWorkoutForm";

// import { IconButton } from "../../ui/IconButton/IconButton";
// import { MyButton } from "../../ui/MyButton/MyButton";
// import cl from "./ExerciseModal.module.css";

// type Props = {
//   exercise: Exercise;

//   onClose: () => void;
// };

// export const ExerciseModal = ({ exercise, onClose }: Props) => {
//   const [expanded, setExpanded] = useState(false);
//   const visibleHistory = expanded
//     ? exercise.history
//     : exercise.history.slice(-3);
//   return (
//     <>
//       <div className={cl.overlay} onClick={onClose} />

//       <div className={cl.modal}>
//         <IconButton className={cl.closeBtn} onClick={onClose} />
//         <div className={cl.handle} />

//         <h2>{exercise.title}</h2>
//         {exercise.history.length > 3 && (
//           <MyButton
//             className={cl.expandBtn}
//             onClick={() => setExpanded((v) => !v)}
//           >
//             {expanded ? "Скрыть" : "Показать ещё"}
//           </MyButton>
//         )}
//         <div className={cl.history}>
//           {visibleHistory.map((entry) => (
//             <div key={entry.id} className={cl.historyItem}>
//               <p>{new Date(entry.createdAt).toLocaleDateString()}</p>

//               {entry.sets.map((set, index) => (
//                 <div key={index}>
//                   {set.weight}kg × {set.reps}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div className={cl.formWrapper}>
//           <SaveWorkoutForm exercise={exercise} onClose={onClose} />
//         </div>
//       </div>
//     </>
//   );
// };

import { useMemo, useState } from "react";

import type { Exercise } from "../../entities/exercise/model/types";

import { useGymStore } from "../../app/store/gym.store";

import { SaveWorkoutForm } from "../../features/add-workout/ui/SaveWorkoutForm";

import { IconButton } from "../../ui/IconButton/IconButton";
import { MyButton } from "../../ui/MyButton/MyButton";

import cl from "./ExerciseModal.module.css";

type Props = {
  exercise: Exercise;

  onClose: () => void;
};

export const ExerciseModal = ({ exercise, onClose }: Props) => {
  const [expanded, setExpanded] = useState(false);

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

  const visibleHistory = expanded
    ? profileData.history
    : profileData.history.slice(-3);

  return (
    <>
      <div className={cl.overlay} onClick={onClose} />

      <div className={cl.modal}>
        <IconButton className={cl.closeBtn} onClick={onClose} />

        <div className={cl.handle} />

        <h2>{exercise.title}</h2>

        {profileData.history.length > 3 && (
          <MyButton
            className={cl.expandBtn}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Скрыть" : "Показать ещё"}
          </MyButton>
        )}

        <div className={cl.history}>
          {visibleHistory
            .slice()
            .reverse()
            .map((entry) => (
              <div key={entry.id} className={cl.historyItem}>
                <p className={cl.historyDate}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>

                {entry.sets.map((set, index) => (
                  <div key={index} className={cl.setRow}>
                    <span>{set.weight}kg</span>

                    <span>× {set.reps}</span>
                  </div>
                ))}

                {entry.comment && (
                  <div className={cl.historyComment}>{entry.comment}</div>
                )}
              </div>
            ))}
        </div>

        <div className={cl.formWrapper}>
          <SaveWorkoutForm exercise={exercise} onClose={onClose} />
        </div>
      </div>
    </>
  );
};
