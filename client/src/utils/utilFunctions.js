import axios from "axios";

export const getAll = (serverLink, setData, type) => {
    axios.get(`${serverLink}/api/${type}/getAll`).then(res => {
        setData(res.data)
        console.log(res.data)
    });
};

export const handleDelete = (serverLink, id, setData, data, type) => {
    axios.delete(`${serverLink}/api/${type}/delete/${id}`)
        .then(() => {
            const newData = data.filter(item => item.id !== id);
            setData(newData);
        })
        .catch(error => console.log(error));
}