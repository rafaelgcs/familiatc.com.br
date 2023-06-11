import { api, authApi } from 'src/services/api';
import { doLocalLogin, doLocalLogout } from 'src/services/auth';

const doUserLogin = async ({ email, password, remember }) => {
    let data = {
        email,
        password
    };
    try {
        let response = await api.post('/api/auth/authenticate', data);

        if (response.status === 200 || response.status === 201) {
            let res = response.data;

            if (res.success) {
                let logged = await doLocalLogin(
                    res.data.user,
                    res.data.access_token,
                    remember ? 'true' : 'false'
                );

                return {
                    success: logged,
                    message: 'Login realizado com sucesso!'
                };
            }

            return { success: false, message: "Usuário não encontrado" };
        }
        else if (response.status === 500) {
            return { success: false, message: "Não foi possível realizar o login, sistema temporariamente fora do ar!" };
        }

        return { success: false, message: 'Usuário ou senha incorretos!' };
    } catch (e) {
        let errorMessage = ""
        let res = e.response

        if (res?.status == 500) {
            errorMessage = "Não foi possível realizar o login, sistema temporariamente fora do ar!"
        }
        else {
            errorMessage = res?.data?.message
        }
        return { success: false, message: errorMessage };
    }
};

const doUserLogout = async () => {
    try {
        let response = await authApi.post('/api/auth/logout');

        if (response.status === 200 || response.status === 201) {
            let res = response.data;

            if (res.success) {
                let finished = await doLocalLogout();

                return {
                    success: finished,
                    message: 'Finished logout!'
                };
            }

            return { success: false, message: "Falha ao efetuar logout" };
        }

        return { success: false, message: 'Falha ao efetuar o logout!' };
    } catch (e) {
        let resData = e.response?.data
        return { success: false, message: resData ? resData.message : "Falha ao tentar efetuar o logout!" };
    }
};

const getUserList = async () => {
    try {
        const resp = await authApi.get(`/api/user`)
        if (resp.status == 200) {
            return {
                success: true,
                data: resp.data
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

const createUser = async (data) => {
    try {
        const resp = await authApi.post(`/api/user`, data)
        if (resp.status == 200 || resp.status == 201) {
            return {
                success: true,
                data: resp.data
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

const deleteUser = async (usuario) => {
    try {
        const resp = await authApi.delete(`/api/user/${usuario}`)
        if (resp.status == 200 || resp.status == 201) {
            return {
                success: true,
                data: resp.data
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

export { doUserLogin, doUserLogout, getUserList, createUser, deleteUser };
