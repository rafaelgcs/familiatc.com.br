import { panelAuthApi } from '../../services/api';

const getTransactions = async () => {
  let response = await panelAuthApi.get('/transactions');

  if (response.status == 200) {
    let res = response.data;

    if (res.success) {
      return { success: true, transactions: res.data };
    }

    return { success: false, error: "Don't found transactions" };
  }

  return { success: false, error: 'Request failed' };
};

export { getTransactions };
