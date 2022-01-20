import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import "./assets/style/style.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage"
import Footer from "./components/Footer";
import Students from "./components/students/Students";
import StudentInfo from "./components/students/StudentInfo";
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

    //TODO sidebar active ise active classı ekle
    const sidebarCollapse = () => {
        document.querySelector(".sidebar").classList.toggle("active");
        document.querySelector(".main-content").classList.toggle("active");
        // localStorage.setItem("sidebar", document.querySelector(".sidebar").classList.contains("active"));
    };

    const [studentsData, setStudentsData] = useState([]);
    const [serverLink, setServerLink] = useState("http://localhost:3001");
    const [isDeleteStudentsModalBtnDisabled, setIsDeleteStudentsModalBtnDisabled] = useState(true)
    const [studentName, setStudentName] = useState();
    const [studentInfo, setStudentInfo] = useState();
    const [studentClass, setStudentClass] = useState();
    const data = {
        studentsData,
        setStudentsData,
        serverLink,
        isDeleteStudentsModalBtnDisabled,
        setIsDeleteStudentsModalBtnDisabled,
        studentName,
        studentInfo,
        studentClass,
        setStudentName,
        setStudentClass,
        setStudentInfo
    };

    return (
        <MainContext.Provider value={data}>
            <div className="wrapper">
                <Navbar sidebarCollapse={sidebarCollapse}/>
                <Sidebar sidebarItems={sidebarItems} logo={logo}/>

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="students" element={<Students/>}/>
                        <Route path="student/:id" element={<StudentInfo/>}/>
                    </Routes>
                </div>
                <Footer logo={logo}/>
            </div>
        </MainContext.Provider>
    );
}

export default App;
