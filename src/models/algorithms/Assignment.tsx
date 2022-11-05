import { Desk, DeskId } from "../entities/Desk";
import { DeskAssigned } from "../entities/DeskAssigned";
import { Employee, EmployeeId } from "../entities/Employee";

type DesksPref = {
    deskId: DeskId,
    employeesPref: EmployeeId[],
}

export class Assignment {
    public static assignByPref(desks: Desk[], employees: Employee[]): DeskAssigned[] {
        let desksAssigned:DeskAssigned[] = [];
        //On filter les employés avec et sans préférence
        let employeesWithoutPref = employees.filter((employee) => employee.listDesk.length === 0);
        const employeesPref = employees.filter((employee) => employee.listDesk.length > 0)
            .sort((a, b) => a.listDesk.length - b.listDesk.length); //On trie les employés selon leur nombre de pref (croissant)
        
        //On construit la liste des desks, chaque desk possède désormais la liste des employés l'ayant dans leur préférences
        let desksPref: DesksPref[] = this.buildDesksPref(desks, employees)
            .sort((a,b) => a.employeesPref.length - b.employeesPref.length); // On trie les desksPref selon la quantité d'employés les ayant dans leur liste de préf (croissant)
        
    
        let currentIndex = 0;
        let deskIndex = -1;
        //En commençant par l'employé ayant le moins de pref, on lui attribut le bureau le moins désiré dans sa liste de pref.
        while(desksPref.length > 0 && currentIndex < employeesPref.length) {
            deskIndex = desksPref.findIndex((desk)=> employeesPref[currentIndex].listDesk.some((deskPrefId) => deskPrefId === desk.deskId));
        
            if(deskIndex !== -1) {
                //Si on trouve un bureau parmis ses préférence
                //On assign le bureau à l'employé et on supprime le bureau de la liste des bureau disponible
                desksAssigned.push(new DeskAssigned(desks[deskIndex].id, employees[deskIndex].id));
                desks.splice(deskIndex,1);
            } else {
                //Si on ne trouve pas de bureau disponible parmis les préférences de l'employer
                //On ajoute l'employé dans la liste des employés sans préférence
                employeesWithoutPref.push(employeesPref[currentIndex]);
            }
                    
            currentIndex++;
        }
        
        //On essaye d'attribuer un bureau de manière aléatoire pour les employés n'ayant plus de bureau disponible parmis leur préférés
        desksAssigned = [...desksAssigned, ...this.assignRandomly(desks.map((desk) => desk.id), employeesWithoutPref.map((employee) => employee.id))]
        return desksAssigned;
    };
    
    public static assignRandomly(desks: DeskId[], employees: EmployeeId[]): DeskAssigned[] {
        let desksAssigned:DeskAssigned[] = [];
        while(desks.length > 0 && employees.length > 0) {
            let deskIndex = Math.floor(Math.random() * (desks.length-1));
            let employeeIndex = Math.floor(Math.random() * (employees.length-1));
    
            desksAssigned.push(new DeskAssigned(desks[deskIndex], employees[employeeIndex]));
            desks.splice(deskIndex,1);
            employees.splice(employeeIndex,1);
        }
    
        return desksAssigned;
    }

    private static buildDesksPref(desks: Desk[], employees: Employee[]): DesksPref[] {
        let desksPref: DesksPref[] = desks.map((desk) => {
            return {deskId:desk.id, employeesPref:[]};
        });
        employees.forEach((employee) => {
            employee.listDesk.forEach((deskId) => {
                desksPref.find((deskPref) => deskPref.deskId === deskId)?.employeesPref.push(employee.id);
            });
        })
        return desksPref;
    }
}
