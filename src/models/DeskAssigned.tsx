export type DeskAssigned = {
    deskId: string,
    employeeId: string,
}

export type EmployeesPref = {
    employeeId: string,
    deskPref: string[],
}