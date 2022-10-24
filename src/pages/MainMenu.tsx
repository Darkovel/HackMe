import DesksAssignedMenu from "../components/desksAssigned/DesksAssignedMenu";
import DesksListTop from "../components/desksList/DesksListTop";
import EmployeesListSide from "../components/employeesList/EmployeesListSide";

function MainMenu() {
    return (
        <div className="border-2 border-green-500">
            <h1 className="text-center font-bold">Main Menu</h1>
            <div className="flex">
                <EmployeesListSide />
                <div className="block w-full">
                    <DesksListTop />
                    <DesksAssignedMenu />
                </div>
            </div>
        </div>
    )
}

export default MainMenu;