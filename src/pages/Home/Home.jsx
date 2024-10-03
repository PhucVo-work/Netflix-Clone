import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../Components/TitleCards/TitleCards.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { StoreContext } from "../../context/storeContext.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { heroId } = useContext(StoreContext)
  const [ apiData, setApiData] = useState({})
  console.log(heroId);
  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZkMTIyZTM4ODhkNDk1NWVhN2E5NTdjMmRkMjU0ZCIsIm5iZiI6MTcyNzM0NjYyNS43NDkxNjYsInN1YiI6IjY2ZjUzNjkyNjdkZDM2ZmU2ZTQ3ZDRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LVef_oJprrswi4AqwNh47IbDotIoKXEYoXLv5fj57RA",
    },
  };

  useEffect(()=>{
    if (!heroId) return; // Chỉ fetch API khi heroId tồn tại
    fetch(`https://api.themoviedb.org/3/movie/${heroId}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response))
      .catch((err) => console.error(err));
  }, [heroId])

  return (
    <div className="home">
      <div className="hero">
        <Navbar />
        <img src={'https://image.tmdb.org/t/p/w1280/' + apiData.backdrop_path} alt="" className="banner-img" />
        <div className="hero-caption">
          <h2 className="hero-name">{apiData.title}</h2>
          <ul className="genres flex">
              {apiData.genres?.map((type) => (
                <li className="genre" key={type.id}>
                  {type.name}
                </li>
              )) || <li>No genres available</li>}
          </ul>
          <p>
            {apiData.overview}
          </p>
          <div className="hero-btns">
            <Link to={`/player/${heroId}`}> 
              <button className="btn">
                <img src={play_icon} alt="" />
                Trailer
              </button>
            </Link>
            <Link to={`/MovieDetail/${heroId}`}>
              <button className="btn dark-btn">
                <img src={info_icon} alt="" />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} isHero={true}/>
        <TitleCards title={"Top pics for you"} category={"now_playing"}  />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
