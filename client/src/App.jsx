import React, {useEffect, useState} from "react";
import { Routes, Route} from "react-router-dom";
import "./assets/style/style.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage"
import Footer from "./components/Footer";
import Students from "./components/students/Students";
import StudentInfo from "./components/students/StudentInfo";
import Courses from "./components/courses/Courses";
import CourseInfo from "./components/courses/CourseInfo";
import Classes from "./components/classes/Classes";
import ClassInfo from "./components/classes/ClassInfo";
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
        document.querySelector(".sidebar").classList.toggle("active");
        document.querySelector(".main-content").classList.toggle("active");
        document.querySelector(".navbar-container").classList.toggle("active");

        if(document.querySelector(".sidebar").classList.contains("active")){
            localStorage.setItem("sidebar", "active");
        }
        else{
            localStorage.removeItem("sidebar");
        }
    };

    useEffect(() => {
        if(localStorage.getItem("sidebar") === "active"){
            document.querySelector(".sidebar").classList.add("active");
            document.querySelector(".main-content").classList.add("active");
            document.querySelector(".navbar-container").classList.add("active");
        }
    }, []);

    const [studentsData, setStudentsData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [classesData, setClassesData] = useState([]);
    const [serverLink, setServerLink] = useState("http://localhost:3001");
    const [isModalDeleteBtnDisabled, setIsModalDeleteBtnDisabled] = useState({
        student: true,
        course: true,
        classes: true
    });

    const [isBlur, setIsBlur] = useState(false);

    const data = {
        studentsData,
        setStudentsData,
        coursesData,
        setCoursesData,
        classesData,
        setClassesData,
        serverLink,
        isModalDeleteBtnDisabled,
        setIsModalDeleteBtnDisabled,
        isBlur,
        setIsBlur
    };

    return (
        <MainContext.Provider value={data}>
            <div className="wrapper">
            <div className={"blur " + (isBlur && "active")}/>
                <Navbar sidebarCollapse={sidebarCollapse}/>
                <Sidebar sidebarItems={sidebarItems} logo={logo} sidebarCollapse={sidebarCollapse}/>

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="students" element={<Students/>}/>
                        <Route path="student/:id" element={<StudentInfo/>}/>
                        <Route path="courses" element={<Courses/>}/>
                        <Route path="course/:id" element={<CourseInfo/>}/>
                        <Route path="classes" element={<Classes/>}/>
                        <Route path="class/:id" element={<ClassInfo/>}/>
                    </Routes>
                </div>
                <Footer logo={logo}/>
            </div>
        </MainContext.Provider>
    );
}

export default App;
