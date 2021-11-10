import React from 'react'
import "./displayListComponent.scss"


const DisplayListComponent = ({header,children}) => {
    return (
        <div className="display-list">
            <div className="header">
                {header.map(column =>{
                    return(
                        <div style={{flex:column.flex}}>{column.title}</div>
                    )
                })}
            </div>
            {children}
        </div>
    )
}

export default DisplayListComponent
