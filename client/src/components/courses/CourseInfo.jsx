import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import DeleteModal from "../DeleteModal";
import mainContext from "../../MainContext";
import axios from "axios";
import {CourseBadge, InfoButtons, InfoCardTag} from "../../styledComponents";
import bg from "../../assets/img/bg4.svg";
import photo from "../../assets/img/photo.svg";
import arrowLeft from "../../assets/img/arrowLeft.svg"
import {useNavigate} from "react-router-dom";
import CourseEditModal from "./CourseEditModal";
import timesIcon from "../../assets/img/times.svg";
import {InfoBanner} from "../../styledComponents";

const CourseInfo = () => {
    const {serverLink, setCoursesData, coursesData, setClassesData, setStudentsData, studentsData} = useContext(mainContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [course, setCourse] = useState({})
    const [isOpen, setIsOpen] = useState({
        delete: false,
        edit: false
    })

    useEffect(() => {
        axios.get(`${serverLink}/api/course/getAll`)
            .then(res => {
                setCoursesData(res.data)
            })
            .catch(err => console.log(err))
    }, [serverLink, coursesData])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/student/getAll`);
            setStudentsData(response.data);
        };
        fetchData();
    }, [serverLink, studentsData]);

    useEffect(() => {
        const course = coursesData.find(course => course.id === parseInt(id))
        setCourse(course)
    }, [coursesData, id])

    const deleteCourse = (id) => {
        axios.delete(`${serverLink}/api/course/delete/${id}`)
            .then(res => navigate("/courses"))
            .catch(err => console.log(err))
    }

    const removeStudent = (courseId, studentId) => {
        axios.delete(`${serverLink}/api/course/removeStudentFromCourse`, {
            data: {
                studentId: studentId,
                courseId: courseId
            }
        })
            .then(() => {
                axios.get(`${serverLink}/api/course/get/${courseId}`)
                    .then(res => {
                        setCourse(res.data)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="infoCardContainer">
            <DeleteModal id={id} isActive={isOpen.delete} onClose={() => setIsOpen({...isOpen, delete: !isOpen.delete})}
                         handleDelete={deleteCourse} type="course"/>
            <CourseEditModal isActive={isOpen.edit} onClose={() => setIsOpen({...isOpen, edit: !isOpen.edit})}
                             courseId={id}/>

            <img src={bg} alt="background" className="card-bg"/>
            <div className="infoCard">
                <InfoBanner bgColor={course?.courseColor}/>

                <div className="infoCardTop">
                    <div className="infoCardTopLeft">
                        <div className="infoCardTopPhoto">
                            <img src={photo} alt="profile photo"/>
                        </div>
                        <div className="infoCardUtils">
                            <p>{course?.courseName?.length > 50 ? course?.courseName.substr(0, 50) : course?.courseName}</p>
                            <span>Created at: {new Date(course?.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</span>
                        </div>
                    </div>
                </div>

                <div className="infoCardContent">

                    <div className="infoCardContent-section">
                        <p>Students (total: {course?.students?.length}):</p>

                        <ul>
                            <li className="student-table-li">
                                {course?.students?.length > 0 ? course?.students.map((student, index) => (
                                    <CourseBadge hex={course.courseColor} key={index}>
                                        <a href={`/student/${student.id}`}>{student.studentName.length < 20 ? student.studentName : student.studentName.substr(0, 20) + "..."}</a>
                                        <button className="tooltip"
                                                data-tip={`Remove ${student.studentName} student from course`}
                                                onClick={() => removeStudent(course?.id, student.id)}>
                                            <img src={timesIcon} style={{mixBlendMode: "luminosity"}} alt="times icon"/></button>
                                    </CourseBadge>
                                )) : <InfoCardTag textColor={"red"}>Course has not any students.</InfoCardTag>}
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="infoCardFooter">
                    <div className="infoCardFooterSection">
                        <button onClick={() => navigate("/courses")}>
                            <img src={arrowLeft}/>
                            <p>Return Back</p>
                        </button>
                    </div>

                    <div className="infoCardFooterButtons">
                        <InfoButtons bgColor="#F1F1F1" textcolor="#23262F"
                                     onClick={() => setIsOpen({...isOpen, edit: !isOpen.edit})}>Edit</InfoButtons>
                        <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true}
                                     onClick={() => setIsOpen({...isOpen, delete: !isOpen.delete})}>Delete</InfoButtons>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default CourseInfo;