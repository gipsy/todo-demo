import React from 'react'
// import Profile from '@components/profile'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <h1>Homepage</h1>
    <Link to="/tasks">
      <button>A tasks page</button>
    </Link>
  </div>
)
