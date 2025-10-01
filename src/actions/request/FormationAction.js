import axios from "axios";
import { toast } from "sonner";
import { baseurl } from "../../lib/baseurl";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../lib/localvalueFunction";
import { localStorageKeys, profileRoleType } from "../../lib/localvalue";
import { FETCH_FORMATION_FAILURE, FETCH_FORMATION_REQUEST, FETCH_FORMATION_SUCCESS, FETCH_FORMATIONS_FAILURE, FETCH_FORMATIONS_REQUEST, FETCH_FORMATIONS_SUCCESS, FETCH_FORMATIONS_SUCCESS_2,  } from "../../app/actions/actions";
import appRoutes from "../../routes/appRoutes";



// Action: Créer une formation
export const createFormation = (data) => async (dispatch) => {
  dispatch({ type: FETCH_FORMATIONS_REQUEST });
  try {
    const response = await axios.post(`${baseurl.url}/api/v1/formations`, data, {
      headers: {
        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`,
      },
    });
    dispatch({ type: FETCH_FORMATIONS_SUCCESS, payload: response.data.data });
    toast.success(response.data.message || "Formation créée avec succès");
  } catch (error) {
    dispatch({ type: FETCH_FORMATIONS_FAILURE, payload: error.response?.data?.message });
    toast.error(error.response?.data?.message || "Échec de création");
  }
};

// Action: Récupérer toutes les formations
export const fetchFormations = (filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_FORMATIONS_REQUEST });
  try {
    const params = new URLSearchParams(filters);
    const url = `${baseurl.url}/api/v1/formations?${params.toString()}`;
    const response = await axios.get(url, {
      headers: { 'Authorization': `${baseurl.TypeToken} ${baseurl.token}` },
    });
    dispatch({ type: FETCH_FORMATIONS_SUCCESS, payload: response.data.data });
    dispatch({ type: FETCH_FORMATIONS_SUCCESS_2, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_FORMATIONS_FAILURE, payload: error.message });
    toast.error("Impossible de charger les formations");
  }
};

// Action: Récupérer une formation par ID
export const fetchFormationById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_FORMATION_REQUEST });
  try {
    const response = await axios.get(`${baseurl.url}/api/formations/${id}`, {
      headers: { 'Authorization': `${baseurl.TypeToken} ${baseurl.token}` },
    });
    dispatch({ type: FETCH_FORMATION_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_FORMATION_FAILURE, payload: error.message });
    toast.error("Formation introuvable");
  }
};

// Action: S'inscrire à une formation
export const enrollInFormation = (id, navigate) => async (dispatch) => {
  try {
    await axios.post(`${baseurl.url}/api/formations/${id}/enroll`, {}, {
      headers: { 'Authorization': `${baseurl.TypeToken} ${baseurl.token}` },
    });
    toast.success("Inscription réussie !");
    navigate("/student");
  } catch (error) {
    toast.error(error.response?.data?.message || "Échec de l'inscription");
  }
};