import {ReactElement, useState} from 'react';


interface Props {
    children: ReactElement;
    popup: ReactElement;
}
function Popup({children, popup}: Props) {
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }


    const popupContainer = showPopup ? (
        <div onClick={handleHide} className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center ">
            <div className="fixed w-auto h-auto bg-gray-200 z-[999]">
                {popup.props={handleHide}}
            </div>
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

export default Popup;