import {ReactElement, useState} from 'react';


interface Props {
    children: ReactElement;
}
function PopupTest({children}: Props) {
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }


    const popupContainer = showPopup ? (
        <div className="flex fixed z-999 bg-gray-200 inset-0 items-center justify-center">
            <div>
              With a portal, we can render content into a different
              part of the DOM, as if it were any other React child.
            </div>
            This is being rendered inside the #modal-container div.
            <button onClick={handleHide}>Hide modal</button>
        </div>
        ) : null;
    return (
    <>
        <button onClick={handleShow}>
            {children}
        </button>
        {popupContainer}
        
    </>
    )
}

export default PopupTest;