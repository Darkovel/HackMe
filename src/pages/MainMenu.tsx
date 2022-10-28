import DesksAssignedMenu from "../components/desksAssigned/DesksAssignedMenu";
import DesksListTop from "../components/desksList/DesksListTop";
import EmployeesListSide from "../components/employeesList/EmployeesListSide";
import DeskAssignedService from "../services/DeskAssignedService";

function MainMenu() {
    return (
        <div className="border-2 border-green-500">
            <div className="flex">
                    <EmployeesListSide />
                <div className="block w-full h-full">
                    <div className="hidden sm:block">
                        <DesksListTop />
                    </div>
                    
                    <DeskAssignedService>
                        <DesksAssignedMenu />
                    </DeskAssignedService>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;