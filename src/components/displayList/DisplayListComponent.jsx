import React, { useRef } from 'react'
import "./displayListComponent.scss"


const DisplayListComponent = ({header,children,onScrollToBottom}) => {
    const listInnerRef = useRef();

    const onScroll = () => {
        if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                onScrollToBottom();
            }
        }
    };

    return (
        <div className="display-list" onScroll={() => onScroll()} ref={listInnerRef}>
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
