import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { compareAsc, format } from "date-fns";
import axios from "axios";
import { Appcontext } from "../context/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function FullPage() {
     const { userInfo } = useContext(Appcontext);
     const Navigate = useNavigate();
     console.log(userInfo);
     const [postinfo, setpostinfo] = useState("");
     const [redirect, setdirect] = useState(false);

     const { id } = useParams();

     async function fatchdata() {
          const res = await axios.get(`http://localhost:4000/post/${id}`);
          setpostinfo(res.data);
     }
     
     useEffect(() => {
          fatchdata();
     }, []);

     async function deletePost() {
          try {
               const res = await axios.delete(
                    `http://localhost:4000/delete/${id}`
               );

               if (res.status === 200) {
                    setdirect(true);
                    console.log(redirect);
               }
          } catch (error) {
               console.log(error);
          }
     }

     if (!postinfo) {
          return "";
     }

     if (redirect) {
          Navigate("/");
     }
     console.log(userInfo.id);
     console.log(postinfo.author._id);

     return (
          <div>
               <Navbar></Navbar>
               <div className="mt-5">
                    <div className="flex flex-col justify-center items-center">
                         <h1 className="sm:text-[2rem] text-[1rem] font-bold text-center">
                              {postinfo.title}
                         </h1>
                         <time className="font-semibold md:text-xl text-[0.9rem]">
                              {format(
                                   new Date(postinfo.date),
                                   "MMM d, yyyy HH:mm"
                              )}{" "}
                         </time>
                         <p>by @ {postinfo.author.username}</p>
                         {userInfo.id === postinfo.author._id && (
                              <div className="flex gap-2 mt-5 mb-5">
                                   <button>
                                        {" "}
                                        <Link
                                             to={`/edit/${postinfo._id}`}
                                             className="bg-blue-700 rounded-md text-white font-semibold py-2 px-3"
                                        >
                                             Edit this Post
                                        </Link>
                                   </button>
                                   <div
                                        className="bg-red-700 rounded-md cursor-pointer text-white font-semibold py-2 px-3"
                                        onClick={deletePost}
                                   >
                                        {" "}
                                        Delete Post
                                   </div>
                              </div>
                         )}

                         <img
                              src={"http://localhost:4000/" + postinfo.file}
                              className="object-cover min-w-[290px] overflow-x-hidden px-24"
                              alt={postinfo.file}
                         />
                         <div
                              dangerouslySetInnerHTML={{
                                   __html: postinfo.content,
                              }}
                              className="px-8 pb-4 mt-5"
                         />
                    </div>
               </div>
          </div>
     );
}

export default FullPage;
