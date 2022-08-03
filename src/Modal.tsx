import Modal from "react-modal";

interface EditingModalProps {
  editingId: string | null;
  setEditingID: Function;
}

const customStyle = {
  content: {
    top: "50%",
    left: "10px",
    right: "10px",
    bottom: "auto",
    transform: "translate(0, -50%)",
    maxWidth: "350px",
    maxHeight: "250px",
    margin: "auto",
  },
};

const EditModal = (props: EditingModalProps) => {
  const { editingId, setEditingID } = props;

  return (
    <>
      <Modal
        isOpen={editingId ? true : false}
        style={customStyle}
        onRequestClose={() => setEditingID(null)}
      >
        {editingId}
      </Modal>
    </>
  );
};

export default EditModal;
