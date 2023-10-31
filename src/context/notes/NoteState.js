import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

//arrow fuction

export const NoteState = (props) => {
  // const id = props.id;
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setnote] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
    });
    const json = await response.json();
    setnote(json);
    
  };

  const getOneNotes = async (id) => {
    const response = await fetch(`${host}/api/notes/fetchnotes/${id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
    });
    const json = await response.json();
    setnote(json);
    
  };


  //add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);


    // const note = {
    //   _id: "650fb3a8a73b6af8014b4vb1",
    //   user: "65041f775c474780a20e159c",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-09-24T03:57:28.037Z",
    //   __v: 0,
    // };

    // setnote({title, description , tag});
    
    setnote(notes.concat(json));
  };
  //delete a note
  const deleteNote = async(id) => {
    
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
    });
    const json = response.json();
    console.log(json);


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnote(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes,getOneNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
