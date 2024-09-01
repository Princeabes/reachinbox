import axios from 'axios';

export interface ReplyMessage {
    from: string;
    to: string;
    subject: string;
    body: string;
}


const BASE_URL = 'https://hiring.reachinbox.xyz/api/v1/onebox';

// Define the type for the token
type Token = string;

// Function to retrieve the authentication token from local storage
const getAuthToken = (): Token => {
    const token = localStorage.getItem('reachinbox-auth');
    return token ? JSON.parse(token) : '';
};

// Create headers with authorization token
const createHeaders = (token: Token) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

// Fetch the list of mails
export const getMailList = async (token: Token) => {
    try {
        const response = await axios.get(`${BASE_URL}/list`, createHeaders(token));
        return response.data.data;
    } catch (err) {
        console.error('Error fetching mail list:', err);
        throw err;
    }
};

// Fetch specific mail messages
export const getMailMassages = async (id: number) => {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${BASE_URL}/messages/${id}`, createHeaders(token));
        return response.data.data;
    } catch (err) {
        console.error('Error fetching mail messages:', err);
        throw err;
    }
};

// Post a reply to a specific mail
export const postMailMassages = async (id: number, messages: ReplyMessage) => {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${BASE_URL}/reply/${id}`, messages, createHeaders(token));
        return response.data;
    } catch (err) {
        console.error('Error posting mail messages:', err);
        throw err;
    }
};

// Delete a specific mail response
export const deleteMailResponse = async (id: number) => {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${BASE_URL}/messages/${id}`, createHeaders(token));
        return response.data;
    } catch (err) {
        console.error('Error deleting mail response:', err);
        throw err;
    }
};

// Reset mail (including token for completeness)
export const resetMail = async (token: Token) => {
    try {
        const response = await axios.get(`${BASE_URL}/reset`, createHeaders(token));
        return response.data;
    } catch (err) {
        console.error('Error resetting mail:', err);
        throw err;
    }
};

