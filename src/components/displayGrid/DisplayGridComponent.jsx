import React from 'react'
import "./displayGridComponent.scss"
const DisplayGridComponent = ({children}) => {
    return (
        <div className="display-grid">
            {children}
        </div>
    )
}

export default DisplayGridComponent
