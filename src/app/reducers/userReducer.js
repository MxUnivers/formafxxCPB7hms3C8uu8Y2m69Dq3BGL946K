import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_SUCCESS_2 } from "../actions/actions";



// userReducer.js
const initialState = {
  users: [],
  users2: [],
  user: {},
  userSelect: {},
  loadingUser: false,
  loadingUserSelect: false,
  loadingUsers: false,
  errorUsers: null,
  errorUser: null
  // ... autres états spécifiques à userReducer
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USER_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingUser: true,
        errorUsers: ""
        // Autres manipulations d'état pour la demande de récupération des users
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        errorUsers: "",
        user: action.payload
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loadingUser: false,
        errorUsers: action.payload
      };


    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loadingUsers: true,
        errorUsers: ""
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loadingUsers: false,
        errorUsers: ""
        // Autres manipulations d'état pour le succès de la récupération des users
      };

    case FETCH_USERS_SUCCESS_2:
      return {
        ...state,
        users2: action.payload,
        loadingUsers: false,
        errorUsers: ""
        // Autres manipulations d'état pour le succès de la récupération des users
      };

    case FETCH_USERS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingUsers: false,
        errorUsers: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des users
      };
    // ... autres cas pour d'autres actions liées aux users

    default:
      return state;
  }
};

export default userReducer;