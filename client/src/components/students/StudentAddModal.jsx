import xIcon from "../../assets/img/xIcon.svg";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";

const StudentAddModal = ({isActive, onClose}) => {
    const {studentsData, setStudentsData, serverLink} = useContext(mainContext);

    const [studentName, setStudentName] = useState("");
    const [studentInfo, setStudentInfo] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentNewID, setStudentNewID] = useState([]);

    useEffect(() => {
        fetch(`${serverLink}/api/student/getAllStudents`)
            .then((response) => response.json())
            .then((json) => setStudentNewID(json))
            .catch((error) => console.log(error));
    }, []);

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

        fetch(`${serverLink}/api/student/createStudent`, requestOptions)
            .then((response) => {
                fetch(`${serverLink}/api/student/getAllStudents`)
                    .then((response) => response.json())
                    .then((json) => setStudentNewID(json))
                    .catch((error) => console.log(error));
                if (response.status === 200) {
                    setStudentsData([
                        ...studentsData,
                        {
                            studentName: studentName,
                            studentInfo: studentInfo,
                            studentClassName: studentClassName,
                            id:
                                studentNewID.length > 0
                                    ? studentNewID.slice(-1)[0].id + 1
                                    : Number(localStorage.getItem("lastStudentID")) + 1,
                        },
                    ]);
                    onClose();
                    setStudentName("");
                    setStudentInfo("");
                    setStudentClass("");
                    localStorage.setItem(
                        "lastStudentID",
                        studentNewID.length > 0
                            ? studentNewID.slice(-1)[0].id + 1
                            : Number(localStorage.getItem("lastStudentID")) + 1
                    );
                }
                response.json();
            })
            .catch((error) => console.log("error", error));
    };

    const classList = [
        {
            id: 1,
            className: "1. Sınıf"
        },
        {
            id: 2,
            className: "2. Sınıf"
        },
        {
            id: 3,
            className: "3. Sınıf"
        },
        {
            id: 4,
            className: "4. Sınıf"
        },
        {
            id: 5,
            className: "5. Sınıf"
        },
        {
            id: 6,
            className: "6. Sınıf"
        },
        {
            id: 7,
            className: "7. Sınıf"
        },
        {
            id: 8,
            className: "8. Sınıf"
        },
        {
            id: 9,
            className: "9. Sınıf"
        },
        {
            id: 10,
            className: "10. Sınıf"
        },
        {
            id: 11,
            className: "11. Sınıf"
        },
        {
            id: 12,
            className: "12. Sınıf"
        },
    ]

    return (
        <div
            className={"studentModal " + (isActive && "active")}
            id="studentAddModal"
        >
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

            <form>
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
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                        </div>
                        <div className="col-33">
                            <label className="studentModalLabel">Age</label>
                            <input
                                type="number"
                                className="studentModalInput"
                                required
                                placeholder="type..."
                                value={studentInfo}
                                onChange={(e) => setStudentInfo(e.target.value)}
                            />
                        </div>
                        <div className="col-33">
                            <label className="studentModalLabel">Class</label>

                            <select
                                className="studentModalInput"
                                required
                                value={studentClass}
                                onChange={(e) => setStudentClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classList.map((item) => (
                                    <option key={item.id} value={item.className}>
                                        {item.className}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="studentModalfooter">
                <ModalFooterBtn bgColor="#1E40AF" textColor="#fff"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    sendData(studentName, studentInfo, studentClass)
                                }}
                >
                    Save Changes
                </ModalFooterBtn>
            </div>
            </form>
        </div>
    );
};

export default StudentAddModal;
