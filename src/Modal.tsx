import Modal from "react-modal";
import { Task } from "./App";
import { useEffect, useState } from "react";
import Confirmation from "./Confirmation";
import axios from "axios";

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

  const update_task = (title: string, id: string) => {
    if (!(title === "")) {
      axios.post("http://localhost:3000", {
        command: { type: "update_task", data: { title: title, id: id } },
      });
      setEditingID(null);
    }
  };

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={editingId ? true : false}
        style={customStyle}
        onRequestClose={() => {
          if (editingTask1 && editingTask2) {
            if (
              editingTask1.__v === editingTask2.__v &&
              editingTask1._id === editingTask2._id &&
              editingTask1.completed === editingTask2.completed &&
              editingTask1.title === editingTask2.title
            ) {
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
                  _id: editingTask2._id,
                  __v: editingTask2.__v,
                  completed: editingTask2.completed,
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
                if (
                  editingTask1.__v === editingTask2.__v &&
                  editingTask1._id === editingTask2._id &&
                  editingTask1.completed === editingTask2.completed &&
                  editingTask1.title === editingTask2.title
                ) {
                  setEditingID(null);
                } else {
                  update_task(editingTask2.title, editingTask2._id);
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
                setEditingID(null);
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
