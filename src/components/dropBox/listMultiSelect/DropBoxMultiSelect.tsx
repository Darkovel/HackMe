import {ChangeEvent, useState} from 'react';
import DropBoxMultiSelectItem from './DropBoxMultiSelectItem';

interface Props {
    options: {id:string, name:string}[],
    states: string[],
    setStates: (states: string[]) => void;
}

function DropBoxMultiSelect({options, states, setStates}: Props) {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let newState = [];
        if(states.findIndex((state) => state === e.target.value) === -1) {
            newState = [...states, e.target.value]; 
        } else {
            newState = states.filter((state) => state !== e.target.value);
        }
        
        setStates(newState);
      }
        
    return (
        <div>
            <p>{options.filter((option) => states.some((state) => state === option.id)).map((option) => option.name).join(', ')}</p>
            <select onChange={(e) => handleChange(e)}>
                {options.map((option) => (<DropBoxMultiSelectItem key={option.id} value={option.id}>{option.name}</DropBoxMultiSelectItem>))}
            </select>
        </div>
    );
}

export default DropBoxMultiSelect;