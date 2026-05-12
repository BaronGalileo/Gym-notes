import { useGymStore } from "../../app/store/gym.store"

export const ResetButton = () => {
  const reset = useGymStore((state) => state.reset)

  return (
    <button onClick={reset}>
      Сбросить всё
    </button>
  )
}