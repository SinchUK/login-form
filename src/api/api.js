import axios from "axios";

const apiUrl = "https://655b0dbaab37729791a878d1.mockapi.io/users";

const getData = async () => {
    const data = (await axios.get(apiUrl)).data;
    console.log(data, "data");
    return data;
};

const addData = (user) => {
    axios
        .post(apiUrl, user)
        .then((response) => {
            console.log(response, "responce Add");
        })
        .catch((error) => {
            console.log(error);
        });
};

export { getData, addData };
