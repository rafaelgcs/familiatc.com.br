import { authApi } from "@/services/api"

const getResultList = async () => {
    try {
        const resp = await authApi.get(`/api/result`)
        if (resp.status == 200) {
            if (resp.data.success) {
                return {
                    success: true,
                    data: resp.data.data
                }
            } else {
                return {
                    success: false,
                    data: resp.data.data,
                    message: resp.data.error.message
                }
            }
        }

        return {
            success: false,
            message: 'Error: '
        }
    } catch (e) {
        return {
            success: false,
            message: 'Error: '
        }
    }
}

const createResult = async (data: any) => {
    try {
        const resp = await authApi.post(`/api/result`, data)
        if (resp.status == 200 || resp.status == 201) {

            if (resp.data.success) {
                return {
                    success: true,
                    data: resp.data.data
                }
            } else {
                return {
                    success: false,
                    data: resp.data.data,
                    message: resp.data.error.message
                }
            }

        }

        return {
            success: false,
            message: 'Error: '
        }
    } catch (e) {
        return {
            success: false,
            message: 'Error: '
        }
    }
}

const updateResult = async (id: string, data: any) => {
    try {
        const resp = await authApi.put(`/api/result/update/${id}`, data)
        if (resp.status == 200 || resp.status == 201) {

            if (resp.data.success) {
                return {
                    success: true,
                    data: resp.data.product
                }
            } else {
                return {
                    success: false,
                    message: resp.data.error.message
                }
            }

        }

        return {
            success: false,
            message: 'Error: '
        }
    } catch (e) {
        return {
            success: false,
            message: 'Error: '
        }
    }
}

const deleteResult = async (id: string) => {
    try {
        const resp = await authApi.delete(`/api/result/delete/${id}`)
        if (resp.status == 200 || resp.status == 201) {
            const res = resp.data
            if (res.success) {
                return {
                    success: res.success,
                    message: res.data.message
                }
            } else {
                return {
                    success: false,
                    message: "Não foi possível deletar o produto."
                }

            }

        }

        return {
            success: false,
            message: 'Error: '
        }
    } catch (e) {
        return {
            success: false,
            message: 'Error: '
        }
    }
}

export { getResultList, createResult, updateResult, deleteResult };
