import { useState } from "react";
import { ExercisesList } from "../componennts/exercises/ExercisesList";

import { AddExerciseForm } from "../features/add-exercise/ui/AddExerciseForm";
import { AddProfileForm } from "../features/add-profile/ui/AddProfileForm";
import { MyButton } from "../ui/MyButton/MyButton";
import { ProfileSwitcher } from "../widgets/profile-switcher/ProfileSwitcher";
import cl from "./ExercisesPage.module.css";


export const ExercisesPage = () => {

  const [isVisible, setIsVisible] = useState(false)
  const [isProfileVisible, setIsProfileVisible] = useState(false)


  return (
    <div className={cl.wrapper}>
      <ProfileSwitcher/>
      <ExercisesList/>
      {isVisible ? <AddExerciseForm setIsVisible={setIsVisible}/> : <MyButton onClick={() => setIsVisible(true)}>Добавить упражнение</MyButton>}
      {isProfileVisible ? <AddProfileForm setIsVisible={setIsProfileVisible}/> : <MyButton onClick={() => setIsProfileVisible(true)}>Добавить профиль</MyButton>}
    </div>
  );
};
