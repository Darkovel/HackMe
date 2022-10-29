import { PlusCircledIcon } from "@radix-ui/react-icons";
import {useContext } from "react";
import {EmployeesContext, EmployeesContent} from "../../contexts/EmployeesContext";
import AddEmployeePopup from "../popups/EmployeePopup.tsx/AddEmployeePopup";
import EmployeeListElement from "./EmployeeListElement";

function EmployeesListSide() {
  const context = useContext<EmployeesContent>(EmployeesContext);
  
  
return (
  <div className="bg-blue-200 w-2/5 max-w-sm inset-y-0 z-0 py-12">
    <h3 className="text-center font-bold text-xl sm:text-2xl">Employees</h3>
    <div className="pl-2 sm:pl-5">
      {context?.employees.map(employee => (
        <EmployeeListElement
        key={employee.id}
        employee={employee} />
      ))}
      <AddEmployeePopup>
        <PlusCircledIcon className="w-6 h-6 ml-2"/>
      </AddEmployeePopup>
    </div>
    
    
  </div>);
}

export default EmployeesListSide;