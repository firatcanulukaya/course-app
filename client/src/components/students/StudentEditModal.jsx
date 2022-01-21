import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";

const StudentEditModal = ({indexID, isActive, onClose}) => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        studentName,
        setStudentName,
        studentInfo,
        setStudentInfo,
        studentClass,
        setStudentClass
    } = useContext(mainContext)

    setStudentName(studentsData[indexID]?.studentName);
    setStudentInfo(studentsData[indexID]?.studentInfo);
    setStudentClass(studentsData[indexID]?.studentClassName);

    const [studentClasses, setStudentClasses] = useState([]);

    const editStudent = (studentName, studentInfo, studentClass, id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            studentName: studentName,
            studentInfo: studentInfo,
            studentClassName: studentClass,
        });

        var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${serverLink}/api/student/editStudent/${id}`, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    setStudentsData(studentsData.map((item, index) => {
                        if (index === indexID) {
                            return {
                                ...item,
                                studentName: studentName,
                                studentInfo: studentInfo,
                                studentClassName: studentClass,
                            }
                            console.log(item)
                        } else {
                            return item
                        }
                    }))
                    onClose()
                    setStudentName("");
                    setStudentInfo("");
                    setStudentClass("");
                }
            })
            .catch((error) => console.log("error", error));
    }

    fetch(`${serverLink}/api/student/getStudentClasses`)
        .then((response) => response.json())
        .then((data) => {
            setStudentClasses(data);
        })
        .catch((error) => console.log("error", error));

    //TODO düzenleme yapıldığında kaydetmiyor

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Student</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose()
                    setStudentName("");
                    setStudentInfo("");
                    setStudentClass("");
                }}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col-33">
                                <label className="studentModalLabel">Name</label>
                                <input type="text" className="studentModalInput" required
                                       placeholder={studentsData[indexID]?.studentName}
                                       onChange={(e) => setStudentName(e.target.value)}/>
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Age</label>
                                <input type="number" className="studentModalInput" maxLength="2" required
                                       placeholder={studentsData[indexID]?.studentInfo}
                                       onChange={(e) => setStudentInfo(e.target.value)}/>
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Class</label>
                                <select
                                    className="studentModalInput"
                                    required
                                    onChange={(e) => setStudentClass(e.target.value)}
                                >
                                    <option value="">{studentsData[indexID]?.studentClassName}</option>
                                    {studentClasses.map((item) => {
                                        if (item.className !== studentsData[indexID]?.studentClassName) {
                                            return (
                                                <option key={item.id} value={item.className}>{item.className}</option>
                                            )
                                        }
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff"
                                    onClick={() => editStudent(studentName, studentInfo, studentClass, studentsData[indexID].id) }>
                        Save Changes
                    </ModalFooterBtn>
                </div>

        </div>
    )
}

export default StudentEditModal;