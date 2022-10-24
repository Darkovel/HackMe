import DesksAssignedMenu from "../components/desksAssigned/DesksAssignedMenu";
import DesksListTop from "../components/desksList/DesksListTop";
import EmployeesListSide from "../components/employeesList/EmployeesListSide";

function MainMenu() {
    return (
        <div>
            <h1>Main Menu</h1>
            <EmployeesListSide />
            <DesksListTop />
            <DesksAssignedMenu />
        </div>
    )
}

export default MainMenu;