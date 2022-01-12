import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/style/style.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage"
import Footer from "./components/Footer";
import Students from "./components/Students";
import KullaniciEkle from "./components/KullaniciEkle";
import KullaniciBilgi from "./components/KullaniciBilgi";
import MainContext from "./MainContext";
import logo from "./assets/img/logomorumsu.png";
import homeOutline from "./assets/img/home-outline.svg";
import schoolOutline from "./assets/img/school-outline.svg";
import easelOutline from "./assets/img/easel-outline.svg";
import desktopOutline from "./assets/img/desktop-outline.svg";


const App = () => {

    const sidebarItems = [
        {
            name: "Homepage",
            link: "/",
            icon: homeOutline
        },
        {
            name: "Students",
            link: "/students",
            icon: schoolOutline
        },
        {
            name: "Courses",
            link: "/courses",
            icon: desktopOutline
        },
        {
            name: "Classes",
            link: "/classes",
            icon: easelOutline
        }
    ]

    const sidebarCollapse = () => {
        const sidebar = document.querySelector(".sidebar");
        const mainContent = document.querySelector(".main-content");
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("active");
    };
    const [veri, setVeri] = useState([]);
    const [eskiVeri,setEskiVeri] = useState(veri);
    const data = {veri, setVeri, eskiVeri, setEskiVeri};

  return (
    <MainContext.Provider value={data}>
        <div className="wrapper">
            <Navbar sidebarCollapse={sidebarCollapse}/>
            <Sidebar sidebarItems={sidebarItems} logo={logo}/>

            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="students" element={<Students/>}/>
                    <Route path="k" element={<KullaniciEkle/>}/>
                    <Route path="kgetir/:id" element={<KullaniciBilgi/>}/>
                </Routes>
            </div>
            <Footer logo={logo}/>
        </div>
    </MainContext.Provider>
  );
}

export default App;
