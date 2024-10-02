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

export const getAll = async () => {
    try {
        const response = await axios.get(`${environments.BASE_URL}/social/get-all-socials`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
