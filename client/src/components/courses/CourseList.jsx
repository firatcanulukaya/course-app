import {useContext, useEffect} from "react";
import {CourseBadge} from "../../styledComponents/studentsStyle";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import mainContext from "../../MainContext";
import Modal from "./CourseAddModal";


const CourseList = () => {
    const {coursesData, setCoursesData} = useContext(mainContext);


    return (
        <>
            {/*<Modal*/}
            {/*    studentIndex={studentIndex} onClose={() => {*/}
            {/*    setIsOpen(false);*/}
            {/*}}*/}
            {/*    isActive={isOpen}/>*/}

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
                                                                {student.studentName}
                                                            </CourseBadge>
                                                        )) : <CourseBadge hex="#B91C1C">
                                                            Course has not any students yet
                                                        </CourseBadge>
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} alt="Edit icon"/>
                                            <img src={deleteIcon} alt="Delete icon"/>
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