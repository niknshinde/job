import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';

const NoteDetail = () => {
  const { id } = useParams();
  const host = 'http://localhost:5000';


  const [note, setNote] = useState(null);

  useEffect(() => {
    const getOneNotes = async (id) => {
      try {

        const response = await fetch(`${host}/api/notes/fetchnotes/${id}`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
    
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')},
        });
        const json = await response.json();
        console.log(localStorage.getItem('token'));
        setNote(json);
        
      } catch (error) {
        console.log("error" , error);
      }
       
        
      };
    
      getOneNotes(id);
  }, []);


  return (
    <div className="note-details">
    {note ? (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <strong>tag : {note.tag}</strong>
        </>
      ) : (
        <p>loading data....</p>
      )}

    </div>
  );
};

export default NoteDetail;
