import { api } from "@/services/api"

const getHomeContent = async () => {
    const resp = await api.get('/api/home/content');

    if (resp.status == 200 || resp.status == 201) {

        return {
            success: true,
            data: resp.data.data
        }

    }

    return {
        success: false,
        message: "Falha ao obter conteúdo da página inicial"
    }
}

export {
    getHomeContent
}