import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents";
import axios from "axios";
import Select from 'react-select'

const StudentEditModal = ({indexID, isActive, onClose, studentId}) => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        classesData,
        coursesData
    } = useContext(mainContext)

    const [studentValues, setStudentValues] = useState({
        name: "",
        age: "",
        classId: "",
        courseIds: [],
    })

    const saveData = () => {
        axios.patch(`${serverLink}/api/student/edit/${studentId}`, {
            "studentName": studentValues.name.length > 0 ? studentValues.name : studentsData[indexID].studentName,
            "studentAge": studentValues.age.length > 0 ? studentValues.age : studentsData[indexID].studentAge,
            "classId": studentValues.classId.length > 0 ? studentValues.classId : studentsData[indexID].classId,
        })
            .then((response) => {
                axios.post(`${serverLink}/api/course/addStudentToCourse`, {
                    studentId: studentId,
                    courseIds: studentValues.courseIds
                }).then(() => {
                    axios.get(`${serverLink}/api/student/get/${studentId}`)
                        .then((response) => {
                            setStudentsData(studentsData.map((student) => {
                                if (student.id === studentId) {
                                    return response.data
                                } else {
                                    return student
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

    const mapCourses = {
        options: coursesData.map((item) => {
            return {
                value: item.id,
                label: item.courseName
            }
        })
    }

    useEffect(() => {
        if (!isActive) {
            setStudentValues({
                name: "",
                age: "",
                classId: "",
                courseIds: [],
            })
        }
    }, [isActive])

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Student</h2>
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
                            <div className="col-33">
                                <label className="studentModalLabel">Name - Surname</label>
                                <input type="text" className="studentModalInput" placeholder="type..."
                                       value={studentValues.name}
                                       onChange={e => setStudentValues({...studentValues, name: e.target.value})}/>

                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Age</label>
                                <input type="number" className="studentModalInput" maxLength="2" placeholder="type..."
                                       value={studentValues.age}
                                       onChange={e => setStudentValues({...studentValues, age: e.target.value})}/>

                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Class</label>
                                <select className="studentModalInput"
                                        onChange={e => setStudentValues({...studentValues, classId: e.target.value})}>
                                    <option value="">Select a class</option>
                                    {classesData.map((item, index) => {
                                        <option key={index} value={item.id}>{item.className}</option>
                                    })}
                                </select>
                            </div>


                            <div className="col">
                                <label className="studentModalLabel">Course</label>
                                <Select options={mapCourses.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setStudentValues({
                                            ...studentValues,
                                            courseIds: e.map((item) => item.value)
                                        })}/>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#fff" textColor="#374151" isStroke={true} strokeColor="#E5E7EB"
                                    onClick={() => onClose()} type="button">
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

export default StudentEditModal;