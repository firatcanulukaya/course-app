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
import StudentEditModal from "./StudentEditModal";
import timesIcon from "../../assets/img/times.svg";

const StudentInfo = () => {
    const {serverLink, coursesData, setCoursesData, setClassesData, setStudentsData, studentsData} = useContext(mainContext)
    const navigate = useNavigate();
    const {id} = useParams();

    const [student, setStudent] = useState({})
    const [isOpen, setIsOpen] = useState({
        delete: false,
        edit: false
    })
    const [studentIndex, setStudentIndex] = useState(0)

    useEffect(() => {
        axios.get(`${serverLink}/api/student/getAll`)
            .then(res => {
                setStudentsData(res.data)
            })
            .catch(err => console.log(err))
    }, [serverLink, studentsData])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/course/getAll`);
            setCoursesData(response.data);
        };
        fetchData();
    }, [serverLink, coursesData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/class/getAll`);
            setClassesData(response.data);
        };
        fetchData();
    }, [serverLink, setClassesData]);

    useEffect(() => {
        const student = studentsData.find(student => student.id === parseInt(id))
        setStudentIndex(studentsData.indexOf(student))
        setStudent(student)
    }, [studentsData, id])

    const deleteStudent = (id) => {
        axios.delete(`${serverLink}/api/student/delete/${id}`)
            .then(res => navigate("/students"))
            .catch(err => console.log(err))
    }

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
                        setStudent(res.data)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="infoCardContainer">
            <DeleteModal id={id} isActive={isOpen.delete} onClose={() => setIsOpen({...isOpen, delete: !isOpen.delete})}
                         handleDelete={deleteStudent} type="student"/>
            <StudentEditModal isActive={isOpen.edit} onClose={() => setIsOpen({...isOpen, edit: !isOpen.edit})}
                              studentId={id} indexID={studentIndex}/>

            <img src={bg} alt="background" className="card-bg"/>
            <div className="infoCard">
                <div className="infoCardBanner"/>

                <div className="infoCardTop">
                    <div className="infoCardTopLeft">
                        <div className="infoCardTopPhoto">
                            <img src={photo} alt="profile photo"/>
                        </div>
                        <div className="infoCardUtils">
                            <p>{student?.studentName?.length > 50 ? student?.studentName.substr(0, 50) : student?.studentName}</p>
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

                        <ul>
                            <li className="student-table-li">
                                {student?.courses?.length > 0 ? student?.courses.map((course, index) => (
                                    <CourseBadge hex={course.courseColor} key={index}>
                                        <a href={`/course/${course.id}`}>{course.courseName.length < 20 ? course.courseName : course.courseName.substr(0, 20) + "..."}</a>
                                        <button className="tooltip"
                                                data-tip={`Remove ${course.courseName} course from student`}
                                                onClick={() => removeCourse(student?.id, course.id)}>
                                            <img src={timesIcon} style={{mixBlendMode: "luminosity"}} alt="times icon"/></button>
                                    </CourseBadge>
                                )) : <InfoCardTag textColor={"red"}>Student has not any courses.</InfoCardTag>}
                            </li>
                        </ul>
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

export default StudentInfo;