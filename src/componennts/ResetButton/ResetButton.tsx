import { useGymStore } from "../../app/store/gym.store"
import { MyButton } from "../../ui/MyButton/MyButton"

export const ResetButton = () => {
  const reset = useGymStore((state) => state.reset)

  return (
    <MyButton onClick={reset}>
      Сбросить всё
    </MyButton>
  )
}