import { api } from "./api";

export const ProfileService = {
    getProfile() {
        return api.get("/profile");
    }
};