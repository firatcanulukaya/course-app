import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";
import axios from "axios";

const StudentDeleteModal = ({isActive, onClose}) => {
    const {
        studentsData,
        setStudentsData,
        serverLink,
        setIsModalDeleteBtnDisabled,
        isModalDeleteBtnDisabled
    } = useContext(mainContext)
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            if (countdown === 0) {
                clearInterval(interval);
                setIsModalDeleteBtnDisabled({...isModalDeleteBtnDisabled, student: false});
            }
            return () => clearInterval(interval);
        } else if (isActive === false) {
            setCountdown(5);
        }
    }, [isActive, countdown]);


    const deleteAllStudents = () => {
        setIsModalDeleteBtnDisabled({...isModalDeleteBtnDisabled, student: true});
        axios.delete(`${serverLink}/api/student/deleteAll`)
            .then(res => {
                setStudentsData([]);
                onClose();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Are you absolutely sure?</h2>
                <button className="studentModalclose" onClick={() => {
                    onClose()
                }}>
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <div className="studentModalContent">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="studentModalContentP">
                                This action cannot be undone. This will permanently
                                deletes all of the students and remove’s data from our servers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#fff" textColor="#374151" isStroke={true} strokeColor="#E5E7EB"
                                    onClick={() => {
                                        onClose()
                                    }}>
                        Cancel
                    </ModalFooterBtn>
                    <ModalFooterBtn bgColor="#EF4444" textColor="#fff" isDisabled={isModalDeleteBtnDisabled.student}
                                    disabled={isModalDeleteBtnDisabled.student}
                                    onClick={() => deleteAllStudents()}>
                        {countdown === 0 ? "Yes, Delete All Students" : `Delete in ${countdown}`}
                    </ModalFooterBtn>
                </div>

            </div>

        </div>
    )
}

export default StudentDeleteModal;