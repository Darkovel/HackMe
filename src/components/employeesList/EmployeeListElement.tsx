import { AvatarIcon } from "@radix-ui/react-icons";
import {Employee} from "../../models/Employee";

type EmployeeProps = {
    employee: Employee
}

function EmployeeListElement({employee}: EmployeeProps) {
    return (
        <div className="flex gap-2">
            <AvatarIcon className="w-6 h-6"></AvatarIcon>
            <p className="text-sm sm:text-base">{employee.name}</p>
            <p className="hidden sm:block">{employee.listDesk.map((desk) => desk.name).join(', ')}</p>
        </div>
    )
}

export default EmployeeListElement;