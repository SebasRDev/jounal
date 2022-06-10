import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  const dispatch = useDispatch()

  const {active:note} = useSelector(state => state.notes)
  const [values, handleInputChange, reset] = useForm(note)
  const {title, body, id} = values;

  const activeId = useRef( note.id )
  useEffect(() => {
    if(note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id
    }
  }, [note, reset])

  const handleDelete = () =>{
    const noteCard = document.querySelector(`[data-id="${id}"]`);
    console.log(noteCard)
    if(noteCard.classList.contains('animate__backInLeft')){
      noteCard.classList.remove('animate__backInLeft')
      noteCard.classList.add('animate__backOutLeft')
    }else{
      noteCard.classList.add('animate__backOutLeft')
    }
    setTimeout(() => {
      dispatch( startDeleteNote( id ) )
    }, 1000);
  }
  
  useEffect(()=>{
    dispatch( activeNote(values.id, {...values}) );
  }, [values, dispatch])

  return (
    <div className='notes__main--content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input 
          type="text"
          placeholder='New Note'
          autoComplete='off'
          className='notes__title--input'
          name="title"
          onChange={handleInputChange}
          value={title}
        />

        <textarea 
          placeholder='what happened today?'
          className='notes__textarea'
          onChange={handleInputChange}
          name="body"
          value={body}
        ></textarea>
        
        { note.url &&
          <div className='notes__image'>
            <img 
              src={note.url}
              alt="imagen" 
            />
          </div>
        }
      </div>

      <button
        className='btn btn--danger'
        onClick={handleDelete}
      >
        Delete
      </button>

    </div>
  )
}
