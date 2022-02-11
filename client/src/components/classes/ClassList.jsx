import {useContext, useEffect, useState} from "react";
import {CourseBadge} from "../../styledComponents";
import mainContext from "../../MainContext";
import ClassEditModal from "./ClassEditModal";
import editIcon from "../../assets/img/edit.svg";
import deleteIcon from "../../assets/img/delete.svg";
import timesIcon from "../../assets/img/times.svg";
import axios from "axios";
import DeleteModal from "../DeleteModal";
import {useNavigate} from "react-router-dom";


const ClassList = ({deleteClass}) => {
    const {classesData, setClassesData, serverLink, setIsBlur} = useContext(mainContext);
    const navigate = useNavigate();

    const [classIds, setClassIds] = useState({
        index: 0,
        id: 0
    });

    const [isOpen, setIsOpen] = useState({
        add: false,
        edit: false,
        delete: false
    });

    const removeStudent = (studentId, classId) => {
        axios.patch(`${serverLink}/api/class/removeStudent/${studentId}`)
            .then(res => {
                const newClassesData = classesData.map(classData => {
                    if (classData.id === classId) {
                        const newStudents = classData.students.filter(student => student.id !== studentId);
                        return {...classData, students: newStudents};
                    }
                    return classData;
                });
                setClassesData(newClassesData);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <ClassEditModal onClose={() => {
                setIsOpen({...isOpen, edit: false});
                setClassIds({id: 0, index: 0});
                setIsBlur(false);
            }} indexID={classIds.index} classId={classIds.id} isActive={isOpen.edit}/>

            <DeleteModal handleDelete={deleteClass} onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setClassIds({id: 0, index: 0});
                setIsBlur(false);
            }} id={classIds.id} isActive={isOpen.delete} type={"class"}/>

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
                                    <div className="cell"/>
                                </div>

                                {classesData.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className="cell" data-title="ID">
                                            {item.id}
                                        </div>
                                        <div className="cell" data-title="Course Info">
                                            <a onClick={() => navigate(`/class/${item.id}`)}
                                               style={{cursor: "pointer"}}> {item.className} </a>
                                            <p>Total Student Count: {item.students.length}</p>
                                        </div>
                                        <div className="cell" data-title="Students">
                                            <ul>
                                                <li className="student-table-li">
                                                    {
                                                        item.students.length > 0 ? item.students.map((student, index) => (
                                                            <CourseBadge key={index} hex="#ABCDEF">
                                                                <a onClick={() => navigate(`/student/${student.id}`)}
                                                                   style={{cursor: "pointer"}}>{student.studentName.length < 20 ? student.studentName : student.studentName.substr(0, 20) + "..."}</a>
                                                                <button className="tooltip"
                                                                        data-tip={`Remove ${student.studentName} student from class`}
                                                                        onClick={() => removeStudent(student.id, item.id)}>
                                                                    <img src={timesIcon}
                                                                         style={{mixBlendMode: "luminosity"}}
                                                                         alt="times icon"/></button>
                                                            </CourseBadge>
                                                        )) : <CourseBadge hex="#B91C1C">
                                                            Class has not any students yet
                                                        </CourseBadge>
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="cell" data-title="Edit">
                                            <img src={editIcon} style={{cursor: "pointer"}} alt="Edit icon"
                                                 onClick={() => {
                                                     setClassIds({id: item.id, index: index});
                                                     setIsOpen({...isOpen, edit: !isOpen.edit})
                                                     setIsBlur(true);
                                                 }}/>
                                            <img src={deleteIcon} style={{cursor: "pointer"}} onClick={() => {
                                                setIsOpen({...isOpen, delete: !isOpen.delete});
                                                setClassIds({...classIds, id: item.id});
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

export default ClassList;