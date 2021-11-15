import React from 'react'
import { Navigate } from 'react-router'
import './library.scss'

const Library = ({user}) => {
    if(!user)
        return <Navigate to='/login'/>
    return (
        <div className='library'>
            library
        </div>
    )
}

export default Library
