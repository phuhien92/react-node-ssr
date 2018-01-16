import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async dispatch => {
    const res = await axios.get("https://react-ssr-api.herokuapp.com/users").catch(er => {
        console.log("FETCH AXIOS ERROR:", er)
    });

    dispatch({
        type: FETCH_USERS,
        payload: res
    })
}