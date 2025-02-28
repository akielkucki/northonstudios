import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const ContactService = {
    contact: async (formData) => {
        try {
            return await axios.post(`${API_URL}contact`, formData);
        } catch (e) {
            if (e.response && e.response.data.error) return e.response;
            throw e;
        }
    }
}