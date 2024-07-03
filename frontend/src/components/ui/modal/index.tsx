import { Modal as ModalComponent } from "antd";
import { ModalType } from "src/types/components/modal";

const Modal = ({ width, setIsVisible, title, children, isVisible }: ModalType) => {
  const handleCancel = (): void => {
    setIsVisible && setIsVisible(false);
  };

  return (
    <ModalComponent
      destroyOnClose
      title={title}
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      width={width || 800}
    >
      {children}
    </ModalComponent>
  );
};

export default Modal;
