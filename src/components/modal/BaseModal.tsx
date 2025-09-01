import React, { ReactNode } from 'react';

interface BaseModalProps {
  modalComponent: React.ComponentType<any>;
  modalArgs?: any;
  modalTitle?: string | null;
  showed: boolean;
  modalSize?: {
    width: string;
    height: string;
  };
  canCloseOnBackground?: boolean;
  onCloseModal: () => void;
  children?: ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  modalComponent: ModalComponent,
  modalArgs,
  modalTitle,
  showed,
  modalSize = { width: "1000px", height: "600px" },
  canCloseOnBackground = true,
  onCloseModal,
}) => {
  const closeModal = () => {
    onCloseModal();
  };

  if (!showed) return null;

  return (
    <div
      className="modal-background"
      style={{ display: showed ? 'flex' : 'none' }}
      onClick={() => {
        if (canCloseOnBackground) closeModal();
      }}
    >
      <div 
        tabIndex={-1} 
        className="modal" 
        style={{ 
          width: modalSize.width, 
          height: modalSize.height 
        }} 
        onClick={(event) => event.stopPropagation()}
      >
        {showed && (
          <ModalComponent 
            args={modalArgs} 
            showed={showed}
            onCloseModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default BaseModal;