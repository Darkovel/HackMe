import DesksAssignedMenu from "../components/desksAssigned/DesksAssignedMenu";
import EmployeesListSide from "../components/employeesList/EmployeesListSide";
import DeskAssignedService from "../services/DeskAssignedService";

function MainMenu() {
    return (
        <div className="w-screen h-screen">
            <div className="flex h-full">
                    <EmployeesListSide />
                <div className="block w-full h-full">
                    <DeskAssignedService>
                        <DesksAssignedMenu />
                    </DeskAssignedService>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;