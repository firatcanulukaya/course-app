import editIcon from "../assets/img/edit.svg";
import deleteIcon from "../assets/img/delete.svg";
import Modal from "./StudentEditModal";
import {useContext, useState} from "react";
import mainContext from "../MainContext";

const StudentList = () => {
    const {veri, setVeri} = useContext(mainContext)

    const [indexID, setIndexID] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const studentIndex = (indexID) => {
        setIndexID(indexID);
        setIsOpen(!isOpen);
    }

    const deleteStudent = (id) => {
        fetch(`http://localhost:3001/d/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setVeri(veri.filter((item) => item.id !== id));
                }
            })
            .catch((error) => console.log(error));
    }

    return(

        <>
            <Modal
                studentIndex={studentIndex} onClose={() => {
                setIsOpen(false);
                setIndexID(0);
            }}
                indexID={indexID} isActive={isOpen}/>
        <div className="table-container">

            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table">

                            <div className="row header">
                                <div className="cell">
                                    ID
                                </div>
                                <div className="cell">
                                    Student Info
                                </div>
                                <div className="cell">
                                    Courses
                                </div>
                                <div className="cell">

                                </div>

                            </div>

                            {veri.map((item, index) => (
                                <div className="row" key={index}>
                                    <div className="cell" data-title="ID">
                                        {item.id}
                                    </div>
                                    <div className="cell" data-title="Student Info">
                                        <a href={`kgetir/${item.id}`}>
                                            {
                                                item.studentName.length < 20 ? item.studentName : item.studentName.substr(0, 20) + "..."
                                            }
                                        </a>
                                        <p>{item.studentClassName.length < 20 ? item.studentClassName : item.studentClassName.substr(0, 5) + "..."} {item.studentInfo.length < 20 ? item.studentInfo : item.studentInfo.substr(0, 15) + "..."}</p>
                                    </div>
                                    <div className="cell" data-title="Courses">

                                        <ul>
                                            <li>
                                                <a href="#">Course 1</a>
                                                <a href="#">Course 2</a>
                                                <a href="#">Course 3</a>
                                            </li>
                                        </ul>

                                    </div>
                                    <div className="cell" data-title="Edit">
                                        <img src={editIcon} onClick={() => {
                                            setIsOpen(true);
                                            studentIndex(index)
                                        }}

                                        />
                                        <img src={deleteIcon} onClick={() => deleteStudent(item.id)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default StudentList;
