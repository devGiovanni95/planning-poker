import { ReactNode, createContext, useContext, useState } from "react";
import React from 'react';
import { IUserContextType } from "../interface";


const initialUserContext: IUserContextType = {
  userName: "",
  setUserName: () => {},
  taskName: "",
  setTaskName: () => {},
};

export const UserContext = createContext<IUserContextType>(initialUserContext);

export const UserProvider = ({ children }: { children: ReactNode })=> {
    const [userName, setUserName] = useState("")
    const [taskName, setTaskName] = useState("")
  
    return (
      <UserContext.Provider value={{ userName, setUserName, taskName, setTaskName }}>
        {children}
      </UserContext.Provider>
    );
  };
