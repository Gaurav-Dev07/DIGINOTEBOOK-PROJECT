import React ,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    return (
        <div className = "col-md-3">
            <div className="card my-3">
            <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">{props.note.description}</p>
            <i className="fas fa-trash-alt  " onClick = {() => {deleteNote(note._id)}}></i>
            <i className="fas fa-user-edit mx-3" onClick = {()=>{updateNote(note)}}></i>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
