import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Appcontext } from "../context/context";
import React, { useContext } from "react";

import axios from "axios";
function Navbar() {
     const Navigate = useNavigate();
     const {
          userName,
          setUsername,
          setuserInfo,
          cookie,
          setcookie,
          setlogins,
     } = useContext(Appcontext);

     
     async function cheackprofile() {
          try {
               let output = await axios.get("http://localhost:4000/profile/", {
                    withCredentials: true,
               });

               setuserInfo(output.data);
               setUsername(output.data.username);
               setlogins(true);
          } catch (error) {
               setlogins(false);
               console.log(error);
          }
     }

     useEffect(() => {
      setcookie(document.cookie);
      console.log(document.cookie)
          if (cookie) {
               cheackprofile();
          }
     }, [cookie]);

     async function Logout() {
          console.log("bhai");
          await axios.get("http://localhost:4000/logout", {
               withCredentials: true,
          });
          setUsername("");
          setuserInfo("");
          setlogins(false);
     }

     return (
          <div className="md:px-10 px-5 py-4 w-full flex justify-between bg-slate-400 items-center">
               <div
                    className="font-semibold cursor-pointer md:text-2xl text-[0.8rem]"
                    onClick={() => {
                         Navigate("/");
                    }}
               >
                    Blog-web
               </div>
               <div className="flex items-center justify-center gap-3 ">
                    {userName && (
                         <>
                              <Link
                                   className="md:text-xl text-[0.7rem]"
                                   to="/create"
                              >
                                   Create new Post
                              </Link>
                              <button
                                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
               md:text-xl text-[0.8rem] py-1 px-4 rounded"
                                   onClick={Logout}
                              >
                                   Logout
                              </button>
                         </>
                    )}

                    {!userName && (
                         <>
                              <Link className="py-1 px-3 border-[1px] border-slate-700 rounded-md hover:bg-slate-800 hover:text-white" to="/login">Login</Link>
                              <Link className="py-1 px-3 border-[1px] border-slate-700 rounded-md hover:bg-slate-800 hover:text-white" to="/register">Register</Link>
                         </>
                    )}
               </div>
          </div>
     );
}

export default Navbar;
