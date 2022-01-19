import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import bg from "../../assets/img/bg3.svg";
import {CourseBadge} from "../../styledComponents/studentsStyle";

function StudentInfo() {
    const [veri, setVeri] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch("http://localhost:3001/api/student/getStudentInfo/" + id)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setVeri(json)
            })
            .catch((error) => console.log(error));
    }, []);

    const randomHexGenerator = () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#00${hex.substr(0, 2)}e3`;
    }

    return (
        <div className="students-container">
            <img src={bg} alt="background" className="homepage-bg"/>

            <div className="table-container">
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table">

                                <div className="row header">
                                    <div className="cell" style={{width: "140px"}}>
                                        Student ID
                                    </div>
                                    <div className="cell">
                                        Student Name
                                    </div>
                                    <div className="cell">
                                        Student Course(s)
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="ID">
                                        {veri?.id}
                                    </div>
                                    <div className="cell" data-title="Student Name">
                                        <a href={`student/${veri?.id}`}>
                                            {veri?.studentName.length < 20 ? veri?.studentName : veri?.studentName.substr(0, 20) + "..."}
                                        </a>
                                        <p>Age: {veri?.studentInfo.length < 20 ? veri?.studentInfo : veri?.studentInfo.substr(0, 15) + "..."}</p>
                                        <p>Class
                                            Name: {veri?.studentClassName.length < 20 ? veri?.studentClassName : veri?.studentClassName.substr(0, 5) + "..."}</p>
                                    </div>

                                    <div className="cell" data-title="Courses">
                                        <ul>
                                            <li className="student-table-li">

                                                <CourseBadge hex={() => randomHexGenerator}>
                                                    Course 1
                                                </CourseBadge>

                                                <CourseBadge hex={() => randomHexGenerator}>
                                                    Course 2
                                                </CourseBadge>

                                                <CourseBadge hex={() => randomHexGenerator}>
                                                    Course 3
                                                </CourseBadge>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default StudentInfo;
