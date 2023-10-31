import React from "react";
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'



const Noteitem = (props) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note , updateNote } = props;
 
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body my-3">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="bi bi-trash-fill mx-3" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="bi bi-pencil-square" onClick={()=>{updateNote(note)}}></i>
          </div>

          <p className="card-text"><Link to ={`/blogs/:${note._id}`} >{note.description.slice(0,100)} </Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
