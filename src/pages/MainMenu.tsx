import DesksAssignedMenu from "../components/desksAssigned/DesksAssignedMenu";
import DesksListTop from "../components/desksList/DesksListTop";
import EmployeesListSide from "../components/employeesList/EmployeesListSide";
import DesksService from "../services/DesksService";
import EmployeesService from "../services/EmployeesService";

function MainMenu() {
    return (
        <div className="border-2 border-green-500">
            <div className="flex">
                <EmployeesService>
                    <EmployeesListSide />
                </EmployeesService>
                <div className="block w-full h-full">
                    <DesksService>
                        <DesksListTop />
                        <DesksAssignedMenu />
                    </DesksService>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;