import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Register() {
     const [formData, setformData] = useState({
          username: "",
          password: "",
     });
     async function submitHadler(event) {
          event.preventDefault();
          console.log(formData);
          try {
               const res = await axios.post("http://localhost:4000/register", {
                    formData,
               });
               if (res.status === 200) {
                    alert("register successfully");
               } else {
                    alert("register failed");
               }
          } catch (error) {
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

     return (
          <div className="">
               <Navbar></Navbar>
               <div className="max-w-[1200px] mt-10 px-2 flex justify-center items-center">
                    <form
                         action=""
                         onSubmit={submitHadler}
                         className="w-full mt-10 py-10 shadow-md shadow-blac flex justify-center items-center flex-col  bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700"
                    >
                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Register
                         </h1>
                         <div>
                              <label
                                   htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                   Username
                              </label>
                              <input
                                   required
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   name="username"
                                   onChange={changeHandler}
                                   placeholder="UserName"
                                   type="text"
                                   id="username"
                                   value={formData.username}
                              />
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
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   onChange={changeHandler}
                                   placeholder="Password"
                                   id="password"
                                   value={formData.password}
                              />
                              <div>
                                   <button className="w-full mt-4 text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Register
                                   </button>
                              </div>
                         </div>
                    </form>
               </div>
          </div>
     );
}

export default Register;
