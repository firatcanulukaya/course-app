import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";

const StudentDeleteModal = ({isActive, onClose}) => {
    const {
        veri,
        setVeri,
        serverLink,
        isDeleteStudentsModalBtnDisabled,
        setIsDeleteStudentsModalBtnDisabled
    } = useContext(mainContext)
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            if (countdown === 0) {
                clearInterval(interval);
                setIsDeleteStudentsModalBtnDisabled(false)
            }
            return () => clearInterval(interval);
        } else if (isActive === false) {
            setCountdown(5);
        }
    }, [isActive, countdown]);


    const deleteAllStudents = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`${serverLink}/api/student/deleteAllStudents`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    fetch(`${serverLink}/api/student/getAllStudents`)
                        .then((response) => response.json())
                        .then((json) => setVeri(json))
                        .catch((error) => console.log(error));
                    onClose()
                    setIsDeleteStudentsModalBtnDisabled(true)
                }
            })
            .catch(error => console.log('error', error));
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
                    <ModalFooterBtn bgColor="#EF4444" textColor="#fff" isDisabled={isDeleteStudentsModalBtnDisabled}
                                    disabled={isDeleteStudentsModalBtnDisabled}
                                    onClick={() => deleteAllStudents()}>
                        {countdown === 0 ? "Yes, Delete All Students" : `Delete in ${countdown}`}
                    </ModalFooterBtn>
                </div>

            </div>

        </div>
    )
}

export default StudentDeleteModal;