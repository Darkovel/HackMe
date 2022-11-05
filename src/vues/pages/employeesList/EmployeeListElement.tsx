import { AvatarIcon, TrashIcon } from "@radix-ui/react-icons";
import { Employee } from "../../../models/entities/Employee";
import EditEmployeePopup from "../../components/popups/EmployeePopup.tsx/EditEmployeePopup";
import { useOffice } from '../../providers/OfficeProvider';

type EmployeeProps = {
    employee: Employee
}

function EmployeeListElement({employee}: EmployeeProps) {
    const office=useOffice();

    function handleRemoveEmployee() {
        office.deleteEmployee(employee.id);
    }

    return (
        <div className="flex relative group relative gap-2 content-center m-2">
            <EditEmployeePopup employeeId={employee.id}><AvatarIcon className="w-6 h-6"></AvatarIcon></EditEmployeePopup>
            <p className="my-auto text-sm sm:text-base">{employee.name}</p>
            <p className="hidden">{employee.listDesk.map((deskId) => office.getDesk(deskId).name).join(', ')}</p>
            <div className='hidden sm:group-hover:flex'>
                <TrashIcon className='my-auto cursor-pointer' onClick={() => handleRemoveEmployee()}/>
            </div>
        </div>
    )
}

export default EmployeeListElement;