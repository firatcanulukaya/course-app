import bg from "../../assets/img/bg4.svg";
import CourseList from "./CourseList";
import {useContext, useEffect} from "react";
import mainContext from "../../MainContext";


// const randomHexGenerator = () => {
//     const hex = Math.floor(Math.random() * 16777215).toString(16);
//     return `#00${hex.substr(0, 2)}e3`;
// }

const Courses = () => {
    const {coursesData, setCoursesData, serverLink} = useContext(mainContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${serverLink}/api/course/getCourses`);
            const data = await response.json();
            setCoursesData(data);
        };
        fetchData();
    }, [serverLink, setCoursesData]);

    console.log(coursesData);

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
            <CourseList/>
        </div>
    )
}

export default Courses;