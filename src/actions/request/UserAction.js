import axios from "axios";
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_SUCCESS_2, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../../app/actions/actions";
import { baseurl } from "../../utils/url/baseurl";
import { getAndCheckLocalStorage } from "../../utils/storage/localvalueFuction";
import { localStorageData, localStorageKeys } from "../../utils/storage/localvalue";
import { profileRoleType } from "../../utils/dataApi/dataFormApi";
import { getDataFromFile } from "../DataLocal";
import { toast } from "react-toastify";


// Récupérer tous les codes promo
export function fetchUsersAll() {
    return async (dispatch) => {
        const contactsAll = getDataFromFile(localStorageData.UserAll) || [];
        dispatch({ type: FETCH_USERS_SUCCESS, payload: contactsAll })
        dispatch({ type: FETCH_USERS_SUCCESS_2, payload: contactsAll })
        dispatch({ type: FETCH_USERS_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/contacts/get_contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_USERS_SUCCESS_2, payload: response.data.data });
        }).catch((error) => {
            //console.log(error);
            dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
        });
    }
}






// Récupérer un code promo par ID
export function fetchUserById(idUser) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/contacts/get_contact/${idUser}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.data });
        })
            .catch((error) => {
                dispatch({ type: FETCH_USER_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}






// Créer un nouveua message 
export function createUser(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/contacts/add`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message || "Votre message a été envoyé avec succès et sera traité dans les meilleurs délais.", { position: "bottom-right" });
            if (getAndCheckLocalStorage(localStorageKeys.profileRole) == profileRoleType.ADMIN) {
            } else {
                fetchUsersAll();
            }
        }).catch((error) => {
            dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
            toast.error(error?.response?.data.message || "Message non envoyé", { position: "bottom-right" });
            if (getAndCheckLocalStorage(localStorageKeys.profileRole) == profileRoleType.ADMIN) {
            } else {
                fetchUsersAll();
            }
            //console.log(error);
        });
    }
}



