type Props = {
  name: "грудь" | "спина" | "ноги" | "плечи" | "бицепс" | "трицепс";

  size?: number;
};

export const MuscleIcon = ({ name, size = 24 }: Props) => {
  return (
    <svg width={size} height={size} fill="none">
      <use href={`#${name}`} />
    </svg>
  );
};
