import Modal from "../students/StudentEditModal";
import {CourseBadge} from "../../styledComponents";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import {useContext} from "react";
import mainContext from "../../MainContext";

const CourseList = () => {
    const {classesData} = useContext(mainContext);

    return (
        <>
            {/*<Modal*/}
            {/*    studentIndex={studentIndex} onClose={() => {*/}
            {/*    setIsOpen(false);*/}
            {/*    setIndexID(null);*/}
            {/*}}*/}
            {/*    indexID={indexID} isActive={isOpen}/>*/}

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
                                        Class Info
                                    </div>
                                    <div className="cell">
                                        Students
                                    </div>
                                    <div className="cell">

                                    </div>

                                </div>


                                {classesData.map((item, index) => (

                                    <div className="row" key={index}>
                                        <div className="cell" data-title="ID">
                                            {item.id}
                                        </div>
                                        <div className="cell" data-title="Student Info">
                                            <a href={`class/${item.id}`}> {item.className}
                                            </a>

                                            <p>Total Student Count: {item.students.length}</p>
                                        </div>
                                        <div className="cell" data-title="Courses">

                                            <ul>
                                                <li className="student-table-li">
                                                    {item.students.length > 0 ? item.students.map((student, index) => (
                                                            <CourseBadge hex="#60A5FA"
                                                                         key={index}>{student.studentName}</CourseBadge>
                                                        ))
                                                        :
                                                        <li className="student-table-li">
                                                            <CourseBadge hex="#000">Class has no students
                                                                yet</CourseBadge>
                                                        </li>
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