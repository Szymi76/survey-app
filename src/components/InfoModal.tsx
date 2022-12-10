import React from "react";

type InfoModalProps = {
  children: React.ReactNode;
};

const InfoModal = ({ children }: InfoModalProps) => {
  return (
    <div className="info-modal-wrapper">
      <div className="info-modal">{children}</div>
    </div>
  );
};

export default InfoModal;
