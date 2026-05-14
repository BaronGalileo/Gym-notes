import { MyButton } from "../../../ui/MyButton/MyButton";
import cl from "./ConfirmModal.module.css";

type Props = {
  title: string;
  description?: string;
  btnCancelText?: string;
  btnOkText?: string;

  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  title,
  description,
  btnCancelText = "Отмена",
  btnOkText = "Удалить",
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className={cl.overlay}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>

        {description && <p>{description}</p>}

        <div className={cl.actions}>
          <MyButton onClick={onCancel}>
            {btnCancelText}
          </MyButton>

          <MyButton onClick={onConfirm}>
            {btnOkText}
          </MyButton>
        </div>
      </div>
    </div>
  );
};