import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {useParams} from "react-router-dom";
import StudentAddModal from "./StudentAddModal";
import StudentList from "./StudentList";
import StudentDeleteModal from "./StudentDeleteModal";
import bg from "../../assets/img/bg2.svg";
import plus from "../../assets/img/plus.svg";
import deleteIcon from "../../assets/img/delete.svg";

const Students = () => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        setIsDeleteStudentsModalBtnDisabled
    } = useContext(mainContext)
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetch(`${serverLink}/api/student/getAllStudents`)
            .then((response) => response.json())
            .then((json) => {
                setStudentsData(json)
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="students-container">
                <img src={bg} alt="background" className="homepage-bg"/>
                <StudentAddModal
                    onClose={() => {
                        setIsOpen(false);
                    }} isActive={isOpen}
                />

                <StudentDeleteModal
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setIsDeleteStudentsModalBtnDisabled(true);
                    }}
                    isActive={isDeleteModalOpen}
                />

                <button className="add-students tooltip" data-tip="Add New Student" onClick={() => {
                    setIsOpen(!isOpen);
                }}>
                    <img src={plus} alt="plus" className="plus"/>
                </button>

                {studentsData.length === 0 ? "":
                    <button className="add-students delete-students tooltip" data-tip="Delete All Students"
                            onClick={() => {
                                setIsDeleteModalOpen(!isDeleteModalOpen)
                                isDeleteModalOpen ? setIsDeleteStudentsModalBtnDisabled(true) : setIsDeleteStudentsModalBtnDisabled(true)
                            }}>
                        <img src={deleteIcon} alt="plus" className="plus"/>
                    </button>
                }

                {studentsData.length === 0 ? <p className="studentsModalError">Nothing to show about students.</p> :
                    <StudentList/>}
            </div>
        </>
    )
}

export default Students;