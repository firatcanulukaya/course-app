import xIcon from "../../assets/img/xIcon.svg";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents";
import axios from "axios";
import Select from "react-select";
import {getAll, handleChange} from "../../utils/utilFunctions";

const StudentAddModal = ({isActive, onClose}) => {
    const {setStudentsData, classesData, setClassesData, coursesData, setCoursesData, serverLink} = useContext(mainContext);
    const [studentValues, setStudentValues] = useState({
        name: "",
        age: "",
        classId: "0",
        courseIds: []
    });

    useEffect(() => {
        getAll(serverLink, setStudentsData, "student");
        getAll(serverLink, setCoursesData, "course");
        getAll(serverLink, setClassesData, "class");
    }, [isActive]);

    const mapCourses = {
        options: coursesData.map((item) => {
            return {
                value: item.id,
                label: item.courseName
            }
        })
    }


    const sendData = (studentName, studentAge, studentClassId) => {
        axios.post(`${serverLink}/api/student/create`, {
            studentName: studentName,
            studentAge: studentAge,
            classId: studentClassId
        }).then((res) => {
            axios.post(`${serverLink}/api/course/addStudentToCourse`, {
                studentId: res.data.id,
                courseIds: studentValues.courseIds
            })
                .then(() => {
                    axios.get(`${serverLink}/api/student/getAll`).then(res => {
                        setStudentsData(res.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

            setStudentValues({
                name: "",
                age: 0,
                classId: 0
            });
            onClose();
        });
    };

    return (
        <div className={"studentModal " + (isActive && "active")} id="studentAddModal">

            <div className="studentModalheader">
                <h2>Add Student</h2>
                <button
                    className="studentModalclose"
                    onClick={() => {
                        onClose();
                    }}
                >
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault()
                sendData(studentValues.name, studentValues.age, studentValues.classId)
            }}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-33">
                                <label className="studentModalLabel">Name</label>
                                <input
                                    type="text"
                                    className="studentModalInput"
                                    required
                                    placeholder="type..."
                                    value={studentValues.name}
                                    name={'name'}
                                    onChange={(e) => handleChange(e, setStudentValues, studentValues)}
                                />
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Age</label>
                                <input
                                    type="number"
                                    className="studentModalInput"
                                    required
                                    placeholder="type..."
                                    value={studentValues.age}
                                    name={'age'}
                                    onChange={(e) => handleChange(e, setStudentValues, studentValues)}
                                />
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Class</label>

                                <select
                                    className="studentModalInput"
                                    name={'classId'}
                                    onChange={(e) => handleChange(e, setStudentValues, studentValues)}
                                >
                                    <option value="">Select Class</option>
                                    {classesData.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.className}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col">
                                <label className="studentModalLabel">Course</label>
                                <Select options={mapCourses.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setStudentValues({
                                            ...studentValues,
                                            courseIds: e.map((item) => item.value)
                                        })}
                                        value={studentValues.courseIds ? studentValues.courseIds.map((item) => ({
                                            value: item,
                                            label: mapCourses.options.find((option) => option.value === item).label
                                        })) : []}
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
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff" type="submit" tabIndex="0">
                        Save Changes
                    </ModalFooterBtn>
                </div>
            </form>
        </div>
    );
};

export default StudentAddModal;
