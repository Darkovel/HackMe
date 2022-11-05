import { OfficeProvider } from "../providers/OfficeProvider";
import DesksAssignedMenu from "./desksAssigned/DesksAssignedMenu";
import EmployeesListSide from "./employeesList/EmployeesListSide";

export function MainMenu() {
    return (
        <div className="w-screen h-screen">
            <OfficeProvider>
            <div className="flex w-full h-full">
                <EmployeesListSide />
                <DesksAssignedMenu />
            </div>
            </OfficeProvider>
        </div>
    );
}
