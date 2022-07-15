import React from "react";
import Feed from "./Feed";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Show.css";

const Pages = () => {
  const [login, setLogin] = useState(false);
  const deleteDiary = (id) => {
    axios
      .delete(`http://localhost:9000/api/diary/deleteDiary/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Successfully Deleted");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("login") === "true") {
      setLogin(true);
    }
  }, [login]);
  const [diary, setDiary] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        "http://localhost:9000/api/diary/getDiary",
        {
          name: localStorage.getItem("name"),
        },
        {
          withCredentials: true,
        }
      );
      setDiary(response.data);
    }
    fetchData();
  }, []);
  let rotate;
  return (
    <>
      <Feed />
      {diary.length > 0
        ? diary.map((note, key) => (
            <div className="show" key={key}>
              <div>{note.date}</div>
              <h2>{note.title}</h2>
              <div>{note.description}</div>
              {note.imageUrl.length > 0 &&
                note.imageUrl.map((image, i=0) => (
                  <img
                    src={image}
                    style={{
                      imageOrientation: "from-image",
                      // transform: `rotate(${20*(i*1+1)*-1}deg)`,  
                      width: "100px",
                      height: "100px",
                      marginLeft: "10px",
                      marginTop: "10px",
                      display: "inline-flex",

                    }}
                    alt="image"
                  />
                ))}
              <div className="button">
                {login && (
                  <>
                    <button>
                      <Link to={`/updateDiary/${note._id}`}>Update</Link>
                    </button>
                    <button onClick={() => deleteDiary(note._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        : (
          (
            <div className="show">
              <h2>No Notes</h2>
            </div>
          ))}
    </>
  );
};

export default Pages;
