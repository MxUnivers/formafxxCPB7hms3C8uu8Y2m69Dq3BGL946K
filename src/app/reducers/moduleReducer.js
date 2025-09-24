import { FETCH_MODULE_FAILURE, FETCH_MODULE_REQUEST, FETCH_MODULE_SUCCESS, FETCH_MODULES_FAILURE, FETCH_MODULES_REQUEST, FETCH_MODULES_SUCCESS, FETCH_MODULES_SUCCESS_2 } from "../actions/actions";



// moduleReducer.js
const initialState = {
  modules: [],
  modules2: [],
  module: {},
  moduleSelect: {},
  loadingModule: false,
  loadingModuleSelect: false,
  loadingModules: false,
  errorModules: null,
  errorModule: null
  // ... autres états spécifiques à moduleReducer
};

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_MODULE_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingModule: true,
        errorModules: ""
        // Autres manipulations d'état pour la demande de récupération des modules
      };

    case FETCH_MODULE_SUCCESS:
      return {
        ...state,
        loadingModule: false,
        errorModules: "",
        module: action.payload
      };

    case FETCH_MODULE_FAILURE:
      return {
        ...state,
        loadingModule: false,
        errorModules: action.payload
      };


    case FETCH_MODULES_REQUEST:
      return {
        ...state,
        loadingModules: true,
        errorModules: ""
      };

    case FETCH_MODULES_SUCCESS:
      return {
        ...state,
        modules: action.payload,
        loadingModules: false,
        errorModules: ""
        // Autres manipulations d'état pour le succès de la récupération des modules
      };

    case FETCH_MODULES_SUCCESS_2:
      return {
        ...state,
        modules2: action.payload,
        loadingModules: false,
        errorModules: ""
        // Autres manipulations d'état pour le succès de la récupération des modules
      };

    case FETCH_MODULES_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingModules: false,
        errorModules: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des modules
      };
    // ... autres cas pour d'autres actions liées aux modules

    default:
      return state;
  }
};

export default moduleReducer;