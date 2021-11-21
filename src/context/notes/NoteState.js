import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000/"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    const getNote = async () => {
        // API CALL
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ1OGU4ZGYxYmE1Yjc4NTJlMzgxN2IiLCJpYXQiOjE2MzIwNzMyMjN9.odgS696bkeDOAKcxq5yMgLHdSrSUB1FGfzelphIIrXc'
            } // body data type must match "Content-Type" header
        });
        const json =  await response.json();
        // console.log(json)
        setNotes(json)
    }
    //1 Adding a note
    const addNote = async (title,description,tag) => {
        // API CALL
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ1OGU4ZGYxYmE1Yjc4NTJlMzgxN2IiLCJpYXQiOjE2MzIwNzMyMjN9.odgS696bkeDOAKcxq5yMgLHdSrSUB1FGfzelphIIrXc'
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        // console.log(note)
        setNotes(notes.concat(note))

        // logic for adding a note
        //console.log("adding a new note")
    
        // const note = {
        //     "_id": "61458e8df1ba5b7852e3817b",
        //     "user": "61458e8df1ba5b7852e3817b",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2021-09-21T17:21:59.655Z",
        //     "__v": 0
        // }
        setNotes(notes.concat(note));
    }

    //2 Deleting a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ1OGU4ZGYxYmE1Yjc4NTJlMzgxN2IiLCJpYXQiOjE2MzIwNzMyMjN9.odgS696bkeDOAKcxq5yMgLHdSrSUB1FGfzelphIIrXc'
            }
        });
        const json = await(response.json)
        console.log(json)

        console.log("deleting the note with id" + id);
        //this method will return array elements in a new arr as new Notes 
        const newNotes = notes.filter((note) => { return note._id !== id})
        setNotes(newNotes)
    }

    //3 Editing a note
    const editNote = async (id,title,description,tag) => {
        // API CALL
           const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ1OGU4ZGYxYmE1Yjc4NTJlMzgxN2IiLCJpYXQiOjE2MzIwNzMyMjN9.odgS696bkeDOAKcxq5yMgLHdSrSUB1FGfzelphIIrXc'
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
            }
        }  
        setNotes(newNotes);
    }

    
    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
