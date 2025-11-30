import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ---- HOME ----
export const getHomeData = () => api.get("/home");

// ---- ARTISTS ----
export const getArtists = () => api.get("/artists");
export const getArtist = (id) => api.get(`/artists/${id}`);
export const applyForArtist = (data) => api.post("/artists/apply", data);

// ---- GUESTS ----
export const getGuests = () => api.get("/guests");

// ---- ABOUT ----
export const getMembers = () => api.get("/about");

// ---- CONTACT ----
export const sendMessage = (data) => api.post("/contact", data);

export default api;
