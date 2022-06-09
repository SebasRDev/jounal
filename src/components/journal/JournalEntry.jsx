import { format } from 'date-fns'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {
  const dispatch = useDispatch();

  const handleClickEntry = (id)=>{
    dispatch( activeNote(id,{date,title,body,url}) )
  }

  return (
    <div 
      className='journal__entry pointer'
      onClick={() => handleClickEntry(id)}
    >
      { url &&
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`
          }}
          className="journal__entry--pricture"
        ></div>
      }
      <div className='journal__entry--body'>
        <p className='journal__entry--title'>{title}</p>
        <p className='journal__entry--content'>{body}</p>
      </div>
      <div className='journal__entry--date-box'>
        <span>{ format(date,"eeee") }</span>
        <h4>{ format(date,'d') }</h4>
      </div>
    </div>
  )
}
