import React from 'react';
import "./Navbar.css"
import logo from "./assets/bot.png"
const Navbar = ({mode, setMode}) => {
    const handleMode = () =>{
        if(mode === "dark"){
            setMode("light");
            document.documentElement.style.setProperty('background-color',"#fff");
            document.documentElement.style.setProperty('color',"black");
            document.documentElement.style.setProperty('color-scheme',"dark light");
        }
        else{
            setMode("dark");
            document.documentElement.style.setProperty('color',"#fff");
            document.documentElement.style.setProperty('background-color',"black");
            document.documentElement.style.setProperty('color-scheme',"light dark");
        }
    }
    return (
        <nav>
            <ul>
                <div className="img">
                    <img src={logo} alt="" />
                    <span>Chat Bot </span>
                </div>
                <div className="mode">
                    <i className={mode === "dark"?"fa-solid fa-sun":"fa-solid fa-moon"} onClick={handleMode}></i>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
