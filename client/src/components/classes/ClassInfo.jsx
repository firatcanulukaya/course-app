import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import DeleteModal from "../DeleteModal";
import mainContext from "../../MainContext";
import axios from "axios";
import {CourseBadge, InfoButtons, InfoCardTag, InfoCardTopPhoto} from "../../styledComponents";
import bg from "../../assets/img/bg4.svg";
import photo from "../../assets/img/photo.svg";
import arrowLeft from "../../assets/img/arrowLeft.svg"
import {useNavigate} from "react-router-dom";
import ClassEditModal from "./ClassEditModal";
import timesIcon from "../../assets/img/times.svg";
import {InfoBanner} from "../../styledComponents";
import {getAll} from "../../utils/utilFunctions";

const ClassInfo = () => {
    const {serverLink, classesData, setClassesData, setStudentsData, setIsBlur} = useContext(mainContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [clas, setClas] = useState({})
    const [isOpen, setIsOpen] = useState({
        delete: false,
        edit: false
    })

    useEffect(() => {
        getAll(serverLink, setStudentsData, "student");
        getAll(serverLink, setClassesData, "class");
    }, [])

    useEffect(() => {
        const classe = classesData.find(c => c.id === parseInt(id))
        setClas(classe)
    }, [classesData, id])

    const deleteClass = (id) => {
        axios.delete(`${serverLink}/api/class/delete/${id}`)
            .then(res => navigate("/classes"))
            .catch(err => console.log(err))
    }

    const removeStudent = (classId, studentId) => {
        axios.patch(`${serverLink}/api/class/removeStudent/${studentId}`)
            .then(() => {
                const newClassesData = classesData.map(c => {
                    if (c.id === classId) {
                        c.students = c.students.filter(s => s.id !== studentId)
                    }
                    return c
                })
                setClassesData(newClassesData)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="infoCardContainer">
            <DeleteModal id={id} isActive={isOpen.delete} onClose={() => { setIsOpen({...isOpen, delete: !isOpen.delete}); setIsBlur(false) }}
                         handleDelete={deleteClass} type="course"/>
            <ClassEditModal isActive={isOpen.edit} onClose={() => { setIsOpen({...isOpen, edit: !isOpen.edit}); setIsBlur(false) }}
                             classId={id}/>

            <img src={bg} alt="background" className="card-bg"/>
            <div className="infoCard">
                <InfoBanner bgColor="#ABCDEF"/>

                <div className="infoCardTop">
                    <div className="infoCardTopLeft">
                        <InfoCardTopPhoto bgColor="#ABCDEF">
                            <p className="infoCardTopName">{clas?.className?.substr(0, 1)}</p>
                        </InfoCardTopPhoto>
                        <div className="infoCardUtils">
                            <p>{clas?.classname?.length > 50 ? clas?.className.substr(0, 50) : clas?.className}</p>
                            <span>Created at: {new Date(clas?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}</span>
                        </div>
                    </div>
                </div>

                <div className="infoCardContent">

                    <div className="infoCardContent-section">
                        <p>Students (total: {clas?.students?.length}):</p>

                        <ul>
                            <li className="student-table-li">
                                {clas?.students?.length > 0 ? clas?.students.map((student, index) => (
                                    <CourseBadge hex="#ABCDEF" key={index}>
                                        <a onClick={() => navigate(`/student/${student.id}`)} style={{cursor: "pointer"}}>{student.studentName.length < 20 ? student.studentName : student.studentName.substr(0, 20) + "..."}</a>
                                        <button className="tooltip"
                                                data-tip={`Remove ${student.studentName} student from class`}
                                                onClick={() => removeStudent(clas?.id, student.id)}>
                                            <img src={timesIcon} style={{mixBlendMode: "luminosity"}} alt="times icon"/></button>
                                    </CourseBadge>
                                )) : <InfoCardTag textColor={"red"}>Course has not any students.</InfoCardTag>}
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="infoCardFooter">
                    <div className="infoCardFooterSection">
                        <button onClick={() => navigate("/classes")}>
                            <img src={arrowLeft}/>
                            <p>Return Back</p>
                        </button>
                    </div>

                    <div className="infoCardFooterButtons">
                        <InfoButtons bgColor="#F1F1F1" textcolor="#23262F"
                                     onClick={() => { setIsOpen({...isOpen, edit: !isOpen.edit}); setIsBlur(true) }}>Edit</InfoButtons>
                        <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true}
                                     onClick={() => { setIsOpen({...isOpen, delete: !isOpen.delete}); setIsBlur(true) }}>Delete</InfoButtons>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ClassInfo;