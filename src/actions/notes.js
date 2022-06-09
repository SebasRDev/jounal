import Swal from 'sweetalert2'
import { 
  addDoc, 
  collection, 
  doc, 
  updateDoc 
} from "firebase/firestore";

import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';

export const startNewNote = ()=>{
  return async (dispatch, getState) => {
    
    const {uid} = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    try {
      const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
      dispatch( activeNote(docRef.id, newNote) )
    } catch (error) {
      console.error("Error adding document: ", error);
    }

  }
}

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload:{
      id,
      ...note
    }
  }
}

export const startLoadingNotes = (uid) => {
  return async(dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes)=>{
  return{
    type: types.notesLoad,
    payload: notes
  }
}

export const startSaveNote = (note)=>{
  return async(dispatch,getState)=>{
    const {uid} = getState().auth
    
    if(!note.url) delete note.url

    const noteToSave = {...note}
    delete noteToSave.id

    try {
      const noteRef = doc(db,`${uid}/journal/notes/${note.id}`)
      await updateDoc(noteRef, noteToSave)
      dispatch( activeNote(note.id, note) )
      Swal.fire({
        icon: 'success',
        title: 'Note saved succesfull',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch( refreshNote(note.id, note) )
    }catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...Error',
          text: error.message
        })
    }



  }
}

export const refreshNote = (id, note) => {
  return{
    type: types.notesUpdated,
    payload:{
      id,
      note
    }
  }
}