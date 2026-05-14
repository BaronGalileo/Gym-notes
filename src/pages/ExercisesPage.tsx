import { useState } from "react";
import { ExercisesList } from "../componennts/exercises/ExercisesList";

import { AddExerciseForm } from "../features/add-exercise/ui/AddExerciseForm";
import { MyButton } from "../ui/MyButton/MyButton";


export const ExercisesPage = () => {

  const [isVisible, setIsVisible] = useState(false)


  return (
    <div>
      {/* <ResetButton /> */}
      <ExercisesList/>
      {isVisible ? <AddExerciseForm setIsVisible={setIsVisible}/> : <MyButton onClick={() => setIsVisible(true)}>Добавить упражнение</MyButton>}
    </div>
  );
};
