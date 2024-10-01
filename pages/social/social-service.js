import axios from 'axios';

const API_URL = 'http://localhost:3500/social';

export const save = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
