
import { apiClient } from "../../api/client";

const SupportApisService = {

    async listStudents() {
        const response = await apiClient.get("/support-apis/list-students");
        return response.data;
    },

    async listMenuItems() {
        const response = await apiClient.get("/support-apis/list-menu-items");
        return response.data;
    }

};

export default SupportApisService;