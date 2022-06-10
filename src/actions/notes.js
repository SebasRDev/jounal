import Swal from 'sweetalert2'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
import { type } from '@testing-library/user-event/dist/type';

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
      dispatch( addNewNote(docRef.id, newNote) )
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

export const addNewNote = (id, note) =>{
  return{
    type: types.notesAddNew,
    payload: {
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

    console.log('[startSaveNote]',note)
    
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

export const startUploadFile = (file) =>{
  return async( dispatch, getState )=>{
    const {active:thisNote} = getState().notes

    Swal.fire({
      title: 'Uploading',
      text: 'PLease wait',
      allowOutsideClick: false,
      didOpen: ()=>{
        Swal.showLoading();
      }
    })
    
    const fileUrl = await fileUpload(file);

    dispatch( activeNote(thisNote.id, thisNote) )

    dispatch( startSaveNote({...thisNote, url: fileUrl}) )

    // dispatch( refreshNote(thisNote.id, activeNote) )
  }
}

export const startDeleteNote = (id) =>{
  return async(dispatch, getState) =>{
    const {uid} = getState().auth

    try {
      await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))

      dispatch( deleteNote( id ) )

      Swal.fire({
        icon: 'success',
        title: 'Note deleted succesfull',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...Error',
        text: error.message
      })
    }
  }
}

export const deleteNote = (id) =>{
  return{
    type: types.notesDelete,
    payload: id
  }
}

export const notesLogOut = () => {
  return{
    type: types.notesLogoutCleaning
  }
}