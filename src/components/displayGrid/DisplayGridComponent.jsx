import React, { useRef } from 'react'
import "./displayGridComponent.scss"
const DisplayGridComponent = ({children,onScrollToBottom}) => {
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
        <div className="display-grid" onScroll={() => onScroll()} ref={listInnerRef}>
            {children}
        </div>
    )
}

export default DisplayGridComponent
