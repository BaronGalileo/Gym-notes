import { useState } from "react";

import { useGymStore } from "../app/store/gym.store";


import { ResetButton } from "../componennts/ResetButton/ResetButton";

import { AddExerciseForm } from "../features/add-exercise/ui/AddExerciseForm";

import { ExerciseCard } from "../componennts/exercises/ExerciseCard";
import type { Exercise } from "../entities/exercise/model/types";
import { ExerciseModal } from "../widgets/exercise-modal/ExerciseModal";



export const ExercisesPage = () => {
  const exercises = useGymStore(
    (state) => state.exercises
  );

  const [
    selectedExercise,
    setSelectedExercise,
  ] = useState<Exercise | null>(null);


  return (
    <div>
      <ResetButton />

      <AddExerciseForm />

      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onClick={() =>
            setSelectedExercise(exercise)
          }
        />
      ))}

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() =>
            setSelectedExercise(null)
          }
        />
      )}
    </div>
  );
};
