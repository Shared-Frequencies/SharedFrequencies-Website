import {createContext, useState} from "react";


const HeightContext = createContext();
export default HeightContext


export function HeightProvider({children}) {
    const [height, setHeight] = useState(null)

    return(
        <HeightContext.Provider value={{height, setHeight}}>
            {children}
        </HeightContext.Provider>
    );
}