import {useState, useContext, ChangeEvent, FormEvent, ReactElement} from 'react';
import { DesksContent, DesksContext} from '../../../contexts/DesksContext';
import { EmployeesContent, EmployeesContext } from '../../../contexts/EmployeesContext';
import { Desk, DeskData } from '../../../models/Desk';
import { EmployeeData } from '../../../models/Employee';
import DropBoxMultiSelect from '../../dropBox/listMultiSelect/DropBoxMultiSelect';

interface Props {
    children: ReactElement;
}
function AddEmployeePopup({children}: Props) {
    let context = useContext<EmployeesContent>(EmployeesContext);
    const {desks} = useContext(DesksContext);
    const [employee, setEmployee] = useState<EmployeeData>({
        name: "",
        email: "",
        listDesk: [],
        description: '',
    });
    const [states, setStates] = useState<string[]>([]);

    function onChange(name:string, value:string) {
        console.log(name + ' - ' + value);
        setEmployee({...employee, [name]: value});
    }

    function selectDesk(desksId: string[]) {
        const desksSelected: Desk[] = desks.filter((desk) => desksId.some((deskId) => deskId === desk.id));
        setStates(desksId);
        setEmployee({...employee, ['listDesk']: desksSelected});
    }

    function onSubmit(evt:FormEvent) {
        evt.preventDefault();
        if(employee.name === "")
        return;

        context.addEmployee(employee);

        setStates([]);
        setEmployee({name:'', email: '', listDesk:[], description:''});
        handleHide();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        onChange(e.target.name, e.target.value)
    }

    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }

    <div className="border-2 border-red-500 w-full">
      <form >
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" id="name" className="form-control" value={employee.name || ''} onChange={(e) => handleChange(e)}></input>
        </div>
        <div className="form-group">
          
        </div>
        
        <button className="btn btn-primary">Ajouter Employé</button>
      </form>
    </div>

    const popupContainer = showPopup ? (
        <div className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center ">
            <div className="fixed w-auto h-auto bg-gray-400 z-[999] p-5 rounded-lg shadow-md">
                <h3 className='select-none text-center'>Add new Desk</h3>
                <div className='flex h-1 bg-gray-200 w-2/3 rounded-lg m-auto my-2'></div>

                <form className="flex flex-col space-y-2 justify-center" onSubmit={(evt: FormEvent) => onSubmit(evt)}>
                    <label className='select-none' htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={employee.name || ''} onChange={(e) => handleChange(e)}></input>

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="form-control" value={employee.email || ''} onChange={(e) => handleChange(e)}></input>
                    
                    <DropBoxMultiSelect options={desks.map((desk) => {return {id:desk.id, name:desk.name}})} states={states} setStates={(selection) => selectDesk(selection)}></DropBoxMultiSelect>

                    <label className='select-none' htmlFor='description'>Description : </label>
                    <textarea name="description" id="description" className="text-area" value={employee.description || ''} onChange={(e) => handleChange(e)}></textarea>
                    <button className="btn btn-primary my-4" type="submit">Add</button>
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

export default AddEmployeePopup;