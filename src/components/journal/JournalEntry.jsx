import React from 'react'

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
      <div
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltbd56386178af29d9/6286e274af7b396927edcd5a/Fade_Omen_1920x1080.jpg?auto=webp&disable=upscale&height=1055)'
        }}
        className="journal__entry--pricture"
      >

      </div>
      <div className='journal__entry--body'>
        <p className='journal__entry--title'>Un nuevo titulo</p>
        <p className='journal__entry--content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, nobis! Quisquam corporis magni ex necessitatibus obcaecati quidem voluptatum rem fugit. Recusandae eligendi, animi asperiores voluptatibus numquam voluptas fugiat mollitia eos.</p>
      </div>
      <div className='journal__entry--date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
