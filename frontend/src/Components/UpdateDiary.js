import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/Feed.css";
const Feed = () => {
  const params = useParams();
  const [prevTitle, setPrevTitle] = useState("");
  const [prevDesc, setPrevDesc] = useState("");
  const backendUrlForSingleDiary =
    "http://localhost:9000/api/diary/getDiaryById/" + params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(backendUrlForSingleDiary, {
          withCredentials: true,
        });
        setPrevTitle(response.data.title);
        setPrevDesc(response.data.description);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchData();
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const backendUrlForUpdatingDiary =
    "http://localhost:9000/api/diary/updateDiary/" + params.id;
  const submitHandler = (event) => {
    event.preventDefault();
   
    if(title.length > 0 && desc.length > 0){
      const currentTime = new Date();
      axios
        .put(
          backendUrlForUpdatingDiary,
          {
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
    else{
      alert("Enter Title and Description");
    }
  };
  return (
    <div className="feed">
      <form className="form" onSubmit={submitHandler}>
        <div className="box">
          <label>Title</label>
          <input
            onChange={(event) => {setTitle(event.target.value)}}
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
          <label>Add More Images</label>
          <input
            onChange={(event) => {
              setImageUrl(event.target.value);
            }
            }
            type="text"
          ></input>
        </div>
        
        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default Feed;
