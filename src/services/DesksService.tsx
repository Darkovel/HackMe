import {useEffect, useState} from 'react';
import {DesksContent, DesksContext} from '../contexts/DesksContext';
import {Desk, DeskData} from '../models/Desk';
import {v4 as uuidv4} from 'uuid';

interface Props {
    children: JSX.Element | JSX.Element[]
}

function DesksService({children}: Props) {
    const [desks, setDesks] = useState<Desk[]>([{
        id: "1",
        name: "desk-1",
    },
    {
        id: "2",
        name: "desk-2",
    },
    {
        id: "3",
        name: "desk-3",
    },
]);

const key = "semana-desks";
useEffect(() => {
    const desksRetrievedFromStorage = localStorage.getItem(key);

    if(desksRetrievedFromStorage) {
      setDesks(JSON.parse(desksRetrievedFromStorage));
    }
},[]);

useEffect(() => {
    localStorage.setItem(key, JSON.stringify(desks));
}, [desks]);

    const value: DesksContent = {
        desks,
        getDesk,
        addDesk,
        removeDesk,
        editDesk,
    }

    function getDesk(id:string) {
        let deskData:DeskData = {name:'', description: ''};

        if(desks.some((desk) => desk.id === id)) {
            deskData = desks.find((desk) => desk.id === id);
        }
        
        return deskData;
    }

    function addDesk(newDesk: DeskData) {
        let id:string = uuidv4();
        setDesks([...desks, {id, ...newDesk}]);
    }

    function removeDesk(id: string) {
        setDesks(desks.filter((desk) => desk.id !== id));
    }

    function editDesk(data:Desk) {
        setDesks(desks.map((desk) => desk.id !== data.id ? desk : data));
    }


    return (
        <DesksContext.Provider value={value}>{children}</DesksContext.Provider>
    )
}


export default DesksService;