import Modal from "react-modal";
import { Task } from "./interface";
import { useEffect, useState } from "react";
import Confirmation from "./Confirmation";
import { update_task } from "./API";

interface EditingModalProps {
  editingId: string | null;
  setEditingID: Function;
  tasks: Task[];
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
  const { editingId, setEditingID, tasks } = props;

  // 1=original 2=edit
  const [editingTask1, setEditingTask1] = useState<Task | null>(null);
  const [editingTask2, setEditingTask2] = useState<Task | null>(null);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const isChanged = () => {
    if (editingTask1 && editingTask2) {
      return (
        editingTask1.__v === editingTask2.__v &&
        editingTask1._id === editingTask2._id &&
        editingTask1.completed === editingTask2.completed &&
        editingTask1.title === editingTask2.title
      );
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (editingId === null) {
      setEditingTask1(null);
      setEditingTask2(null);
    } else {
      tasks.forEach((val, index) => {
        if (val._id === editingId) {
          setEditingTask1(tasks[index]);
          setEditingTask2(tasks[index]);
        }
      });
    }
  }, [editingId, tasks]);

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={editingId ? true : false}
        style={customStyle}
        onRequestClose={() => {
          if (editingTask1 && editingTask2) {
            if (isChanged()) {
              setEditingID(null);
            } else {
              setOpenConfirmationModal(true);
            }
          }
        }}
      >
        {editingTask1 && editingTask2 ? (
          <div style={{ textAlign: "center" }}>
            <input
              value={editingTask2.title}
              onChange={(e) =>
                setEditingTask2({
                  ...editingTask2,
                  title: e.target.value,
                })
              }
            />
            <button
              onClick={() => {
                setEditingID(null);
              }}
            >
              Cansel
            </button>
            <button
              onClick={() => {
                if (isChanged()) {
                  setEditingID(null);
                } else {
                  update_task(editingTask2.title, editingTask2._id);
                  setEditingID(null);
                }
              }}
            >
              Save
            </button>
            <Confirmation
              isOpen={openConfirmationModal}
              saveTask={() => {
                update_task(editingTask2.title, editingTask2._id);
                setEditingID(null);
                setOpenConfirmationModal(false);
              }}
              destroyEditting={() => {
                setOpenConfirmationModal(false);
                setEditingID(null);
              }}
            />
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default EditModal;
