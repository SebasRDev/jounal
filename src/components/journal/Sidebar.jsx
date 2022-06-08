import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch( startLogout() )
  }

  const handleAddEntry = () => {
    dispatch( startNewNote() )
  }

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar--navbar'>
        <h3>
          <i className="fa-solid fa-user-clock"></i>
          <span className='journal__username'>{name}</span>
        </h3>
        <button 
          onClick={handleLogout}
          className='btn'
        >
          Logout
        </button>
      </div>

      <div
        onClick={handleAddEntry} 
        className='journal__new--entry'
      >
        <i className="fa-solid fa-calendar-plus fa-5x"></i>
        <p className='mt-5'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  )
}
