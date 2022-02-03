import {useContext, useState} from "react";
import StudentEditModal from "./StudentEditModal";
import DeleteModal from "../DeleteModal";
import mainContext from "../../MainContext";
import {CourseBadge} from "../../styledComponents";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import timesIcon from "../../assets/img/times.svg";
import axios from "axios";

const StudentList = ({deleteStudent}) => {
    const {studentsData, setStudentsData, serverLink, setIsBlur} = useContext(mainContext)

    const [studentIds, setStudentIds] = useState({
        index: 0,
        id: 0
    });
    const [isOpen, setIsOpen] = useState({
        add: false,
        edit: false,
        delete: false
    });

    const removeCourse = (studentId, courseId) => {
        axios.delete(`${serverLink}/api/course/removeStudentFromCourse`, {
            data: {
                studentId: studentId,
                courseId: courseId
            }
        })
            .then(() => {
                axios.get(`${serverLink}/api/student/get/${studentId}`)
                    .then(res => {
                        const newStudentsData = studentsData.map(student => {
                            if (student.id === studentId) {
                                student.courses = res.data.courses;
                            }
                            return student;
                        });
                        setStudentsData(newStudentsData);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <StudentEditModal onClose={() => {
                setIsOpen({...isOpen, edit: false});
                setStudentIds({id: 0, index: 0});
                setIsBlur(false);
            }} indexID={studentIds.index} studentId={studentIds.id} isActive={isOpen.edit}/>
            <DeleteModal handleDelete={deleteStudent} onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setStudentIds({id: 0, index: 0});
                setIsBlur(false);
            }} id={studentIds.id} isActive={isOpen.delete} type={"student"}/>

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
                                            <a href={`student/${item.id}`}>{item.studentName.length < 20 ? item.studentName : item.studentName.substr(0, 20) + "..."}</a>
                                            <p>
                                                Class: {item.class ? item.class.className : "Student has no class"}
                                                <br/>
                                                Age: {item.studentAge.length < 20 ? item.studentAge : item.studentAge.substr(0, 15) + "..."}
                                            </p>
                                        </div>
                                        <div className="cell" data-title="Courses">

                                            <ul>
                                                <li className="student-table-li">
                                                    {
                                                        item.courses.length > 0 ?
                                                            <CourseBadge hex="#011F3B">
                                                                Total: {item.courses.length}
                                                            </CourseBadge>
                                                            : ""
                                                    }
                                                    {item.courses.length > 0 ? item.courses.map((course, index) => (
                                                            <CourseBadge hex={course.courseColor} key={index}>
                                                                <a href={`course/${course.id}`}>{course.courseName.length < 20 ? course.courseName : course.courseName.substr(0, 20) + "..."}</a>
                                                                <button className="tooltip"
                                                                        data-tip={`Remove ${course.courseName} course from student`}
                                                                        onClick={() => removeCourse(item.id, course.id)}>
                                                                    <img src={timesIcon}
                                                                         style={{mixBlendMode: "luminosity"}}
                                                                         alt="times icon"/></button>
                                                            </CourseBadge>
                                                        ))
                                                        : <CourseBadge hex="#011F3B">Student has no courses
                                                            yet </CourseBadge>}
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} style={{cursor: "pointer"}} alt="Edit icon"
                                                 onClick={() => {
                                                     setStudentIds({id: item.id, index: index});
                                                     setIsOpen({...isOpen, edit: !isOpen.edit});
                                                     setIsBlur(true);
                                                 }}/>
                                            <img src={deleteIcon} style={{cursor: "pointer"}} onClick={() => {
                                                setIsOpen({...isOpen, delete: !isOpen.delete});
                                                setStudentIds({...studentIds, id: item.id});
                                                setIsBlur(true);
                                            }}
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
