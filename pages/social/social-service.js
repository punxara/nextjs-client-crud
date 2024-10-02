import axios from 'axios';
import {environments} from "../../environments/environments";

export const save = async (data) => {
    try {
        const response = await axios.post(`${environments.BASE_URL}/social`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
