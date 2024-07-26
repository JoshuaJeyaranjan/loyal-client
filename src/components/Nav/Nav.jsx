import React from 'react'
import './Nav.scss'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink>  </li>
                <li><NavLink to='/cart'>Cart</NavLink> </li>
                <li><NavLink to='/login'>Login</NavLink>  </li>
                <li><NavLink to='/signup'>Signup</NavLink>  </li>
                <li><NavLink to='/admin'>Admin</NavLink>  </li>
            </ul>
        </nav>
    </header>
  )
}
