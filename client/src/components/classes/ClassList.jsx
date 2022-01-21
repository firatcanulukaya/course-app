import Modal from "../students/StudentEditModal";
import {CourseBadge} from "../../styledComponents/studentsStyle";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";

const CourseList = () => {
    return(
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


                                    <div className="row">
                                        <div className="cell" data-title="ID">
                                            item id
                                        </div>
                                        <div className="cell" data-title="Student Info">
                                            <a href={`student/item id`}>class name
                                            </a>

                                            <p>Total Student Count: 0</p>
                                        </div>
                                        <div className="cell" data-title="Courses">

                                            <ul>
                                                <li className="student-table-li">
                                                   <CourseBadge hex="#000">Class has no students yet</CourseBadge>
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} alt="Edit icon"/>
                                            <img src={deleteIcon}alt="Delete icon"/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseList;