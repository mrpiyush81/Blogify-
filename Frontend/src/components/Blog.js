import React from "react";
import { compareAsc, format } from "date-fns";
import { Link } from "react-router-dom";
function Blog({ post }) {
     return (
          <div className="flex md:flex-row flex-col  w-full gap-3 items-start justify-start ">
               <Link to={`/post/${post._id}`} className="md:w-[45%] w-full ">
                    <img
                         src={"http://localhost:4000/" + post.file}
                         className="object-contain  h-60 w-96  bg-neutral-400 rounded-md py-2 px-2"
                         alt={post.file}
                    />
               </Link>

               <div className="sm:w-[30%] h-[300px] ">
                    <Link to={`/post/${post._id}`}>
                         <h2 className="mb-2 font-bold leading-tight text-primary underline">
                              {post.title}
                         </h2>
                    </Link>

                    <div>
                         <p className="font-semibold mt-2">
                              {post.author.username}
                         </p>
                         <time className="mt-2">
                              {format(new Date(post.date), "MMM d, yyyy HH:mm")}{" "}
                         </time>
                    </div>

                    <div className="">
                         {post.summary.substring(0, 60) + "..."}
                    </div>
               </div>
          </div>
     );
}

export default Blog;
