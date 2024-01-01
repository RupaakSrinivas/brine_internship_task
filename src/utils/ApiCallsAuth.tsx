import { UserData } from "../context";
import axios from "axios";

export async function handleUserLogin(
    email: string,
    password: string
): Promise<UserData | string> {
    const baseUrl = process.env.REACT_APP_API_BASEURL;

    return new Promise<UserData | string>(async (resolve, reject) => {
        try {
            const response = await axios.get(baseUrl + "users");
            const userData = response.data.find(
                (user: UserData) =>
                    user.email.toLowerCase() === email.toLowerCase() && user.password === password
            );
            if (userData) {
                resolve(userData);
                console.log(response, "response");
            } else {
                reject("Authorization Failed");
                window.alert("Authorization Failed");
            }
        } catch (error) {
            window.alert(error);
            reject(error);
        }
    });
}

export async function handleUserRegistration(
    name: string,
    username: string,
    email: string,
    password: string
): Promise<UserData | string> {
    const baseUrl = process.env.REACT_APP_API_BASEURL;

    return new Promise<UserData | string>(async (resolve, reject) => {
        try {
            const usersResponse = await axios.get(baseUrl + "users");
            const usersData = usersResponse.data;
            const existingUser = usersData.find(
                (user: UserData) => user.email.toLowerCase() === email.toLowerCase()
            );

            const data = {
                name: name,
                profilePic:"https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg",
                username: username,
                password: password,
                email: email,
                cart: {
                    items: [],
                },
            };

            if (existingUser) {
                reject("Email already exists");
                window.alert("Email already exists");
            } else {
                const response = await axios.post(baseUrl + "users", data);
                const userData = response.data;
                resolve(userData);
                console.log(response, "response");
            }
        } catch (error) {
            window.alert(error);
            reject(error);
        }
    });
}
