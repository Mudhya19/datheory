import { api } from "./api";

export const SkillService = {
    getAll(params = {}) {
        return api.get("/skills", { params });
    },

    getCategories() {
        return api.get("/skill-categories");
    }
};