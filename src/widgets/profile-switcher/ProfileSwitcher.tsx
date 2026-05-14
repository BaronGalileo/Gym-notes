// import { useGymStore } from "../../app/store/gym.store";

// import cl from "./ProfileSwitcher.module.css";

// export const ProfileSwitcher = () => {
//   const profiles = useGymStore(
//     (state) => state.profiles,
//   );

//   const activeProfileId = useGymStore(
//     (state) => state.activeProfileId,
//   );

//   const setActiveProfile = useGymStore(
//     (state) => state.setActiveProfile,
//   );

//   return (
//     <div className={cl.wrapper}>
//       {profiles.map((profile) => {
//         const active =
//           profile.id === activeProfileId;

//         return (
//           <button
//             key={profile.id}
//             className={`${cl.profile} ${
//               active ? cl.active : ""
//             }`}
//             onClick={() =>
//               setActiveProfile(profile.id)
//             }
//           >
//             {profile.name}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

import { useState } from "react";
import { useGymStore } from "../../app/store/gym.store";

import cl from "./ProfileSwitcher.module.css";

export const ProfileSwitcher = () => {
  const profiles = useGymStore((s) => s.profiles);
  const activeProfileId = useGymStore((s) => s.activeProfileId);
  const setActiveProfile = useGymStore((s) => s.setActiveProfile);

  const [open, setOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  const otherProfiles = profiles.filter((p) => p.id !== activeProfileId);

  return (
    <div className={cl.wrapper}>
      {/* активный */}
      <button className={cl.activeButton} onClick={() => setOpen((v) => !v)}>
        <span>{activeProfile?.name ?? "Профиль"}</span>

        <span className={`${cl.arrow} ${open ? cl.rotated : ""}`}>▼</span>
      </button>

      {/* dropdown */}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
