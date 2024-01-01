import { UserData } from "../context";
import axios from "axios";

export default async function handleUserLogin(
    email: string,
    password: string
): Promise<UserData | string> {
    const baseUrl = process.env.REACT_APP_API_BASEURL;

    return new Promise<UserData | string>(async (resolve, reject) => {
        try {
            const response = await axios.get(baseUrl + "users");
            const userData = response.data.find((user: UserData) => user.email === email && user.password === password);
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
