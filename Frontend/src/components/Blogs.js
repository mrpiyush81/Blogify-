import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import Navbar from "./Navbar";
function Blogs() {
     const [posts, setposts] = useState("");
     async function fetchdata() {
          try {
               const data = await axios.get("http://localhost:4000/post");
               console.log(data.data);
               setposts(data.data);
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          fetchdata();
     }, []);

     return (
          <div>
               <Navbar></Navbar>
               <div className="mt-5 flex flex-col w-[80%] mx-auto  ">
                    {posts.length > 0 &&
                         posts.map((post) => {
                              return <Blog key={post._id} post={post} />;
                         })}
               </div>
          </div>
     );
}

export default Blogs;
