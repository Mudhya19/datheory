import { api } from "./api";

export const ProjectService = {
    getAll() {
        return api.get("/projects");
    },

    getBySlug(slug) {
        return api.get(`/projects/${slug}`);
    },
};
