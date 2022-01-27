import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import StudentEditModal from "./StudentEditModal";
import {useContext, useState} from "react";
import mainContext from "../../MainContext";
import {CourseBadge} from "../../styledComponents/studentsStyle";
import DeleteModal from "../DeleteModal";

const StudentList = ({deleteStudent}) => {
    const {studentsData} = useContext(mainContext)

    const [studentIds, setStudentIds] = useState({
        index: 0,
        id: 0
    });
    const [isOpen, setIsOpen] = useState({
        add: false,
        edit: false,
        delete: false
    });

    return (
        <>
            <StudentEditModal onClose={() => {
                setIsOpen({...isOpen, edit: false});
                setStudentIds({...studentIds, index: 0});
            }} indexID={studentIds.index} studentId={studentIds.id} isActive={isOpen.edit}/>
            <DeleteModal handleDelete={deleteStudent} onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setStudentIds({...studentIds, index: 0});
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
                                                            <CourseBadge hex="#000">
                                                                Total: {item.courses.length}
                                                            </CourseBadge>
                                                            : ""
                                                    }
                                                    {item.courses.length > 0 ? item.courses.map((course, index) => (
                                                            <CourseBadge hex={course.courseColor} key={index}>
                                                                {course.courseName}
                                                            </CourseBadge>
                                                        ))
                                                        : <CourseBadge hex="#000">Student has no courses
                                                            yet </CourseBadge>}
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} alt="Edit icon" onClick={() => {
                                                setStudentIds({id: item.id, index: index});
                                                setIsOpen({...isOpen, edit: !isOpen.edit})
                                            }}/>
                                            <img src={deleteIcon} onClick={() => {
                                                setIsOpen({...isOpen, delete: !isOpen.delete});
                                                setStudentIds({...studentIds, id: item.id});
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
