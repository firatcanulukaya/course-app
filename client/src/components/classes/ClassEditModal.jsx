import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents";
import axios from "axios";
import Select from 'react-select'
import {getAll, handleChange} from "../../utils/utilFunctions";

const ClassEditModal = ({indexID, isActive, onClose, classId}) => {
    const { classesData, setClassesData, studentsData, setStudentsData, serverLink } = useContext(mainContext)
    const [classValues, setClassValues] = useState({
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

    const saveData = () => {

        axios.patch(`${serverLink}/api/class/edit/${classId}`, {
            "className": classValues.className.length > 0 ? classValues.className : classesData[indexID].className,
        })
            .then((response) => {
                axios.patch(`${serverLink}/api/class/addStudents`, {
                    "classId": classId,
                    "studentIds": classValues.studentIds
                }).then((res) => {
                    axios.get(`${serverLink}/api/class/getAll`)
                        .then((response) => {
                            setClassesData(response.data);
                        })
                })
                onClose()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if(!isActive){
            setClassValues({
                className: "",
                studentIds: []
            })
        }
    }, [isActive])

    return(
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Class</h2>
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
                                       value={classValues.className}
                                       name={'className'}
                                       onChange={(e) => handleChange(e, setClassValues, classValues)}/>

                            </div>

                            <div className="col">
                                <label className="studentModalLabel">Course</label>
                                <Select options={mapStudents.options} isMulti isSearchable autoFocus
                                        onChange={(e) => setClassValues({
                                            ...classValues,
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

export default ClassEditModal;