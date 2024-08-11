import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import noteContext from "../context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      console.log(localStorage.getItem('token'));
    } else {
      navigate("/login");

    }
    // eslint-disable-next-line
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" }); // Initialize with defined values

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    // console.log ("Updating Note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success")
    // e.preventDefault();
    // You might want to add logic here to handle the form submission
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Note Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle} // Ensure fallback value
                    name="etitle" // Corrected name to "title"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription} // Ensure fallback value
                    name="edescription" // Corrected name to "description"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag} // Ensure fallback value
                    name="etag" // Corrected name to "tag"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button> {/* Add onClick handler */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Our Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No Notes Available !'}
        </div>
        {notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={() => updateNote(note)} note={note} />; // Pass updateNote as a reference
        })}
      </div>
    </>
  );
};
