import React, { useContext, useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import info_icon from "../../assets/info_icon.png";

const TitleCards = ({ title, category, isHero }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const { setHeroId } = useContext(StoreContext);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZkMTIyZTM4ODhkNDk1NWVhN2E5NTdjMmRkMjU0ZCIsIm5iZiI6MTcyNzM0NjYyNS43NDkxNjYsInN1YiI6IjY2ZjUzNjkyNjdkZDM2ZmU2ZTQ3ZDRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LVef_oJprrswi4AqwNh47IbDotIoKXEYoXLv5fj57RA",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setApiData(response.results);
        if (isHero) {
          setHeroId(response.results[0].id);
        }
      })
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.poster_path}
                alt=""
              />
              <div className="more-action">
                <Link to={`/Player/${card.id}`}>
                  <button className="btn-trailer"></button>
                </Link>
                <p>{card.original_title}</p>
                <Link to={`/MovieDetail/${card.id}`}>
                  <button className="btn-detail">
                    <img src={info_icon} alt="" />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
