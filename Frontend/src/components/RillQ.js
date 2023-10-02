import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

let modules = {
     toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
               { list: "ordered" },
               { list: "bullet" },
               { indent: "-1" },
               { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
     ],
};

let formats = [
     "header",
     "bold",
     "italic",
     "underline",
     "strike",
     "blockquote",
     "list",
     "bullet",
     "indent",
     "link",
     "image",
];

function RillQ({ setcontent, content }) {
     return (
          <div>
               <ReactQuill
                    value={content}
                    className="border-2 border-black rounded-md "
                    modules={modules}
                    onChange={(ev) => {
                         setcontent(ev);
                    }}
                    formats={formats}
               />
          </div>
     );
}

export default RillQ;
