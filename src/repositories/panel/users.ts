import { panelApi } from '../../services/api';
import { panel as panelAuth } from '../../services/auth';

const userLogin = async ({ email, password, remember }) => {
  let data = {
    email,
    password
  };
  try {
    let response = await panelApi.post('/auth/authenticate/', data);

    if (response.status === 200 || response.status === 201) {
      let res = response.data;
      console.log(res);

      if (res.success) {
        let logged = await panelAuth.panelLocalLogin(
          res.data.user,
          res.data.access_token,
          remember ? 'true' : 'false'
        );

        return {
          success: logged,
          error: 'Login Succefully'
        };
      }

      return { success: false, error: "Don't found this user" };
    }

    return { success: false, error: 'Email or password wrong' };
  } catch (_) {
      return { success: false, error: 'Request Failed'};
  }
};

export { userLogin };
