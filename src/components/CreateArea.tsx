import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { Tooltip } from "react-tooltip";
import Modal from "./Modal";
import { NoteProps } from "./Note";

type CreateAreaProps = {
  addNote: (note: Omit<NoteProps, "deleteNote" | "markCompleted">) => void;
};

function CreateArea({ addNote }: CreateAreaProps) {
  // State variables
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    note: "",
    deadline: "",
    priority: "low",
  });

  // Event handlers
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    addNote({
      ...note,
      createdAt: new Date().toLocaleDateString(),
      id: new Date().getTime(),
      completed: false,
    });
    setNote({
      title: "",
      note: "",
      deadline: "",
      priority: "low",
    });
    setExpanded(false);
    event.preventDefault();
  };

  const expand = () => {
    setExpanded(true);
  };

  const closeModal = () => {
    setExpanded(false);
  };

  return (
    <div>
      <Zoom in={!isExpanded}>
        <Fab
          onClick={expand}
          className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-mono"
          title="Add Note"
          data-tooltip-id="add-tooltip"
          data-tooltip-content={"Add Note"}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <Tooltip id="add-tooltip" />

      {isExpanded && (
        <Modal
          note={note}
          handleChange={handleChange}
          submitNote={submitNote}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default CreateArea;
