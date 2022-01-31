import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents";
import axios from "axios";
import Select from 'react-select'

const CourseEditModal = ({indexID, isActive, onClose, courseId}) => {
    const { coursesData, setCoursesData, studentsData, setStudentsData, serverLink } = useContext(mainContext)
    const [courseValues, setCourseValues] = useState({
        courseName: "",
        studentIds: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/student/getAll`);
            setStudentsData(response.data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    const mapStudents = {
        options: studentsData.map((item) => {
            return {
                value: item.id,
                label: item.studentName
            }
        })
    }

    const saveData = () => {
        var config = {
            method: 'patch',
            url: `${serverLink}/api/course/edit/${courseId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "courseName": courseValues.courseName.length > 0 ? courseValues.courseName : coursesData[indexID].courseName,
            }),
        };

        axios(config)
            .then((response) => {
                axios.post(`${serverLink}/api/course/addMultipleStudentsToCourse`, {
                    courseId: courseId,
                    studentIds: courseValues.studentIds
                }).then(() => {
                    axios.get(`${serverLink}/api/course/get/${courseId}`)
                        .then((response) => {
                            setCoursesData(coursesData.map((course) => {
                                if (course.id === courseId) {
                                    return response.data
                                } else {
                                    return course
                                }
                            }))
                        })
                })
                    .catch((error) => {
                        console.log(error);
                    });

                onClose()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if(!isActive){
            setCourseValues({
                courseName: "",
                studentIds: []
            })
        }
    }, [isActive])

    return(
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Course</h2>
                <button className="studentModalclose" onClick={() => onClose()}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                saveData()
            }}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="studentModalLabel">Name</label>
                                <input type="text" className="studentModalInput" placeholder="type..."
                                       value={courseValues.courseName}
                                       onChange={e => setCourseValues({...courseValues, courseName: e.target.value})}/>

                            </div>

                            <div className="col">
                                <label className="studentModalLabel">Course</label>
                                <Select options={mapStudents.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setCourseValues({
                                            ...courseValues,
                                            studentIds: e.map((item) => item.value)
                                        })}/>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#fff" textColor="#374151" isStroke={true} strokeColor="#E5E7EB"
                                    onClick={() => onClose() } type="button">
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

export default CourseEditModal;