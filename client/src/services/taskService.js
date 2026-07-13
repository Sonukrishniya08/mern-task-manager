import API from "../api/api";

export const getTasks = (params = {}) => {
    return API.get("/tasks", {
        params
    });
};

export const getTaskById = (id) => {
    return API.get(`/tasks/${id}`);
};

export const createTask = (data) => {
    return API.post("/tasks", data);
};

export const updateTask = (id, data) => {
    return API.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
    return API.delete(`/tasks/${id}`);
};