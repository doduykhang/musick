import React,{useContext} from 'react'
import './popup.scss';
import {PopupContext} from '../../App';
const PopupComponent = () => {
    
    const popupContext = useContext(PopupContext);

    const handleClosePopup = () =>{
        popupContext.setPopup({
            trigger:false,
            children:<></>
        })
    }   
    
    return (popupContext.popup.trigger) ? (
        <div className="popup">
            <div className="content">
                <button className="close-button"
                        onClick={handleClosePopup}>
                    X
                </button>
                {popupContext.popup.children}
            </div>
        </div>
    ):"";
}

export default PopupComponent
