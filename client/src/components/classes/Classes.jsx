import bg from "../../assets/img/bg4.svg";
import ClassList from "./ClassList";

const Courses = () => {
    return(
        <div className="students-container">
            <img src={bg} alt="background" className="homepage-bg"/>
            {/*<StudentAddModal*/}
            {/*    onClose={() => {*/}
            {/*        setIsOpen(false);*/}
            {/*    }} isActive={isOpen}*/}
            {/*/>*/}

            {/*<StudentDeleteModal*/}
            {/*    onClose={() => {*/}
            {/*        setIsDeleteModalOpen(false);*/}
            {/*        setIsDeleteStudentsModalBtnDisabled(true);*/}
            {/*    }}*/}
            {/*    isActive={isDeleteModalOpen}*/}
            {/*/>*/}

            {/*<button className="add-students tooltip" data-tip="Add New Student" onClick={() => {*/}
            {/*    setIsOpen(!isOpen);*/}
            {/*}}>*/}
            {/*    <img src={plus} alt="plus" className="plus"/>*/}
            {/*</button>*/}

            {/*{studentsData.length === 0 ? "":*/}
            {/*    <button className="add-students delete-students tooltip" data-tip="Delete All Students"*/}
            {/*            onClick={() => {*/}
            {/*                setIsDeleteModalOpen(!isDeleteModalOpen)*/}
            {/*                isDeleteModalOpen ? setIsDeleteStudentsModalBtnDisabled(true) : setIsDeleteStudentsModalBtnDisabled(true)*/}
            {/*            }}>*/}
            {/*        <img src={deleteIcon} alt="plus" className="plus"/>*/}
            {/*    </button>*/}
            {/*}*/}

            {/*{studentsData.length === 0 ? <p className="studentsModalError">Nothing to show about students.</p> :*/}
            {/*    <StudentList/>}*/}
            <ClassList/>
        </div>
    )
}

export default Courses;