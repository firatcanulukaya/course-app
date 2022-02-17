import xIcon from "../../assets/img/xIcon.svg";
import {ModalFooterBtn} from "../../styledComponents";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import Select from "react-select";
import axios from "axios";
import {getAll} from "../../utils/utilFunctions";

const ClassAddModal = ({isActive, onClose}) => {
    const {classesData, setClassesData, studentsData, setStudentsData, serverLink} = useContext(mainContext)
    const [classesValues, setClassesValues] = useState({
        className: "",
        studentIds: []
    });

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

    const handleSave = (classesValues) => {
        axios.post(`${serverLink}/api/class/create`, {
            className: classesValues.className
        }).then(res => {
            axios.patch(`${serverLink}/api/class/addStudents`, {
                classId: res.data.class.id,
                studentIds: classesValues.studentIds
            }).then(() => {
                axios.get(`${serverLink}/api/class/getAll`).then(res => {
                    setClassesData(res.data);
                })
                onClose();
            })
        });
    }

    return (
        <div className={"studentModal " + (isActive && "active")} id="studentAddModal">
            <div className="studentModalheader">
                <h2>Create New Class</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose();
                }}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSave(classesValues)
            }}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="studentModalLabel">Class Name</label>
                                <input
                                    type="text"
                                    className="studentModalInput"
                                    required
                                    placeholder="type..."
                                    value={classesValues.courseName}
                                    onChange={(e) => {
                                        setClassesValues({...classesValues, className: e.target.value})
                                    }}
                                />
                            </div>

                            <div className="col">
                                <label className="studentModalLabel">Student(s)</label>
                                <Select options={mapStudents.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setClassesValues({
                                            ...classesValues,
                                            studentIds: e.map((item) => item.value)
                                        })}
                                        value={classesValues.studentIds ? classesValues.studentIds.map((item) => {
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

export default ClassAddModal;