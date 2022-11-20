import { panelApi, panelAuthApi } from '../../services/api';

const getAllProducts = async () => {
    try {
        console.log("initializing method --- getAllProducts")
        let response = await panelAuthApi.get('/product/');

        if (response.status === 200) {
            let res = response.data;

            if (res.success) {
                return {
                    success: true,
                    data: res.data
                };
            }

            return { success: false };
        }

        return { success: false };
    } catch (err) {
        console.error("error in method --- getAllProducts ---", err)
        return { success: false };
    }
};

const getAllProductsLight = async () => {
    try {
        console.log("initializing method --- getAllProducts")
        let response = await panelApi.get('/product/light');

        if (response.status === 200) {
            let res = response.data;

            if (res.success) {
                return {
                    success: true,
                    data: res.data
                };
            }

            return { success: false };
        }

        return { success: false };
    } catch (err) {
        console.error("error in method --- getAllProducts ---", err)
        return { success: false };
    }
};

const createNewProduct = async (data) => {
    try {
        console.log("initializing method --- createNewProduct")
        let response = await panelAuthApi.post('/product/', data);

        if (response.status === 200) {
            let res = response.data;

            if (res.success) {
                return {
                    success: true,
                    data: res.data
                };
            }

            return { success: false };
        }

        return { success: false };
    } catch (err) {
        console.error("error in method --- createNewProduct ---", err)
        return { success: false };
    }
}

export { getAllProducts, getAllProductsLight, createNewProduct };
