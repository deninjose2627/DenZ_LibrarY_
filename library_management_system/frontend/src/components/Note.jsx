import React from "react";
// import "../styles/Note.css"

function Note({ note, onDelete, onModify }) { // Add onModify prop
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container" style={{border: '5px solid black', backgroundColor:' #82c4d4', padding: '10px', margin: '10px'}}>
            <img src={note.image} alt={note.file} style={{width:'200px'}}/>
            <p className="note-title">TITLE: {note.title}</p>
            <p className="note-title">AUTHOR: {note.author}</p>
            <p className="note-date">Published on:{note.publish_year}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
            <button className="modify-button" onClick={() => onModify(note.id)}> {/* Modify button */}
                Modify
            </button>
        </div>
    );
}

export default Note;
