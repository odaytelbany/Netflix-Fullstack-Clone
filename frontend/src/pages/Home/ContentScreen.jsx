import React from 'react'
import { useAuthStore } from '../../store/authUser'

const ContentScreen = () => {
  const {logout} = useAuthStore();
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default ContentScreen