import {FormEvent, ReactElement, useContext, useState} from 'react'
import { Desk } from '../../../../models/entities/Desk';
import { EmployeeData } from '../../../../models/entities/Employee';
import { useOffice } from '../../../providers/OfficeProvider';
import DropBoxMultiSelect from '../../dropBox/listMultiSelect/DropBoxMultiSelect';

interface Props {
    children: ReactElement;
    employeeId: string;
}

function EditEmployeePopup({children, employeeId}:Props) {
    const office = useOffice();
    const desks = office.desks;
    const [employee, setEmployee] = useState<EmployeeData>({
        name: office.getEmployee(employeeId).name,
        email: office.getEmployee(employeeId).email,
        listDesk: office.getEmployee(employeeId).listDesk,
        description: office.getEmployee(employeeId).description,
    });
    const [states, setStates] = useState<string[]>(employee.listDesk);
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }

    function onChange(name:string, value:string) {
        setEmployee({...employee, [name]: value});
    }

    function selectDesk(desksId: string[]) {
        const desksSelected: Desk[] = desks.filter((desk) => desksId.some((deskId) => deskId === desk.id));
        setStates(desksId);
        setEmployee({...employee, ['listDesk']: desksSelected.map((desk) => desk.id)});
    }

    function onSubmit(evt:FormEvent) {
        evt.preventDefault();
        if(employee.name === "")
            return;

        office.editEmployee(employeeId, employee);
        handleHide();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        onChange(e.target.name, e.target.value)
    }

    function handleRemoveEmployee() {
        office.deleteEmployee(employeeId);
        handleHide();
    }
    
    const popupContainer = showPopup ? (
        <div className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center ">
            <div className="fixed w-auto h-auto bg-gray-400 z-[999] p-5 rounded-lg shadow-md">
                <h3 className='select-none text-center'>{employee.name}</h3>
                <div className='flex h-1 bg-gray-200 w-2/3 rounded-lg m-auto my-2'></div>

                <form className="flex flex-col space-y-2 justify-center" onSubmit={(evt: FormEvent) => onSubmit(evt)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="form-control" value={employee.email || ''} onChange={(e) => handleChange(e)}></input>
                    
                    <DropBoxMultiSelect options={desks.map((desk) => {return {id:desk.id, name:desk.name}})} states={states} setStates={(selection) => selectDesk(selection)}></DropBoxMultiSelect>

                    <label className='select-none' htmlFor='description'>Description : </label>
                    <textarea name="description" id="description" className="text-area" value={employee.description || ''} onChange={(e) => handleChange(e)}></textarea>
                    <button className="btn btn-primary my-4" type="submit">Edit</button>
                    <button className="btn btn-danger my-4" onClick={() => handleRemoveEmployee()}>Remove</button>
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
    </>);
}


export default EditEmployeePopup;