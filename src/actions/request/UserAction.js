import axios from "axios";
import { toast } from "sonner";
import { baseurl } from "../../lib/baseurl";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../lib/localvalueFunction";
import { localStorageKeys, profileRoleType } from "../../lib/localvalue";
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../../app/actions/actions";
import appRoutes from "../../routes/appRoutes";





export function UserCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.pist(`${baseurl.url}/api/v1/users/register`,data,).then((response) => {
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

export function UserLoing(data, navigate) {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/auth/login`,data,).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Connexion réussi avec succès", { position: "bottom-right" });
            setWithExpiration(localStorageKeys.userId,response?.data?.data?._id,dureeDeVie);
            setWithExpiration(localStorageKeys.profileRole,response?.data?.data?.role,dureeDeVie);
            setWithExpiration(localStorageKeys.userToken,response?.data?.data?.token,dureeDeVie);
            navigate(`${appRoutes[10].path}`);
        })
            .catch((error) => {
                dispatch({ type: FETCH_USER_FAILURE, payload: error.response?.data?.message })
            toast.error(error.response?.data?.message|| "Impossible de se connecter", { position: "bottom-right" })

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
                fetchUsersAll();
            } else {
                // fetchUsersAll();
            }
            //console.log(error);
        });
    }
}



