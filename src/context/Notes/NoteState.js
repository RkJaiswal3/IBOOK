import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      // console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      // console.log(json);

      const newNote = {
        _id: json._id,
        user: json.user, // Ensure this is consistent with your user context
        title,
        description,
        tag,
        date: json.date,
        __v: 0,
      };

      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
       await fetch(`${host}/api/notes/deleteNotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      // const json = await response.json();
      // console.log(json);

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
        await fetch(`${host}/api/notes/updateNotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // const json = await response.json();
      // console.log(json);

      const newNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );

      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to edit note", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
