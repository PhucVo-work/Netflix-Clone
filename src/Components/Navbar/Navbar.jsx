import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {  // Đảm bảo navRef.current không phải là null
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img onClick={()=>{navigate('/')}} src={logo} alt="" />
        <ul>
          <li onClick={()=>{navigate('/')}}>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & popular</li>
          <li>My list</li>
          <li>Browse By Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" className="icons" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
