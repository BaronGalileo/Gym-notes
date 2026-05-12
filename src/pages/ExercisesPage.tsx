
import { ExercisesList } from "../componennts/exercises/ExercisesList";
import { ResetButton } from "../componennts/ResetButton/ResetButton";

import { AddExerciseForm } from "../features/add-exercise/ui/AddExerciseForm";


export const ExercisesPage = () => {


  return (
    <div>
      <ResetButton />
      <AddExerciseForm />
      <ExercisesList/>
    </div>
  );
};
