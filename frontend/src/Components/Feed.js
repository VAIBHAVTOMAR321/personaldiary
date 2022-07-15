import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Feed.css";
const Feed = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const backendUrl = "http://localhost:9000/api/diary/postDiary";
  const submitHandler = (event) => {
    event.preventDefault();
    if (!title.length && !desc.length) alert("Add Title and Description");
    else if (title.length === 0) {
      alert("Enter Title");
    } else if (desc.length == 0) {
      alert("Enter Description");
    }
    else if( imageUrl.length===0)
    {
      alert("Enter image url")
    } 
    else {
      const currentTime = new Date();
      axios
        .post(
          backendUrl,
          {
            name: localStorage.getItem("name"),
            date: currentTime,
            title: title,
            description: desc,
            imageUrl: imageUrl,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          alert("Successfully Added");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  if(localStorage.getItem("login")){
  return (
    <div className="feed">
      <form className="form" onSubmit={submitHandler}>
        <div className="box">
          <label>Title</label>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            type="text"
          ></input>
        </div>
        <div className="box">
          <label>Note</label>
          <textarea
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            type={desc}
            value={desc}
          ></textarea>
        </div>
        <div className="box">
          <label>Image</label>
          <input
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
          ></input>
        </div>
        <button>SUBMIT</button>
      </form>
    </div>
  );}
  else
  {
    return (
      <h1>Login To Enter In Diary</h1>
    )
  }
};

export default Feed;
