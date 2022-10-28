import {useState, useContext, ChangeEvent, FormEvent, ReactElement} from 'react';
import { DesksContent, DesksContext} from '../../../contexts/DesksContext';
import { DeskData } from '../../../models/Desk';

interface Props {
    children: ReactElement;
}
function AddDeskPopup({children}: Props) {
    let context = useContext<DesksContent>(DesksContext);
    let [desk, setDesk] = useState<DeskData>({
        name:'',
        description:'',
    }) 
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }

    const popupContainer = showPopup ? (
        <div className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center ">
            <div className="fixed w-auto h-auto bg-gray-400 z-[999] p-5 rounded-lg shadow-md">
                <h3 className='select-none text-center'>Add new Desk</h3>
                <div className='flex h-1 bg-gray-200 w-2/3 rounded-lg m-auto my-2'></div>
                <form className="flex flex-col space-y-2 justify-center" onSubmit={(evt) => handleSubmit(evt)}>
                    <label className='select-none' htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={desk.name} onChange={(evt) => handleChange(evt)}></input>
                    <label className='select-none' htmlFor='description'>Description : </label>
                    <textarea name="description" id="description" className="text-area"></textarea>
                    <button className="btn btn-primary my-4" type="submit">Add</button>
                </form>
            </div>
        </div>
        ) : null;

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        setDesk({name: evt.target.value});
    }

    function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        context.addDesk(desk);
        setDesk({name: '', description:''});
        handleHide();
    }


    return (
        <>
        <button onClick={handleShow}>
            {children}
        </button>

        {popupContainer}
        </>
    )
}

export default AddDeskPopup;