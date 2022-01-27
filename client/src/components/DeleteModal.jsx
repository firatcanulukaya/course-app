import xIcon from "../assets/img/xIcon.svg";
import {ModalFooterBtn} from "../styledComponents/studentsStyle";

const DeleteModal = ({handleDelete, isActive, onClose, id, type}) => {
    return (
        <div className={"studentModal " + (isActive && "active")}>
            <div className="studentModalheader">
                <h2>Are you absolutely sure?</h2>
                <button className="studentModalclose">
                    <img src={xIcon} alt="X icon" onClick={() => onClose()}/>
                </button>
            </div>

            <div className="studentModalContent">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="studentModalContentP">
                                This action cannot be undone. This will permanently
                                deletes the {type} from the our database.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#fff" textColor="#374151" isStroke={true} strokeColor="#E5E7EB"
                                    onClick={() => onClose()}>
                        Cancel
                    </ModalFooterBtn>

                    <ModalFooterBtn bgColor="#EF4444" textColor="#fff"
                                    onClick={() =>{ handleDelete(id, type); onClose(); }}>
                        Delete
                    </ModalFooterBtn>

                </div>

            </div>

        </div>
    )
}

export default DeleteModal;