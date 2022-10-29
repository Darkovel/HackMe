import {useContext} from 'react'
import { AvatarIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {Employee} from "../../models/Employee";
import EditEmployeePopup from "../popups/EmployeePopup.tsx/EditEmployeePopup";
import { EmployeesContext } from '../../contexts/EmployeesContext';

type EmployeeProps = {
    employee: Employee
}

function EmployeeListElement({employee}: EmployeeProps) {
    const {removeEmployee} = useContext(EmployeesContext);

    function handleRemoveEmployee() {
        removeEmployee(employee.id);
    }

    return (
        <div className="flex relative group relative gap-2 content-center m-2">
            <EditEmployeePopup employeeId={employee.id}><AvatarIcon className="w-6 h-6"></AvatarIcon></EditEmployeePopup>
            <p className="my-auto text-sm sm:text-base">{employee.name}</p>
            <p className="hidden">{employee.listDesk.map((desk) => desk.name).join(', ')}</p>
            <div className='hidden sm:group-hover:flex'>
                <TrashIcon className='my-auto cursor-pointer' onClick={() => handleRemoveEmployee()}/>
            </div>
        </div>
    )
}

export default EmployeeListElement;