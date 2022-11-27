import {createContext, useState} from "react";

const ToggleContext = createContext();
export default ToggleContext

export function ToggleProvider ({children}) {
    const [playing, setPlaying] = useState(false)

    return (
        <ToggleContext.Provider value={{playing, setPlaying}}>
            {children}
        </ToggleContext.Provider>
    )
}
