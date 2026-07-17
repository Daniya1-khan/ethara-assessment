import api from "./api";

export const allocateSeat = async (data) => {
    const response = await api.post("/seat-allocation/allocate", data);
    return response.data;
};

export const releaseSeat = async (id) => {
    const response = await api.post(`/seat-allocation/release/${id}`);
    return response.data;
};

export const getAllocations = async () => {
    const response = await api.get("/seat-allocation");
    return response.data;
};