import Modal from "react-modal";

interface ConfirmationProps {
  isOpen: boolean;
  saveTask: React.MouseEventHandler<HTMLButtonElement>;
  destroyEditting: React.MouseEventHandler<HTMLButtonElement>;
}

const customStyle = {
  content: {
    padding: "10px",
    top: "50%",
    left: "10px",
    right: "10px",
    bottom: "auto",
    transform: "translate(0, -50%)",
    maxWidth: "110px",
    maxHeight: "250px",
    margin: "auto",
  },
};

const Confirmation = (props: ConfirmationProps) => {
  const { isOpen, saveTask, destroyEditting } = props;

  return (
    <Modal isOpen={isOpen} style={customStyle} ariaHideApp={false}>
      <div style={{ textAlign: "center" }}>
        <button onClick={saveTask}>Save</button>
        <button onClick={destroyEditting}>Destroy</button>
      </div>
    </Modal>
  );
};

export default Confirmation;
