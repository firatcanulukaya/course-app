import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import DeleteModal from "../DeleteModal";
import mainContext from "../../MainContext";
import axios from "axios";
import {InfoButtons, InfoCardTag} from "../../styledComponents/studentsStyle";
import bg from "../../assets/img/bg4.svg";
import photo from "../../assets/img/photo.svg";
import arrowLeft from "../../assets/img/arrowLeft.svg"
import { useNavigate } from "react-router-dom";
import StudentEditModal from "./StudentEditModal";

const StudentInfo = () => {
    const {serverLink} = useContext(mainContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [student, setStudent] = useState({})
    const [isOpen, setIsOpen] = useState({
        delete: false,
        edit: false
    })

    useEffect(() => {
        axios.get(`${serverLink}/api/student/get/${id}`)
            .then(res => {
                setStudent(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteStudent = (id) => {
        axios.delete(`${serverLink}/api/student/delete/${id}`)
            .then(res =>  navigate("/students"))
            .catch(err => console.log(err))
    }

    return (
        <div className="infoCardContainer">
            <DeleteModal id={id} isActive={isOpen.delete} onClose={() => setIsOpen({...isOpen, delete: !isOpen.delete})} handleDelete={deleteStudent} type="student"/>
             <StudentEditModal isActive={isOpen.edit}  onClose={() => setIsOpen({...isOpen, edit: !isOpen.edit})} studentId={id}/>

            <img src={bg} alt="background" className="card-bg"/>
            <div className="infoCard">
                <div className="infoCardBanner"/>

                <div className="infoCardTop">
                    <div className="infoCardTopLeft">
                        <div className="infoCardTopPhoto">
                            <img src={photo} alt="profile photo"/>
                        </div>
                        <div className="infoCardUtils">
                            <p>{student?.studentName}</p>
                            <span>age: {student?.studentAge}</span>
                        </div>
                    </div>
                </div>

                <div className="infoCardContent">

                    <div className="infoCardContent-section">
                        <p>Class:</p>
                        <span>{student?.class?.className}</span>
                    </div>

                    <div className="infoCardContent-section">
                        <p>Courses (total: {student?.courses?.length}):</p>
                        <p>
                            {student?.courses?.length > 0 ? student?.courses.map((course, index) => (
                                <InfoCardTag key={index} href={`/courses`}
                                             textColor={course.courseColor}>{course.courseName}</InfoCardTag>
                            )) : <InfoCardTag textColor={"red"}>Student has not any courses.</InfoCardTag>}
                        </p>
                    </div>

                </div>

                <div className="infoCardFooter">
                    <div className="infoCardFooterSection">
                        <button onClick={() => navigate("/students")}>
                            <img src={arrowLeft}/>
                            <p>Return Back</p>
                        </button>
                    </div>

                    <div className="infoCardFooterButtons">
                        <InfoButtons bgColor="#F1F1F1" textcolor="#23262F" onClick={() => setIsOpen({...isOpen, edit: !isOpen.edit})}>Edit</InfoButtons>
                        <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true}
                                     onClick={() => setIsOpen({...isOpen, delete: !isOpen.delete})}>Delete</InfoButtons>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default StudentInfo;