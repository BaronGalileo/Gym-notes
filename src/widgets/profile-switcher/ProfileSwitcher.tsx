import { useState } from "react";
import { useGymStore } from "../../app/store/gym.store";

import type { Profile } from "../../entities/exercise/model/types";
import { AddProfileForm } from "../../features/add-profile/ui/AddProfileForm";
import { ConfirmModal } from "../../shared/ui/ConfirmModal/ConfirmModal";
import { IconButton } from "../../ui/IconButton/IconButton";
import { MyButton } from "../../ui/MyButton/MyButton";
import cl from "./ProfileSwitcher.module.css";

export const ProfileSwitcher = () => {
  const profiles = useGymStore((s) => s.profiles);
  const activeProfileId = useGymStore((s) => s.activeProfileId);
  const setActiveProfile = useGymStore((s) => s.setActiveProfile);
  const removeProfile = useGymStore((s) => s.removeProfile);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [confirmProfile, setConfirmProfile] = useState<Profile | null>(null);
  console.log("profiles", profiles);

  const [open, setOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  const otherProfiles = profiles.filter((p) => p.id !== activeProfileId);

  return (
    <div className={cl.wrapper}>
      <button className={cl.activeButton} onClick={() => setOpen((v) => !v)}>
        <span>{activeProfile?.name ?? "Профиль"}</span>

        <span className={`${cl.arrow} ${open ? cl.rotated : ""}`}>▼</span>
      </button>

      {open && (
        <div className={cl.dropdown}>
          {otherProfiles.map((profile) => (
            <button
              key={profile.id}
              className={cl.item}
              onClick={() => {
                setActiveProfile(profile.id);
                setOpen(false);
              }}
            >
              {profile.name}
              {profile.id !== "default-profile" &&
                <IconButton
                className={cl.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmProfile(profile);
                }}
              />
              }
            </button>
          ))}
          {isProfileVisible ? (
            <AddProfileForm setIsVisible={setIsProfileVisible} />
          ) : (
            <MyButton onClick={() => setIsProfileVisible(true)}>
              Добавить профиль
            </MyButton>
          )}
          {confirmProfile && (
            <ConfirmModal
              title={`Удалить профиль ${confirmProfile.name}`}
              description="Все данные профиля будут удалены"
              btnCancelText="Отмена"
              btnOkText="Удалить"
              onCancel={() => setConfirmProfile(null)}
              onConfirm={() => {
                removeProfile(confirmProfile.id);
                setConfirmProfile(null);
                setOpen(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
