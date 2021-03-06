import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import StudentAddModal from "./StudentAddModal";
import StudentList from "./StudentList";
import StudentDeleteModal from "./StudentDeleteModal";
import bg from "../../assets/img/bg2.svg";
import plus from "../../assets/img/plus.svg";
import deleteIcon from "../../assets/img/delete.svg";
import {getAll, handleDelete} from "../../utils/utilFunctions";

const Students = () => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        setIsModalDeleteBtnDisabled,
        setCoursesData,
        setClassesData,
        setIsBlur
    } = useContext(mainContext)
    const [isOpen, setIsOpen] = useState({
        add: false,
        delete: false
    })

    useEffect(() => {
        getAll(serverLink, setStudentsData, "student");
        getAll(serverLink, setCoursesData, "course");
        getAll(serverLink, setClassesData, "class");
    }, [])

    const deleteStudent = (id) => {
        handleDelete(serverLink, id, setStudentsData, studentsData, "student");
    }

return (
    <div className="students-container">
        <img src={bg} alt="background" className="homepage-bg"/>
        <StudentAddModal
            onClose={() => {
                setIsOpen({...isOpen, add: false});
                setIsBlur(false);
            }} isActive={isOpen.add}
        />

        <StudentDeleteModal
            onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true});
                setIsBlur(false);
            }}
            isActive={isOpen.delete}
        />

        <button className="add-students tooltip" data-tip="Add New Student" onClick={() => {
            setIsOpen({...isOpen, add: !isOpen.add});
            setIsBlur(true);
        }}>
            <img src={plus} alt="plus" className="plus"/>
        </button>

        {studentsData.length === 0 ? "" :
            <button className="add-students delete-students tooltip" data-tip="Delete All Students"
                    onClick={() => {
                        setIsOpen({...isOpen, delete: !isOpen.delete});
                        isOpen.delete ? setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true}) : setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true})
                        setIsBlur(true)
                    }}>
                <img src={deleteIcon} alt="plus" className="plus"/>
            </button>
        }

        {studentsData.length === 0 ? <p className="studentsModalError">Nothing to show about students.</p> :
            <StudentList deleteStudent={deleteStudent}/>}

    </div>
)
}

export default Students;