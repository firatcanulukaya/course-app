import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";

const StudentEditModal = ({indexID, isActive, onClose}) => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        classesData
    } = useContext(mainContext)

    const [studentName, setStudentName] = useState("")
    const [studentAge, setStudentAge] = useState("")
    const [classId, setClassId] = useState(0)
    const [student, setStudent] = useState({})

    useEffect(() => {
        setStudentName(studentsData[indexID].name)
        setStudentAge(studentsData[indexID].age)
        setClassId(studentsData[indexID].classId)
        setStudent(studentsData[indexID])
    }, [studentsData, indexID])

    const editStudent = (e) => {
        e.preventDefault()

        const data = {
            name: studentName,
            age: studentAge,
            classId: classId
        }
        fetch(`${serverLink}/api/student/editStudent/${student.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    setStudentsData(studentsData.map(student => {
                        if (student.id === indexID) {
                            return {
                                ...student,
                                ...data
                            }
                        }
                        return student
                    }))
                    onClose()
                }
            })
    }
    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Student</h2>
                <button className="studentModalclose" onClick={() => onClose()}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-33">
                                <label className="studentModalLabel">Name</label>
                                <input type="text" className="studentModalInput" placeholder="type..." />
                                     />
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Age</label>
                                <input type="number" className="studentModalInput" maxLength="2" placeholder="type..."/>
                                      />
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