import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import ClassList from "./ClassList";
import ClassAddModal from "./ClassAddModal";
import ClassDeleteModal from "./ClassDeleteModal";
import plus from "../../assets/img/plus.svg";
import bg from "../../assets/img/bg1.svg";
import deleteIcon from "../../assets/img/delete.svg";
import axios from "axios";

const Classes = () => {
    const {classesData, setClassesData, setStudentsData, serverLink, setIsModalDeleteBtnDisabled} = useContext(mainContext);
    const [isOpen, setIsOpen] = useState({
        add: false,
        delete: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/class/getAll`);
            setClassesData(response.data);
        };
        fetchData();
    }, [serverLink, setClassesData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/student/getAll`);
            setStudentsData(response.data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    const deleteCourse = (id) => {
        axios.delete(`${serverLink}/api/class/delete/${id}`)
            .then(() => {
                const newClassesData = classesData.filter(classes => classes.id !== id);
                setClassesData(newClassesData);
            })
            .catch(error => console.log(error));
    }

    return(
        <div className="students-container">
            <img src={bg} alt="background" className="homepage-bg"/>

            <ClassAddModal
                onClose={() => {
                    setIsOpen({...isOpen, add: false});
                }} isActive={isOpen.add}
            />

            <ClassDeleteModal
                onClose={() => {
                    setIsOpen({...isOpen, delete: false});
                    setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, classes: true});
                }}
                isActive={isOpen.delete}
            />

            <button className="add-students tooltip blur" data-tip="Add New Course" onClick={() => {
                setIsOpen({...isOpen, add: !isOpen.add});
            }}>
                <img src={plus} alt="plus" className="plus"/>
            </button>

            {classesData.length === 0 ? "" :
                <button className="add-students delete-students tooltip" data-tip="Delete All Classes"
                        onClick={() => {
                            setIsOpen({...isOpen, delete: !isOpen.delete});
                            isOpen.delete ? setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, classes: true}) : setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, classes: true})
                        }}>
                    <img src={deleteIcon} alt="plus" className="plus"/>
                </button>
            }

            {classesData.length === 0 ? <p className="studentsModalError">Nothing to show about classes.</p> :
                <ClassList deleteClass={deleteCourse}/>}
        </div>
    )
}

export default Classes;