import api from "./api";

export const getSeats = async () => {
    const response = await api.get("/seats");
    return response.data;
};

export const createSeat = async (data) => {
    const response = await api.post("/seats", data);
    return response.data;
};

export const deleteSeat = async (id) => {
    const response = await api.delete(`/seats/${id}`);
    return response.data;
};

export const updateSeat = async (id, data) => {
    const response = await api.put(`/seats/${id}`, data);
    return response.data;
};