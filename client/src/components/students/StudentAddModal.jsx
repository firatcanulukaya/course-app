import xIcon from "../../assets/img/xIcon.svg";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";
import axios from "axios";

const StudentAddModal = ({isActive, onClose}) => {
    const {studentsData, setStudentsData, classesData, setClassesData, serverLink} = useContext(mainContext);
    const [studentValues, setStudentValues] = useState({
        name: "",
        age: 0,
        classId: 0
    });
    const [studentNewID, setStudentNewID] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/student/getAll`);
            setStudentNewID(response.data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/class/getAll`);
            setClassesData(response.data);
        };
        fetchData();
    }, [serverLink, setClassesData]);


    const sendData = (studentName, studentAge, studentClassId) => {
        axios.post(`${serverLink}/api/student/create`, {
            studentName: studentName,
            studentAge: studentAge,
            classId: studentClassId
        }).then(res => {

            axios.get(`${serverLink}/api/student/getAll`).then(res => {
                setStudentsData(res.data);
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
                                    onChange={e => setStudentValues({...studentValues, name: e.target.value})}
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
                                    onChange={e => setStudentValues({...studentValues, age: parseInt(e.target.value)})}
                                />
                            </div>
                            <div className="col-33">
                                <label className="studentModalLabel">Class</label>

                                <select
                                    className="studentModalInput"
                                    required
                                    onChange={(e) => setStudentValues({
                                        ...studentValues,
                                        classId: parseInt(e.target.value)
                                    })}
                                >
                                    <option value="">Select Class</option>
                                    {classesData.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.className}
                                        </option>
                                    ))}
                                </select>
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
