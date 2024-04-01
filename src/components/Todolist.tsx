import { useState, useEffect } from "react";
import Note from "./Note.js";
import CreateArea from "./CreateArea";
import notingIcon from "../assets/noty.png";
import useLocalStorageState from "../hooks/useLocalStorageState.js";

function Todolist() {
  // State variables
  const [notes, setNotes] = useLocalStorageState("notes", []);
  const [sortBy, setSortBy] = useLocalStorageState("sortBy", "");
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortButtonActive, setSortButtonActive] = useState("");
  const [filterButtonActive, setFilterButtonActive] = useLocalStorageState(false);

  // Side effects
  useEffect(() => {
    setSortButtonActive(sortBy);
  }, [sortBy, showCompleted]);

  useEffect(() => {
    setFilterButtonActive(showCompleted);
  }, [showCompleted]);

  // Handlers
  const handleSortBy = (sortByValue) => {
    setSortBy(sortByValue);
    setSortButtonActive(sortByValue);
    setFilterButtonActive(false);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
    setFilterButtonActive(!showCompleted);
    setSortButtonActive("");
  };

  // Utility functions
  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const markCompleted = (id, completed) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, completed } : note
    );
    setNotes(newNotes);
  };

  const sortedNotes = (notesToSort) => {
    switch (sortBy) {
      case "createdAt":
        return [...notesToSort].sort((a, b) => a.createdAt - b.createdAt);
      case "name":
        return [...notesToSort].sort((a, b) => a.title.localeCompare(b.title));
      case "deadline":
        return [...notesToSort].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "priority":
        return [...notesToSort].sort((a, b) => a.priority - b.priority);
      default:
        return notesToSort;
    }
  };

  const filteredNotes = showCompleted
    ? notes.filter((note) => note.completed)
    : notes;

  return (
    <div className="text-white">
      <header className="bg-transparent py-4 rounded-b-xl shadow">
        <h1 className="text-white text-center text-3xl font-semibold">
          <img
            src={notingIcon}
            height={40}
            width={40}
            alt="noting"
            className="inline-block mr-2"
          />
          Todolist
        </h1>
        <div className="flex justify-center mt-10 hover:cursor-pointer gap-5">
          <SortButton
            label="Sort by Name"
            active={sortButtonActive === "name"}
            onClick={() => handleSortBy("name")}
          />
          <SortButton
            label="Sort by Created At"
            active={sortButtonActive === "createdAt"}
            onClick={() => handleSortBy("createdAt")}
          />
          <SortButton
            label="Sort by Deadline"
            active={sortButtonActive === "deadline"}
            onClick={() => handleSortBy("deadline")}
          />
          <SortButton
            label="Sort by Priority"
            active={sortButtonActive === "priority"}
            onClick={() => handleSortBy("priority")}
          />
          <div
            onClick={handleToggleCompleted}
            className={`border-2 border-white p-2 ${
              filterButtonActive ? "bg-green-500" : ""
            }`}
          >
            Toggle Completed
          </div>
        </div>
      </header>

      <div>
        <CreateArea addNote={addNote} />
        <div className="flex flex-wrap mt-5 justify-center pb-8 gap-10">
          {sortedNotes(filteredNotes).map((noteItem) => (
            <Note
              key={noteItem.id}
              {...noteItem}
              deleteNote={deleteNote}
              markCompleted={markCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sort Button Component
function SortButton({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`mr-2 border-2 border-white p-2 ${active ? "bg-green-500" : ""}`}
    >
      {label}
    </div>
  );
}

export default Todolist;
