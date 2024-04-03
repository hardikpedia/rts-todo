import { useState } from "react";
import Note, { NoteProps } from "./Note.js";
import CreateArea from "./CreateArea";
import useLocalStorageState from "../hooks/useLocalStorageState.js";
import Header from "./Header.js";
import NoteList from "./NoteList.js";

type Note = Omit<NoteProps, "deleteNote" | "markCompleted">;

export default function Todolist() {
  // State variables

  const [notes, setNotes] = useLocalStorageState<Note[]>("notes", []);
  const [sortBy, setSortBy] = useLocalStorageState("sortBy", "");
  const [showCompleted, setShowCompleted] = useState(false);

  // Handlers
  const handleSortBy = (sortByValue: string) => {
    setSortBy(sortByValue);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Utility functions
  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id: number) => {
    const newNotes = notes.filter((note: Note) => note.id !== id);
    setNotes(newNotes);
  };

  const markCompleted = (id: number, completed: boolean) => {
    const newNotes = notes.map((note: Note) =>
      note.id === id ? { ...note, completed } : note
    );
    setNotes(newNotes);
  };

  const sortedNotes = (notesToSort: Note[]) => {
    switch (sortBy) {
      case "SORT_BY_CREATED_AT":
        return [...notesToSort].sort(
          (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
        );
      case "SORT_BY_NAME":
        return [...notesToSort].sort((a, b) => a.title.localeCompare(b.title));
      case "SORT_BY_DEADLINE":
        return [...notesToSort].sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
      case "SORT_BY_PRIORITY":
        return [...notesToSort].sort(
          (a, b) => parseInt(a.priority) - parseInt(b.priority)
        );
      default:
        return notesToSort;
    }
  };

  const filteredNotes = showCompleted
    ? notes.filter((note: Note) => note.completed)
    : notes;

  return (
    <div className="text-white">
      <Header
        handleSortBy={handleSortBy}
        handleToggleCompleted={handleToggleCompleted}
        showCompleted={showCompleted}
        sortBy={sortBy}
      />
      <CreateArea addNote={addNote} />
      <NoteList
        deleteNote={deleteNote}
        markCompleted={markCompleted}
        sortedNotes={sortedNotes}
        filteredNotes={filteredNotes}
      />
    </div>
  );
}
