import React from 'react'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar--navbar'>
        <h3>
          <i className="fa-solid fa-user-clock"></i>
          <span>Sebastian</span>
        </h3>
        <button className='btn'>Logout</button>
      </div>

      <div className='journal__new--entry'>
      <i className="fa-solid fa-calendar-plus fa-5x"></i>
      <p className='mt-5'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  )
}
