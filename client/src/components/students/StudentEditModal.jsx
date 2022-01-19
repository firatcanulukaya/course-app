import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";

const StudentEditModal = ({indexID, isActive, onClose}) => {
    const {veri, setVeri, serverLink} = useContext(mainContext)

    const [studentName, setStudentName] = useState(veri[indexID]?.studentName);
    const [studentInfo, setStudentInfo] = useState(veri[indexID]?.studentInfo);
    const [studentClass, setStudentClass] = useState(veri[indexID]?.studentClassName);

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
                    setVeri(veri.map((item, index) => {
                        if (index === indexID) {
                            return {
                                ...item,
                                studentName: studentName,
                                studentInfo: studentInfo,
                                studentClassName: studentClass,
                            }
                        } else {
                            return item
                        }
                    }))
                    onClose()
                }
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Edit Student</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose()
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
                                       placeholder={veri[indexID]?.studentName}
                                       onChange={(e) => setStudentName(e.target.value)}/>
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Info</label>
                                <input type="text" className="studentModalInput" required
                                       placeholder={veri[indexID]?.studentInfo}
                                       onChange={(e) => setStudentInfo(e.target.value)}/>
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Class</label>
                                <input type="text" className="studentModalInput" required
                                       placeholder={veri[indexID]?.studentClassName}
                                       onChange={(e) => setStudentClass(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff"
                            onClick={() => editStudent(studentName, studentInfo, studentClass, veri[indexID].id)}>
                        Save Changes
                    </ModalFooterBtn>
                </div>

        </div>
    )
}

export default StudentEditModal;