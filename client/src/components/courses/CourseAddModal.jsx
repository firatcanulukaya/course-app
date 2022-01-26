import xIcon from "../../assets/img/xIcon.svg";
import {ModalFooterBtn} from "../../styledComponents/studentsStyle";
import {useContext, useEffect, useState} from "react";
import mainContext from "../../MainContext";
import Select from "react-select";

const CourseAddModal = ({isActive, onClose}) => {
    const { coursesData, setCoursesData, studentsData, setStudentsData, serverLink } = useContext(mainContext)
    const [courseValues, setCourseValues] = useState({
        courseName: "",
        students: 0
    });

    const randomHexGenerator = () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#00${hex.substr(0, 2)}e3`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${serverLink}/api/student/getAllStudents`);
            const data = await response.json();
            setStudentsData(data);
        };
        fetchData();
    }, [serverLink, setStudentsData]);

    const handleSave = (courseValues) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "courseName": courseValues.courseName,
            "courseColor": randomHexGenerator()
        });

        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/api/course/createCourse", requestOptions)
            .then(response =>{
                console.log(response)
                if(response.status === 201){
                    setCoursesData(coursesData.concat(courseValues));

                    // fetch(`${serverLink}/api/course/getCourses`)
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         setCoursesData(data);
                    //     })

                    console.log(coursesData)

                    // var raw = JSON.stringify({
                    //     "studentId": courseValues.students,
                    //     "courseId": coursesData.slice(-1)[0].id
                    // });
                    //
                    // var requestOptions = {
                    //     method: 'POST',
                    //     headers: myHeaders,
                    //     body: raw,
                    //     redirect: 'follow'
                    // };
                    //
                    // fetch("http://localhost:3001/api/course/addStudentToCourse", requestOptions)
                    //     .then(response => response.text())
                    //     .then(result => console.log(result))
                    //     .catch(error => console.log('error', error));


                    onClose();
                }
                response.json()
            })
            .catch(error => console.log('error', error));

    }

    return(
        <div className={"studentModal " + (isActive && "active")} id="studentAddModal">
            <div className="studentModalheader">
                <h2>Create New Course</h2>
                <button className="studentModalclose" onClick={() => { onClose(); }} >
                    <img src={xIcon} alt="X icon"/>
                </button>
            </div>

            <form onSubmit={(e) => {e.preventDefault(); handleSave(courseValues)}}>
                <div className="studentModalContent">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="studentModalLabel">Name</label>
                                <input
                                    type="text"
                                    className="studentModalInput"
                                    required
                                    placeholder="type..."
                                    value={courseValues.courseName}
                                    onChange={(e) => { setCourseValues({...courseValues, courseName: e.target.value}) }}
                                />
                            </div>
                            <div className="col">
                                <label className="studentModalLabel">Add Students</label>
                                <select className="studentModalInput" onChange={(e) =>  setCourseValues({...courseValues, students: parseInt(e.target.value)})}>
                                    <option value="">Select students</option>
                                    {studentsData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.studentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="studentModalfooter">
                    <ModalFooterBtn bgColor="#1E40AF" textColor="#fff" type="submit">
                        Save Changes
                    </ModalFooterBtn>
                </div>
            </form>
        </div>
    )
}

export default CourseAddModal;