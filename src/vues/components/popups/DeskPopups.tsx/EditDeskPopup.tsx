import React, {useState, useContext, ChangeEvent, FormEvent, ReactElement} from 'react';
import { Desk, DeskData } from '../../../../models/entities/Desk';
import { Employee } from '../../../../models/entities/Employee';
import { useOffice } from '../../../providers/OfficeProvider';

interface Props {
    children: ReactElement;
    deskId: string;
}
// class EditDeskPopup extends React.Component {
//     office = useOffice();

//     constructor(props:Props) {
//         super(props);

//         this.state = this.office.getDesk(props.deskId);
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleInputChange() {

//     }

//     handleSubmit() {

//     }

//     render() {
//         return ()
//     }
// }

function EditDeskPopup({children, deskId}: Props) {
    const office = useOffice();
    const [desk, setDesk] = useState<DeskData>({
        name: office.getDesk(deskId).name,
        description: office.getDesk(deskId).description,
    });
    const [employeeAssigned, setEmployeeAssigned] = useState<Employee>(office.getEmployeeAssigned(deskId));
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
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
        if(e.target.value === 'none') {
            console.log(deskId);
            office.unassignADesk(deskId);
            setEmployeeAssigned(undefined);
        } else {
            office.assignDesk(deskId, e.target.value);
            setEmployeeAssigned(office.getEmployee(e.target.value));
        }
    }

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