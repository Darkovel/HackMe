import {createContext, useEffect, useState, ReactNode, useContext} from "react"
import { Observable } from "rxjs";
import { Office } from "../../models/aggregats/Office"

const office = new Office([], [], []);
const OfficeContext = createContext(office);

interface Props {
    children: ReactNode,
}
export const OfficeProvider = ({ children }: Props) => {
    return <OfficeContext.Provider value={office}>{children}</OfficeContext.Provider>
}

export const useOffice = () => useContext(OfficeContext);

export function useObservable<T>(obs: Observable<T>, defaultValue?:T) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        console.log("useEffect Observable");
        const sub = obs.subscribe((v) => {
            setValue(v);
        });
        return () => sub.unsubscribe();
    }, [obs])

    return value;
}