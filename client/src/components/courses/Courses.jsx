import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import CourseList from "./CourseList";
import CourseAddModal from "./CourseAddModal";
import CourseDeleteModal from "./CourseDeleteModal";
import plus from "../../assets/img/plus.svg";
import bg from "../../assets/img/bg4.svg";
import axios from "axios";
import deleteIcon from "../../assets/img/delete.svg";

const Courses = () => {
    const {coursesData, setCoursesData, studentsData, setStudentsData, serverLink, setIsModalDeleteBtnDisabled} = useContext(mainContext);
    const [isOpen, setIsOpen] = useState({
        add: false,
        delete: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/course/getAll`);
            setCoursesData(response.data);
        };
        fetchData();
    }, [serverLink, setCoursesData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverLink}/api/student/getAll`);
            setStudentsData(response.data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    const deleteCourse = (id) => {
        axios.delete(`${serverLink}/api/course/delete/${id}`)
            .then(() => {
                const newCoursesData = coursesData.filter(course => course.id !== id);
                setCoursesData(newCoursesData);
            })
            .catch(error => console.log(error));
    }

    return(
        <div className="students-container">
            <img src={bg} alt="background" className="homepage-bg"/>

            <CourseAddModal
                onClose={() => {
                    setIsOpen({...isOpen, add: false});
                }} isActive={isOpen.add}
            />

            <CourseDeleteModal
                onClose={() => {
                    setIsOpen({...isOpen, delete: false});
                    setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, course: true});
                }}
                isActive={isOpen.delete}
            />

            <button className="add-students tooltip blur" data-tip="Add New Course" onClick={() => {
                setIsOpen({...isOpen, add: !isOpen.add});
            }}>
                <img src={plus} alt="plus" className="plus"/>
            </button>

            {coursesData.length === 0 ? "" :
                <button className="add-students delete-students tooltip" data-tip="Delete All Courses"
                        onClick={() => {
                            setIsOpen({...isOpen, delete: !isOpen.delete});
                            isOpen.delete ? setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, course: true}) : setIsModalDeleteBtnDisabled({...setIsModalDeleteBtnDisabled, course: true})
                        }}>
                    <img src={deleteIcon} alt="plus" className="plus"/>
                </button>
            }

            {coursesData.length === 0 ? <p className="studentsModalError">Nothing to show about courses.</p> :
                <CourseList deleteCourse={deleteCourse}/>}
        </div>
    )
}

export default Courses;