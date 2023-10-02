import logo from "./logo.svg";
import "./App.css";
import Privateroute2 from "./pages/Privateroute2";
import Blogs from "./components/Blogs";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./components/CreatePost";
import FullPost from "./components/FullPage";
import EditPost from "./components/EditPost";
import Privateroute from "./pages/PrivateRoute";
import { Appcontext } from "./context/context";
import React, { useContext } from "react";

function App() {
     const { logins } = useContext(Appcontext);
     console.log(logins);
     return (
          <div className="w-full max-w-[1340px] mx-auto">
               <Routes>
                    <Route path="/" element={<Blogs />}></Route>
                    <Route
                         path="/login"
                         element={
                              <Privateroute2 logins={logins}>
                                   <Login />
                              </Privateroute2>
                         }
                    />
                    <Route
                         path="/register"
                         element={
                              <Privateroute2 logins={logins}>
                                   <Register />
                              </Privateroute2>
                         }
                    />
                    <Route path="*" element={<div>No data 440</div>}></Route>
                    <Route path="/post/:id" element={<FullPost />}></Route>
                    <Route
                         path="/create"
                         element={
                              <Privateroute logins={logins}>
                                   <CreatePost />
                              </Privateroute>
                         }
                    />

                    <Route
                         path="/edit/:id"
                         element={
                              <Privateroute logins={logins}>
                                   <EditPost />
                              </Privateroute>
                         }
                    ></Route>
               </Routes>
          </div>
     );
}

export default App;
