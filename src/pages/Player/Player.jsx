import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import NavigationSwiper from "../../Components/NavigationSwiper";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules'; // Cập nhật từ 'swiper/modules'

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Player = ({ listPlayer = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([{
    name: "",
    key: "",
    published_at: "",
    type: "",
  }]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZkMTIyZTM4ODhkNDk1NWVhN2E5NTdjMmRkMjU0ZCIsIm5iZiI6MTcyNzQzMDA5OC40MjgwNzMsInN1YiI6IjY2ZjUzNjkyNjdkZDM2ZmU2ZTQ3ZDRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IW-DiW66fHTdd2P72glsMq4ubj3N_lPgmICEGAns3kI",
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (listPlayer) {
          setApiData(response.results.slice(0, 5)); // Lấy tối đa 5 video
        } else {
          const trailer = response.results.find((video) => video.type === "Trailer");
          if (trailer) {
            setApiData({
              name: trailer.name,
              key: trailer.key,
              published_at: trailer.published_at.slice(0,10),
              type: trailer.type,
            });
          } else {
            console.log("Trailer not found");
            setApiData({
              name: "No trailer available",
              key: "",
              published_at: "",
              type: "N/A",
            });
          }
        }
      })
      .catch((err) => console.error(err));
      
  }, [id]);

  return listPlayer ? (
    <NavigationSwiper> 
      {apiData.map((movie) => (
        <SwiperSlide key={movie.key}>
          <div className="player">
            <iframe
              width="84%"
              height="75%"
              src={`https://www.youtube.com/embed/${movie.key}`}
              title={movie.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  ) : (
    <div className="player">
      <img
        onClick={() => navigate(-2)}
        src={back_arrow_icon}
        alt="back"
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;

