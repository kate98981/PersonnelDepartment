import React, {useEffect, useState} from 'react';
import Axios from '../../../server/node_modules/axios'
import Visitor from "../Components/Visitor";
import Admin from "../Components/Admin";

export default function Main(){
    const [role, setRole] = useState(""); 

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("/login").then((response) => {
          if (response.data.loggedIn == true) {
            setRole(response.data.user.rows[0].role);
          }
          else window.location.pathname = "/login"
        });
      }, []);
    
return(
    <div>
        {role == "user" && <Visitor />}
      {role == "admin" && <Admin />}
    </div>
)

}