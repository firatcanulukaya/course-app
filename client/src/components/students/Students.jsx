import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import axios from "axios";
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
        setIsModalDeleteBtnDisabled,
        setCoursesData
    } = useContext(mainContext)
    const [isOpen, setIsOpen] = useState({
        add: false,
        delete: false
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${serverLink}/api/student/getAll`);
            setStudentsData(result.data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/course/getAll`);
            setCoursesData(response.data);
        };
        fetchData();
    }, [serverLink, setCoursesData]);

    const deleteStudent = (id) => {
        axios.delete(`${serverLink}/api/student/delete/${id}`)
            .then(() => {
                const newStudentsData = studentsData.filter(student => student.id !== id);
                setStudentsData(newStudentsData);
            })
            .catch(error => console.log(error));
    };

return (
    <div className="students-container">
        <img src={bg} alt="background" className="homepage-bg"/>
        <StudentAddModal
            onClose={() => {
                setIsOpen({...isOpen, add: false});
            }} isActive={isOpen.add}
        />

        <StudentDeleteModal
            onClose={() => {
                setIsOpen({...isOpen, delete: false});
                setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true});
            }}
            isActive={isOpen.delete}
        />

        <button className="add-students tooltip" data-tip="Add New Student" onClick={() => {
            setIsOpen({...isOpen, add: !isOpen.add});
        }}>
            <img src={plus} alt="plus" className="plus"/>
        </button>

        {studentsData.length === 0 ? "" :
            <button className="add-students delete-students tooltip" data-tip="Delete All Students"
                    onClick={() => {
                        setIsOpen({...isOpen, delete: !isOpen.delete});
                        isOpen.delete ? setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true}) : setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, student: true})
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