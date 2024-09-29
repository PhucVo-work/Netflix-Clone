import React, { useEffect } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const { id } = useParams();
  const navigate= useNavigate()


  const [apiData, SetApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZkMTIyZTM4ODhkNDk1NWVhN2E5NTdjMmRkMjU0ZCIsIm5iZiI6MTcyNzQzMDA5OC40MjgwNzMsInN1YiI6IjY2ZjUzNjkyNjdkZDM2ZmU2ZTQ3ZDRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IW-DiW66fHTdd2P72glsMq4ubj3N_lPgmICEGAns3kI'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then((response) => {
        // Lọc để tìm video có type là "Trailer"
        console.log(response);
        const trailer = response.results.find(video => video.type === "Trailer");
        if (trailer) {
          SetApiData({
            name: trailer.name,
            key: trailer.key,
            published_at: trailer.published_at,
            type: trailer.type
          });
        } else {
          console.log("Trailer not found");
          SetApiData({
            name: "No trailer available",
            key: "",
            published_at: "",
            type: "N/A"
          });
        }
      })
      .catch(err => console.error(err));
  },[id])

  useEffect(() => {
    console.log(apiData); // Chỉ chạy khi apiData thay đổi
  }, [apiData]);

  return (
    <div className="player">
      <img onClick={()=>{navigate(-2)}} src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
