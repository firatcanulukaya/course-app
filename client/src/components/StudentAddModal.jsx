import xIcon from "../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../MainContext";

const StudentAddModal = ({isActive, onClose}) => {
    const {veri, setVeri} = useContext(mainContext)

    const [studentName, setStudentName] = useState("");
    const [studentInfo, setStudentInfo] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentNewID, setStudentNewID] = useState([]);

    const sendData = (studentName, studentInfo, studentClassName) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            studentName: studentName,
            studentInfo: studentInfo,
            studentClassName: studentClassName,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:3001/addStudent", requestOptions)
            .then((response) => {
                    if (response.status === 200) {

                        fetch("http://localhost:3001/getAllStudentsID")
                            .then((response) => response.json())
                            .then((json) => setStudentNewID(json))
                            .catch((error) => console.log(error));

                        setVeri([...veri, {
                            studentName: studentName,
                            studentInfo: studentInfo,
                            studentClassName: studentClassName,
                            id: studentNewID.slice(-1)[0].id + 1
                        }])
                        onClose()
                    }
                    response.json()
                }
            )
            .catch((error) => console.log("error", error));
    }

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Add Student</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose()
                }}>
                    <img src={xIcon}/>
                </button>
            </div>

            <div className="studentModalContent">

                <div className="container">
                    <div className="row">
                        <div className="col-33">
                            <label className="studentModalLabel">Name</label>
                            <input type="text" className="studentModalInput" required placeholder="type..."
                                   onChange={(e) => setStudentName(e.target.value)}/>
                        </div>
                        <div className="col-33">
                            <label className="studentModalLabel">Info</label>
                            <input type="text" className="studentModalInput" required placeholder="type..."
                                   onChange={(e) => setStudentInfo(e.target.value)}/>
                        </div>
                        <div className="col-33">
                            <label className="studentModalLabel">Class</label>
                            <input type="text" className="studentModalInput" required placeholder="type..."
                                   onChange={(e) => setStudentClass(e.target.value)}/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="studentModalfooter">
                <button className="studentModalButton" type="submit"
                        onClick={() => sendData(studentName, studentInfo, studentClass)}>
                    Save Changes
                </button>
            </div>

        </div>
    )
}

export default StudentAddModal;