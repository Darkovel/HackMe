import Desk from './Desk';

interface Employee {
    id: number;
    name: string;
    email: string;
    listDesk?: Desk[];
    description?: string;
}

export default Employee;