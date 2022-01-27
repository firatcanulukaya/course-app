import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";
import axios from "axios";

const StudentEditModal = ({indexID, isActive, onClose, studentId}) => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        classesData
    } = useContext(mainContext)

    const [studentValues, setStudentValues] = useState({
        name: "",
        age: ""
    })

    const saveData = () => {
        var config = {
            method: 'patch',
            url: `http://localhost:3001/api/student/edit/${studentId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "studentName": studentValues.name,
                "studentAge": studentValues.age
            }),
        };

        axios(config)
            .then((response) =>  {
                setStudentsData(studentsData.map(student => {
                    if (student.id === studentId) {
                        student.studentName = studentValues.name
                        student.studentAge = studentValues.age
                    }
                    return student
                }))
                onClose()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Student</h2>
                <button className="studentModalclose" onClick={() => onClose()}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) =>{ e.preventDefault(); saveData() }}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-33">
                                <label className="studentModalLabel">Name</label>
                                <input type="text" className="studentModalInput" placeholder="type..." value={studentValues.name} onChange={e => setStudentValues({...studentValues, name: e.target.value})}/>

                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Age</label>
                                <input type="number" className="studentModalInput" maxLength="2" placeholder="type..." value={studentValues.age} onChange={e => setStudentValues({...studentValues, age: e.target.value})}/>

                            </div>
                            {/*<div className="col-33">*/}
                            {/*    <label className="studentModalLabel">Class</label>*/}
                            {/*    <select className="studentModalInput">*/}
                            {/*        <option value={studentsData[indexID].classId}>{studentsData[indexID]?.class.className}</option>*/}
                            {/*        {classesData.map((item, index) => {*/}
                            {/*            if (item.className !== studentsData[indexID]?.class.className) {*/}
                            {/*                return (*/}
                            {/*                    <option key={index} value={item.className}>{item.className}</option>*/}
                            {/*                )*/}
                            {/*            }*/}
                            {/*        })}*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff">
                        Save Changes
                    </ModalFooterBtn>
                </div>
            </form>

        </div>
    )
}

export default StudentEditModal;