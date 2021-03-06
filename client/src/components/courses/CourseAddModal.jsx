import xIcon from "../../assets/img/xIcon.svg";
import {ModalFooterBtn} from "../../styledComponents";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import Select from "react-select";
import axios from "axios";
import {getAll, handleChange} from "../../utils/utilFunctions";

const CourseAddModal = ({isActive, onClose}) => {
    const {coursesData, setCoursesData, studentsData, setStudentsData, serverLink} = useContext(mainContext)
    const [courseValues, setCourseValues] = useState({
        courseName: "",
        studentIds: []
    });

    const randomHexGenerator = () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex}`;
    }

    useEffect(() => {
        getAll(serverLink, setStudentsData, "student");
    }, [])

    const mapStudents = {
        options: studentsData.map((item) => {
            return {
                value: item.id,
                label: item.studentName
            }
        })
    }


    const handleSave = (courseValues) => {
        axios.post(`${serverLink}/api/course/create`, {
            courseName: courseValues.courseName,
            courseColor: randomHexGenerator(),
        })
            .then(res => {
                axios.post(`${serverLink}/api/course/addMultipleStudentsToCourse`, {
                    courseId: res.data.course.id,
                    studentIds: courseValues.studentIds
                })
                    .then(() => {
                        axios.get(`${serverLink}/api/course/getAll`)
                            .then(res => {
                                setCoursesData(res.data);
                            })
                    })
                    .catch(err => console.log(err))
                setCourseValues({
                    courseName: "",
                    studentIds: []
                })
                onClose();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={"studentModal " + (isActive && "active")} id="studentAddModal">
            <div className="studentModalheader">
                <h2>Create New Course</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose();
                }}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSave(courseValues)
            }}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="studentModalLabel">Course Name</label>
                                <input
                                    type="text"
                                    className="studentModalInput"
                                    required
                                    placeholder="type..."
                                    value={courseValues.courseName}
                                    name={'courseName'}
                                    onChange={(e) => handleChange(e, setCourseValues, courseValues)}
                                />
                            </div>

                            <div className="col">
                                <label className="studentModalLabel">Student(s)</label>
                                <Select options={mapStudents.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setCourseValues({
                                            ...courseValues,
                                            studentIds: e.map((item) => item.value)
                                        })}
                                        value={courseValues.studentIds ? courseValues.studentIds.map((item) => {
                                            return {
                                                value: item,
                                                label: studentsData.find((student) => student.id === item).studentName
                                            }
                                        }) : []}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#fff" textColor="#374151" isStroke={true} strokeColor="#E5E7EB"
                                    onClick={() => onClose()} type="button" tabIndex="1">
                        Cancel
                    </ModalFooterBtn>
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff" type="submit">
                        Save Changes
                    </ModalFooterBtn>
                </div>
            </form>
        </div>
    )
}

export default CourseAddModal;