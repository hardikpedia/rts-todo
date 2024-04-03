import { useState } from "react";
import { Tooltip } from "react-tooltip";

export type NoteProps = {
  id: number;
  title: string;
  note: string;
  deadline: string;
  priority: string;
  createdAt: string;
  completed: boolean;
  deleteNote: (id: number) => void;
  markCompleted: (id: number, completed: boolean) => void;
};

function Note({
  id,
  note,
  title,
  deleteNote,
  markCompleted,
  createdAt,
  completed,
  priority,
  deadline,
}: NoteProps) {
  
  const [isCompleted, setIsCompleted] = useState(completed);

  function handleDelete() {
    deleteNote(id);
  }

  function handleToggleCompleted() {
    setIsCompleted(!isCompleted);
    markCompleted(id, !isCompleted); // Toggle the completed state
  }

  return (
    <div className="rounded-lg shadow-xl bg-transparent border text-white font-mono w-1/3 sm:w-1/3">
      <div className="flex justify-between items-center border-b border-gray-800 px-8 py-3">
        <div
          className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center ${
            isCompleted ? "bg-green-500" : "bg-yellow-500"
          }`}
          onClick={handleToggleCompleted}
          title={isCompleted ? "Incomplete" : "Complete"}
          data-tooltip-id="complete-tooltip"
          data-tooltip-content={isCompleted ? "Incomplete" : "Complete"}
        >
          <Tooltip id="complete-tooltip" />

          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <div
          className="w-6 h-6 rounded-full bg-red-500 cursor-pointer flex items-center justify-center"
          title="Delete"
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Delete"
          onClick={handleDelete}
        >
          <div className="w-4 h-1 bg-white transform rotate-45 absolute"></div>
          <div className="w-4 h-1 bg-white transform -rotate-45 absolute"></div>
          <Tooltip id="delete-tooltip" />
        </div>
      </div>
      <div className="px-8 py-6 flex items-center ">
        <div>
          <p>
            <em className="text-blue-400">const</em>{" "}
            <span className="text-green-400">Todo</span>{" "}
            <span className="text-pink-500">=</span>{" "}
            <em className="text-blue-400">function</em>() {"{"}
          </p>
          <p>
            &nbsp;&nbsp;<span className="text-pink-500">return</span> {"{"}
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;title:{" "}
            <span className="text-yellow-300">{title}</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;note:{" "}
            <span className="text-yellow-300">{note}</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;createdAt:{" "}
            <span className="text-yellow-300">{createdAt}</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;deadline:{" "}
            <span className="text-yellow-300">{deadline}</span>,
          </p>
          <p className="flex items-center font-bold">
            &nbsp;&nbsp;&nbsp;&nbsp;priority:{"  "}&nbsp;
            {priority === "low" && (
              <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
            )}
            {priority === "medium" && (
              <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
            )}
            {priority === "high" && (
              <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
            )}
            <span className="text-yellow-300">{priority}</span>,
          </p>

          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;status:{" "}
            <span
              className={`text-yellow-200 font-bold ${
                isCompleted ? " bg-green-600" : "bg-red-600"
              }`}
            >
              {isCompleted ? <>COMPLETED &#10003;</> : "PENDING..."}
            </span>
          </p>

          <p>&nbsp;&nbsp;{"}"}</p>
          <p>{"}"}</p>
        </div>
      </div>
    </div>
  );
}

export default Note;
