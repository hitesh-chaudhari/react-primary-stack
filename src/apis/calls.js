import axios from "axios";
import { toast } from "react-toastify";

import CONSTANTS from "./constants";

export const BASE_URI = "http://192.168.255.164:8000/";

const parseError = (response) => {
    if(response && response.status === 401) {
        localStorage.removeItem("AUTH_TOKEN");
        window.location.replace('/');
    } else if (response && response.messages) {
        toast.error(response.messages.message);
        return {errorMessage: response.messages.message};
    } else {
        return Promise.reject({ errorMessage: 'Unrecognized error' });
    }
};

/**
 * parse response
 */
const parseBody = (response) => {
    if (response.data) {
        if(response.data.message) {
            toast.success(response.data.message);
        }
        return response.data;
    } else {
        return parseError(response)
    }
};

let instance = axios.create({
    baseURL: BASE_URI
});

const parseConfig = (config) => {
    let configuration = {...config};
    const authToken = localStorage.getItem('AUTH_TOKEN');

    if(authToken) {
        configuration.headers.Authorization = `Token ${authToken}`
    }

    return configuration;
};

// request header
instance.interceptors.request.use((config) => parseConfig(config), (error) => Promise.reject(error));

// response parse
instance.interceptors.response.use((response) => parseBody(response), (error) => {
    if (error.response) {
        return parseError(error.response);
    } else {
        return Promise.reject(error);
    }
});

export { instance };

export default {
    login(data) {
        return new Promise((resolve, reject) => {
            instance.post(CONSTANTS.LOGIN, data).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    register(data) {
        return new Promise((resolve, reject) => {
            instance.post(CONSTANTS.REGISTER, data).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    logout() {
        return new Promise((resolve, reject) => {
            instance.post(CONSTANTS.LOGOUT).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    getAllBooks() {
        return new Promise((resolve, reject) => {
            const URI = `${CONSTANTS.GET_BOOKS}/`;
            instance.get(URI).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    getBooks(id, annotation) {
        return new Promise((resolve, reject) => {
            const query = annotation ? encodeURIComponent(annotation) : "";
            const URI = `${CONSTANTS.GET_BOOKS}${id ? `/${id}` : ""}${annotation ? `?has_my_annotations=${query}` : ""}`;
            instance.get(URI).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    addBook(data) {
        return new Promise((resolve, reject) => {
            instance.post(CONSTANTS.ADD_BOOK, data).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    deleteBook(id) {
        return new Promise((resolve, reject) => {
            instance.delete(`${CONSTANTS.DELETE_BOOK}/${id}`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    updateBook(id, data) {
        return new Promise((resolve, reject) => {
            instance.put(`${CONSTANTS.UDPATE_BOOK}/${id}`, data).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    }
}