import {useState, useContext, ChangeEvent, FormEvent, ReactElement} from 'react';
import { Desk, DeskData } from '../../../../models/entities/Desk';
import { useOffice } from '../../../providers/OfficeProvider';

interface Props {
    children: ReactElement;
    deskId: string;
}
function EditDeskPopup({children, deskId}: Props) {
    const office = useOffice();
    const [desk, setDesk] = useState<DeskData>({
        name:'',
        description:'',
    }) 
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setDesk(office.getDesk(deskId));
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        onChange(e.target.name, e.target.value)
    }

    function onChange(name:string, value:string) {
        setDesk({...desk, [name]: value});
    }

    function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        
        office.editDesk(deskId, desk);
        handleHide();
    }

    function handleRemoveDesk() {
        office.deleteDesk(deskId);
        handleHide();
    }

    function handleAssign(e:ChangeEvent<HTMLSelectElement>) {
        if(e.target.value === 'none')
            office.unassignADesk(deskId);
        else
            office.assignDesk(deskId, e.target.value);
    }


    const employeeAssigned = office.getEmployeeAssigned(deskId);
    const employeesUnassigned = office.getEmployeesUnassigned();
    const popupContainer = showPopup ? (
        <div className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center ">
            <div className="fixed w-auto h-auto bg-gray-400 z-[999] p-5 rounded-lg shadow-md">
                <h3 className='select-none text-center'>Edit Desk</h3>
                <div className='flex h-1 bg-gray-200 w-2/3 rounded-lg m-auto my-2'></div>
                <form className="flex flex-col space-y-2 justify-center" onSubmit={(evt) => handleSubmit(evt)}>
                    <label className='select-none' htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={desk.name} onChange={(evt) => handleChange(evt)}></input>
                    
                    <p>{employeeAssigned === undefined ? 'Unassigned': 'Assigned to : ' + employeeAssigned.name}</p>
                    <select name='' id='' onChange={(e) => handleAssign(e)}>
                        <option key='default' value='none'>assign to...</option>
                        <option key='none' value='none'> </option>
                        {employeesUnassigned.map((employee) => (<option key={employee.id} value={employee.id}>{employee.name}</option>))}
                    </select>
                    <label className='select-none' htmlFor='description'>Description : </label>
                    <textarea name="description" id="description" className="text-area" value={desk.description} onChange={(evt) => handleChange(evt)}></textarea>
                    <button className="btn btn-primary my-4" type="submit">Edit</button>
                    <button className="btn btn-danger my-4" onClick={() => handleRemoveDesk()}>Remove</button>
                </form>
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

export default EditDeskPopup;