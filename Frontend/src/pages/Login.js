import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/context";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
function Login() {
     const [redirect, setredirect] = useState(false);
     const { setUsername, setuserInfo, setlogins } = useContext(Appcontext);
     const Navigate = useNavigate();
     const [formData, setformData] = useState({
          username: "",
          password: "",
     });
     async function submitHadler(event) {
          event.preventDefault();
          console.log(formData);
          try {
               let res = await axios.post(
                    "http://localhost:4000/login/",
                    {
                         formData,
                    },
                    { withCredentials: true }
               );
               if (res.status === 200) {
                    console.log(res);
                    setredirect(!redirect);
                    setUsername(res.data.username);
                    setuserInfo(res.data);
                    setlogins(true);
               } else {
                    alert("login failed");
                    setlogins(false);
               }
          } catch (error) {
               setlogins(false);
               alert("login failed");
               console.log(error);
          }
     }
     function changeHandler(event) {
          const { name, value } = event.target;

          setformData((prev) => {
               return {
                    ...prev,
                    [name]: value,
               };
          });
     }

     if (redirect) {
          return Navigate("/");
     }

     return (
          <div className="">
               <Navbar></Navbar>
               <div className="max-w-[1200px] py-4 px-2 mt-10 flex justify-center items-center">
                    <form
                         className="w-full mt-10 py-10  flex justify-center items-center flex-col  bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700"
                         action=""
                         onSubmit={submitHadler}
                    >
                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Login
                         </h1>
                         <div>
                              <label
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                   htmlFor="username"
                              >
                                   Username
                              </label>
                              <input
                                   required
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   onChange={changeHandler}
                                   name="username"
                                   placeholder="UserName"
                                   type="text"
                                   id="username"
                                   value={formData.username}
                              />
                         </div>
                         <div>
                              <label
                                   htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                   Password
                              </label>
                              <input
                                   required
                                   type="password"
                                   name="password"
                                   onChange={changeHandler}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Password"
                                   id="password"
                                   value={formData.password}
                              />
                         </div>
                         <div>
                              <button className=" w-full mt-4 text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">
                                   Login
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
}

export default Login;
