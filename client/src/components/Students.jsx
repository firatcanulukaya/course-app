import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Modal from "./StudentEditModal";
import StudentList from "./StudentList";
import bg from "../assets/img/bg2.svg";
import mainContext from "../MainContext";
import plus from "../assets/img/plus.svg";
import StudentAddModal from "./StudentAddModal";

const Students = () => {
    const {veri, setVeri, eskiVeri, setEskiVeri} = useContext(mainContext)
    const [isOpen, setIsOpen] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetch("http://localhost:3001/")
            .then((response) => response.json())
            .then((json) => {
                setVeri(json)
                setEskiVeri(json)
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
                <button className="add-students" onClick={() => {
                    setIsOpen(!isOpen);
                }}>
                    <img src={plus} alt="plus" className="plus"/>
                </button>
                {veri.length === 0 ? <p className="studentsModalError">Her hangi bir öğrenci kayıtı bulunamadı.</p> : <StudentList/>}
            </div>
        </>
    )
}

export default Students;