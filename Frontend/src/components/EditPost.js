import React, { useEffect, useState } from "react";
import RillQ from "./RillQ";
import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
     const { id } = useParams();
     const [title, settitle] = useState("");
     const [summary, setsummary] = useState("");
     const [files, setfiles] = useState("");
     const [content, setcontent] = useState("");
     const [redirect, setdirect] = useState(false);

     const Navigate = useNavigate();
     async function fetchdata() {
          const { data } = await axios.get("http://localhost:4000/post/" + id);
          settitle(data.title);
          setsummary(data.summary);
          setcontent(data.content);
     }

     useEffect(() => {
          fetchdata();
     }, []);

     async function Updatehandler(event) {
          event.preventDefault();
          const formData = new FormData();
          if (files?.[0]) {
               formData.append("file", files?.[0]);
          }
          formData.append("title", title);
          formData.append("summary", summary);
          formData.append("content", content);
          formData.append("id", id);

          const res = await axios.put(
               "http://localhost:4000/post/",
               formData,
               { withCredentials: true },
               {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
               }
          );
          if (res.status === 200) {
               setdirect(true);
          }
     }

     if (redirect) {
          Navigate(`/post/${id}`);
     }
     return (
          <div>
               <div className="min-w-[260px] px-3 m-auto flex justify-center items-center flex-col mt-10">
                    <h1 className="text-2xl font-bold">Edit Post</h1>

                    <form
                         action=""
                         className="flex flex-col  mt-5 gap-y-4"
                         onSubmit={Updatehandler}
                    >
                         <input
                              required
                              type="title"
                              value={title}
                              className="border-2 rounded-md h-8 pl-1 border-black"
                              onChange={(ev) => {
                                   settitle(ev.target.value);
                              }}
                              placeholder="Title"
                         />
                         <input
                              required
                              type="summary"
                              value={summary}
                              onChange={(ev) => {
                                   setsummary(ev.target.value);
                              }}
                              className="border-2 border-black rounded-md h-8 pl-1"
                              placeholder="Summery"
                         />
                         <input
                              type="file"
                              onChange={(ev) => {
                                   setfiles(ev.target.files);
                              }}
                              className="border-2 border-black rounded-md h-8 "
                         />
                         <RillQ
                              required
                              content={content}
                              setcontent={setcontent}
                         ></RillQ>
                         <button className="bg-slate-800 text-white border-2 border-black rounded-md py-2 text-xl">
                              Update Post
                         </button>
                    </form>
               </div>
          </div>
     );
}

export default EditPost;
