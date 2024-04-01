import { Close } from "@mui/icons-material";
export default function Modal({ note, handleChange, submitNote, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-50 "></div>
      <div className="z-20 bg-primary rounded-lg p-8 w-80">
        <form className="create-note relative">
          <Close
            onClick={closeModal}
            className="absolute rounded-full hover:bg-gray-300 text-white bg-primary hover:text-black p-2 cursor-pointer"
            style={{ top: "-5rem", right: "-5rem", fontSize: "3em" }}
          />

          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            className="w-full mb-2 p-2 border border-gray-800 bg-primary rounded-md focus:outline-none focus:ring focus:border-black"
          />
          <textarea
            name="note"
            onChange={handleChange}
            value={note.note}
            placeholder="Take a note..."
            rows={3}
            className="w-full mb-2 p-2 border bg-primary border-gray-800 rounded-md focus:outline-none focus:ring focus:border-black"
          />
          <input
            type="date"
            name="deadline"
            onChange={handleChange}
            value={note.deadline}
            placeholder="Date"
            className="w-full mb-2 p-2 pl-8 border bg-primary border-gray-800 rounded-md focus:outline-none focus:ring focus:border-black placeholder:text-gray-500"
            style={{ colorScheme: "dark" }}
          />
          <select
            name="priority"
            onChange={handleChange}
            value={note.priority}
            className="w-full mb-2 p-2 border border-gray-800 rounded-md bg-primary focus:outline-none focus:ring focus:border-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex justify-end mt-2">
            <button
              onClick={submitNote}
              className="bg-primary hover:bg-gray-800 text-white py-2 px-4 rounded-md mr-2 border-white border-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
