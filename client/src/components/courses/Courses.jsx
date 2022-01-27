import bg from "../../assets/img/bg4.svg";
import CourseList from "./CourseList";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import CourseAddModal from "./CourseAddModal";
import plus from "../../assets/img/plus.svg";
import deleteIcon from "../../assets/img/delete.svg";

const Courses = () => {
    const {coursesData, setCoursesData, serverLink} = useContext(mainContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${serverLink}/api/course/getAll`);
            const data = await response.json();
            setCoursesData(data);
        };
        fetchData();
    }, [serverLink, setCoursesData]);

    return(
        <div className="students-container">
            <img src={bg} alt="background" className="homepage-bg"/>

            <CourseAddModal
                onClose={() => {
                    setIsOpen(false);
                }} isActive={isOpen}
            />

            {/*<StudentDeleteModal*/}
            {/*    onClose={() => {*/}
            {/*        setIsDeleteModalOpen(false);*/}
            {/*        setIsDeleteStudentsModalBtnDisabled(true);*/}
            {/*    }}*/}
            {/*    isActive={isDeleteModalOpen}*/}
            {/*/>*/}

            <button className="add-students tooltip blur" data-tip="Add New Course" onClick={() => {
                setIsOpen(!isOpen);
            }}>
                <img src={plus} alt="plus" className="plus"/>
            </button>

            {/*{studentsData.length === 0 ? "":*/}
            {/*    <button className="add-students delete-students tooltip" data-tip="Delete All Students"*/}
            {/*            onClick={() => {*/}
            {/*                setIsDeleteModalOpen(!isDeleteModalOpen)*/}
            {/*                isDeleteModalOpen ? setIsDeleteStudentsModalBtnDisabled(true) : setIsDeleteStudentsModalBtnDisabled(true)*/}
            {/*            }}>*/}
            {/*        <img src={deleteIcon} alt="plus" className="plus"/>*/}
            {/*    </button>*/}
            {/*}*/}

            {coursesData.length === 0 ? <p className="studentsModalError">Nothing to show about courses.</p> :
                <CourseList/>}
        </div>
    )
}

export default Courses;