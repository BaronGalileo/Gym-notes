import { useState } from "react";

import { useGymStore } from "../../../app/store/gym.store";

import { IconButton } from "../../../ui/IconButton/IconButton";
import { MyButton } from "../../../ui/MyButton/MyButton";
import { MyInput } from "../../../ui/MyInput/MyInput";

import cl from "./AddProfileForm.module.css";

type Props = {
  setIsVisible: (visible: boolean) => void;
};

export const AddProfileForm = ({
  setIsVisible,
}: Props) => {
  const addProfile = useGymStore(
    (state) => state.addProfile,
  );

  const profiles = useGymStore(
    (state) => state.profiles,
  );

  const [name, setName] = useState("");

  const handleAdd = () => {
    const exists = profiles.some(
      (profile) =>
        profile.name.trim().toLowerCase() ===
        name.trim().toLowerCase(),
    );

    if (exists) {
      alert("Профиль уже существует");
      return;
    }

    addProfile(name);

    setName("");

    setIsVisible(false);
  };

  return (
    <div className={cl.wrapper}>
      <IconButton
        className={cl.closeBtn}
        onClick={() => setIsVisible(false)}
      />

      <h2>Новый профиль</h2>

      <MyInput
        label="Имя профиля"
        placeholder="Введите имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <MyButton
        disabled={!name.trim()}
        onClick={handleAdd}
      >
        Создать
      </MyButton>
    </div>
  );
};