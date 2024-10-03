import { createContext, useState } from "react";

export const StoreContext =  createContext();

const StoreContextProvider = (props) => {

    const [heroId, setHeroId] = useState("")

    const constextValue = {
        heroId,
        setHeroId
    } 

    return (
        <StoreContext.Provider value={constextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;