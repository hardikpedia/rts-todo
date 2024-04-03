import Note from "./Note"
import { NoteProps } from "./Note"

type Note=Omit<NoteProps,"deleteNote"|"markCompleted">;

type NotelistProps={
    sortedNotes:(notes:Note[])=>Note[];
    filteredNotes:Note[];
    deleteNote:(id:number)=>void;
    markCompleted:(id:number,completed:boolean)=>void;
}




export default function NoteList({ deleteNote, markCompleted, sortedNotes, filteredNotes}:NotelistProps){
    return(
        <div className="flex flex-wrap mt-5 justify-center pb-8 gap-10">
          {sortedNotes(filteredNotes).map((noteItem:Note) => (
            <Note
              key={noteItem.id}
              {...noteItem}
              deleteNote={deleteNote}
              markCompleted={markCompleted}
            />
          ))}
        </div>
    )
}