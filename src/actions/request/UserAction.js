import axios from "axios";
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_SUCCESS_2, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../../app/actions/actions";
import { baseurl } from "../../utils/url/baseurl";
import { getAndCheckLocalStorage } from "../../utils/storage/localvalueFuction";
import { localStorageData, localStorageKeys } from "../../utils/storage/localvalue";
import { profileRoleType } from "../../utils/dataApi/dataFormApi";
import { getDataFromFile } from "../DataLocal";
import { toast } from "sonner";





export function UserCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/users/register`,data,).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Compté créer avec succès")
            
        })
            .catch((error) => {
                dispatch({ type: FETCH_USER_FAILURE, payload: error.message })
            toast.error(response?.data?.message|| "Création de compte non réussi")

                //console.log(error);
            });
    }
}

export function UserLoing(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/users/login`,data,).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Connexion réussi avec succès")
            
        })
            .catch((error) => {
                dispatch({ type: FETCH_USER_FAILURE, payload: error.message })
            toast.error(response?.data?.message|| "Impossible de se connecter")

                //console.log(error);
            });
    }
}



// Récupérer un code promo par ID
export function fetchUserById(idUser) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/users/get_contact/${idUser}`, {
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




// Action pour récupérer les utilisateurs avec filtres
export function fetchUsers(filters = {
    search,startDate,endDate,lastLoginStart, lastLoginEnd
}) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USERS_REQUEST });

        try {
            // Construire les query params dynamiquement
            const params = new URLSearchParams();

            // Ajouter uniquement les filtres définis
            if (filters.search) params.append('search', filters.search);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.lastLoginStart) params.append('lastLoginStart', filters.lastLoginStart);
            if (filters.lastLoginEnd) params.append('lastLoginEnd', filters.lastLoginEnd);

            // URL avec query string
            const url = `${baseurl.url}/api/v1/users/get_users${params.toString() ? '?' + params.toString() : ''}`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `${baseurl.TypeToken} ${baseurl.token}`,
                },
            });

            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: response.data.data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_USERS_FAILURE,
                payload: error.message || 'Erreur lors du chargement des utilisateurs',
            });
        }
    };
}






// Créer un nouveua message 
export function createUser(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/users/add`, data, {
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



