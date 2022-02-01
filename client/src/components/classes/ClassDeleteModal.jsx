import xIcon from "../../assets/img/xIcon.svg"
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import {ModalFooterBtn} from "../../styledComponents";
import axios from "axios";

const ClassDeleteModal = ({isActive, onClose}) => {
    const {setClassesData, serverLink, setIsModalDeleteBtnDisabled, isModalDeleteBtnDisabled} = useContext(mainContext);

    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            if (countdown === 0) {
                clearInterval(interval);
                setIsModalDeleteBtnDisabled({...isModalDeleteBtnDisabled, classes: false});
            }
            return () => clearInterval(interval);
        } else if (isActive === false) {
            setCountdown(5);
        }
    }, [isActive, countdown]);

    const deleteAllCourses = () => {
        setIsModalDeleteBtnDisabled({...isModalDeleteBtnDisabled, student: true});
        axios.delete(`${serverLink}/api/class/deleteAll`)
            .then(res => {
                setClassesData([]);
                onClose();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
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
                                deletes all of the classes and remove’s data from our servers.
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
                    <ModalFooterBtn bgColor="#EF4444" textColor="#fff" isDisabled={isModalDeleteBtnDisabled.classes}
                                    disabled={isModalDeleteBtnDisabled.classes}
                                    onClick={() => deleteAllCourses()}>
                        {countdown === 0 ? "Yes, Delete All Classes" : `Delete in ${countdown}`}
                    </ModalFooterBtn>
                </div>

            </div>

        </div>
    )
}

export default ClassDeleteModal;