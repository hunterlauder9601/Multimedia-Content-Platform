import React from 'react'
import { NavBar } from './NavBar'

export const Contact = () => {
  return (
    <div>
      <NavBar/>
      <div className='w-full min-h-[calc(100vh-108px)] max-h-fit bg-zinc-900 text-white flex items-center justify-center'>
        <form action="https://getform.io/f/3f48fa22-9b59-4865-9fe1-a79f8132b89d"
        method='POST' className='flex flex-col w-full max-w-3xl py-8 px-4'>
          <div>
            <h1 className='text-4xl font-bold border-b-4 border-red-500 tracking-wider inline'>Contact Me</h1>
            <p className='text-md pt-4 pb-8'>Submit this form if you have any business inquiries:</p>
          </div>
          <input className='py-2 px-2 bg-zinc-800' name='name' type="text" placeholder='Name'/>
          <input className='my-4 py-2 px-2 bg-zinc-800' name='email' type="text" placeholder='Email'/>
          <textarea className='px-2 bg-zinc-800' name="content" cols="30" rows="10" placeholder='Message'></textarea>
          <button className='border-2 border-zinc-200 bg-zinc-800 text-md font-bold 
          hover:bg-red-500 hover:border-red-500 hover:text-zinc-800 py-2 px-3 my-6 mx-auto transition-all duration-200'>
            Let's Collaborate</button>
        </form>
      </div>
    </div>
  )
}
