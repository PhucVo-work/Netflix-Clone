import React, { useEffect, useState } from "react";
import "./DetailMovie.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS chính
import { Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import play_icon from "../../assets/play_icon.png";
import Player from "../Player/Player";

const DetailMovie = () => {
  const { id } = useParams();
  const [castData, setCastData] = useState([]);
  const [apiData, setApiData] = useState({});
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZkMTIyZTM4ODhkNDk1NWVhN2E5NTdjMmRkMjU0ZCIsIm5iZiI6MTcyNzc1MDUzMy43OTgwNTcsInN1YiI6IjY2ZjUzNjkyNjdkZDM2ZmU2ZTQ3ZDRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8IokQTf7hvUpGNPyOpxKzm6k11uX2VfEDvHRhZGXiiQ",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
      .then((response) => response.json())
      .then((response) => setCastData(response.cast)) // Lấy danh sách diễn viên
      .catch((err) => console.error(err));
  }, []);
  // console.log(castData);
  console.log(apiData);
  return (
    <div>
      <Navbar />
      <div className="hero detail-movie">
        <img
          src={"https://image.tmdb.org/t/p/w1280/" + apiData.backdrop_path}
          alt=""
          className="detail-img"
        />
        <div className="flex info">
          <img
            className="hero-poster"
            src={"https://image.tmdb.org/t/p/w500/" + apiData.poster_path}
            alt=""
          />
          <div className="info-movie">
            <h1 className="name">{apiData.original_title}</h1>
            <ul className="genres flex">
              {apiData.genres?.map((type) => (
                <li className="genre" key={type.id}>
                  {type.name}
                </li>
              )) || <li>No genres available</li>}
            </ul>
            <div className="detail-btn">
              <Link to={`/player/${apiData.id}`}>
                <button className="btn">
                  <img src={play_icon} alt="" />
                  Trailer
                </button>
              </Link>
            </div>
            <p className="over-view">{apiData.overview}</p>
            <h3 className="title-cast">Casts</h3>
            <ul className="flex caster-list">
              <Swiper
                spaceBetween={16}
                slidesPerView={4}
                loop={false}
                grabCursor={true} // Thêm tính năng kéo chuột
                mousewheel={true} // Kích hoạt cuộn chuột
                modules={[Mousewheel]} // Thêm Mousewheel vào modules
              >
                {castData.map((caster) => (
                  <SwiperSlide key={caster.id}>
                    <div className="caster-item">
                      <img
                        className="caster-img"
                        src={`https://image.tmdb.org/t/p/w500${caster.profile_path}`}
                        alt={caster.name}
                      />
                      <div className="w">
                        <p className="caster-name">{caster.name}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Player listPlayer={true}/>
      </div>
    </div>
  );
};

export default DetailMovie;
