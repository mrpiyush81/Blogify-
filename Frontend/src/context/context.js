import { createContext } from "react";
import { useState } from "react";

export const Appcontext = createContext();

export default function AppContextProvider({ children }) {
     const [userName, setUsername] = useState("");
     const [userInfo, setuserInfo] = useState("");
     const [cookie, setcookie] = useState("");
     const [logins, setlogins] = useState(false);
     console.log(userInfo);
     const value = {
          userName,
          setUsername,
          cookie,
          setcookie,
          userInfo,
          setuserInfo,
          logins,
          setlogins,
     };

     return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
}
