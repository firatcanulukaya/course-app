import {useContext, useEffect, useState} from "react";
import {CourseBadge} from "../../styledComponents/studentsStyle";
import mainContext from "../../MainContext";
import CourseEditModal from "./CourseEditModal";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import timesIcon from "../../assets/img/times.svg";
import axios from "axios";
import DeleteModal from "../DeleteModal";


const CourseList = ({deleteCourse}) => {
    const {coursesData, setCoursesData, serverLink} = useContext(mainContext);

    const [courseIds, setCourseIds] = useState({
        index: 0,
        id: 0
    });

    const [isOpen, setIsOpen] = useState({
        add: false,
        edit: false,
        delete: false
    });

    const removeStudent = (studentId, courseId) => {
        axios.delete(`${serverLink}/api/course/removeStudentFromCourse`, {
            data: {
                studentId: studentId,
                courseId: courseId
            }
        })
            .then(() => {
                axios.get(`${serverLink}/api/course/get/${courseId}`)
                    .then(res => {
                        const newCourseData = coursesData.map(course => {
                            if (course.id === courseId) {
                                course.students = res.data.students;
                            }
                            return course;
                        });
                        setCoursesData(newCourseData);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <CourseEditModal onClose={() => {
                setIsOpen({...isOpen, edit: false});
                setCourseIds({id: 0, index: 0});
            }} indexID={courseIds.index} courseId={courseIds.id} isActive={isOpen.edit}/>

            <DeleteModal handleDelete={deleteCourse} onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setCourseIds({id: 0, index: 0});
            }} id={courseIds.id} isActive={isOpen.delete} type={"course"}/>

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
                                        Course Info
                                    </div>
                                    <div className="cell">
                                        Students
                                    </div>
                                    <div className="cell"></div>
                                </div>

                                {coursesData.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className="cell" data-title="ID">
                                            {item.id}
                                        </div>
                                        <div className="cell" data-title="Course Info">
                                            <a href={`course/${item.id}`}> {item.courseName} </a>
                                            <p>Total Student Count: {item.students.length}</p>
                                        </div>
                                        <div className="cell" data-title="Students">
                                            <ul>
                                                <li className="student-table-li">
                                                    {
                                                        item.students.length > 0 ? item.students.map((student, index) => (
                                                            <CourseBadge key={index} hex={item.courseColor}>
                                                                <a href={`student/${student.id}`}>{student.studentName.length < 20 ? student.studentName : student.studentName.substr(0, 20) + "..."}</a>
                                                                <button className="tooltip"
                                                                        data-tip={`Remove ${student.studentName} student from course`}
                                                                        onClick={() => removeStudent(student.id, item.id)}>
                                                                    <img src={timesIcon} alt="times icon"/></button>
                                                            </CourseBadge>
                                                        )) : <CourseBadge hex="#B91C1C">
                                                            Course has not any students yet
                                                        </CourseBadge>
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} style={{cursor: "pointer"}} alt="Edit icon"
                                                 onClick={() => {
                                                     setCourseIds({id: item.id, index: index});
                                                     setIsOpen({...isOpen, edit: !isOpen.edit})
                                                 }}/>
                                            <img src={deleteIcon} style={{cursor: "pointer"}} onClick={() => {
                                                setIsOpen({...isOpen, delete: !isOpen.delete});
                                                setCourseIds({...courseIds, id: item.id});
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

export default CourseList;