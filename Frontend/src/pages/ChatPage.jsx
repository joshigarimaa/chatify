import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
const ChatPage = () => {
  const { authUser, isLoggedIn, login ,logout} = useAuthStore();
  return (
    <div className='z-10'>
      <h1>ChatPage</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage