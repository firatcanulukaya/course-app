import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import Modal from "./StudentEditModal";
import {useContext, useState} from "react";
import mainContext from "../../MainContext";
import {CourseBadge} from "../../styledComponents/studentsStyle";

const StudentList = () => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        setStudentName,
        setStudentInfo,
        setStudentClass
    } = useContext(mainContext)

    const [indexID, setIndexID] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const studentIndex = (indexID) => {
        setIndexID(indexID);
        setIsOpen(!isOpen);
    }

    const deleteStudent = (id) => {
        fetch(`${serverLink}/api/student/deleteStudent/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setStudentsData(studentsData.filter((item) => item.id !== id));
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <Modal
                studentIndex={studentIndex} onClose={() => {
                setIsOpen(false);
                setIndexID(null);
            }}
                indexID={indexID} isActive={isOpen}/>

            <div className="table-container">

                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table">

                                <div className="row header">
                                    <div className="cell">
                                        ID
                                    </div>
                                    <div className="cell">
                                        Student Info
                                    </div>
                                    <div className="cell">
                                        Courses
                                    </div>
                                    <div className="cell">

                                    </div>

                                </div>

                                {studentsData.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className="cell" data-title="ID">
                                            {item.id}
                                        </div>
                                        <div className="cell" data-title="Student Info">
                                            <a href={`student/${item.id}`}>{item.studentName.length < 20 ? item.studentName : item.studentName.substr(0, 20) + "..."}
                                            </a>

                                            <p>Class: {item.class.className} <br/>
                                                Age: {item.studentAge.length < 20 ? item.studentAge : item.studentAge.substr(0, 15) + "..."}</p>
                                        </div>
                                        <div className="cell" data-title="Courses">

                                            <ul>
                                                <li className="student-table-li">
                                                    {item.courses.length > 0 ? item.courses.map((course, index) => (
                                                            <CourseBadge hex={course.courseColor} key={index}>
                                                                {course.courseName}
                                                            </CourseBadge>
                                                        ))
                                                    : <CourseBadge hex="#000">Student has no courses yet</CourseBadge>}
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} alt="Edit icon" onClick={() => {
                                                setIsOpen(true);
                                                studentIndex(index)
                                                setStudentName(studentsData[index]?.studentName);
                                                setStudentInfo(studentsData[index]?.studentInfo);
                                                setStudentClass(studentsData[index]?.class.className);
                                            }}

                                            />
                                            <img src={deleteIcon} onClick={() => deleteStudent(item.id)}
                                                 alt="Delete icon"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentList;
