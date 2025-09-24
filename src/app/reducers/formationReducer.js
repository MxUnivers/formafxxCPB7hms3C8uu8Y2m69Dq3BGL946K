import { FETCH_FORMATION_FAILURE, FETCH_FORMATION_REQUEST, FETCH_FORMATION_SUCCESS, FETCH_FORMATIONS_FAILURE, FETCH_FORMATIONS_REQUEST, FETCH_FORMATIONS_SUCCESS, FETCH_FORMATIONS_SUCCESS_2 } from "../actions/actions";



// formationReducer.js
const initialState = {
  formations: [],
  formations2: [],
  formation: {},
  formationSelect: {},
  loadingFormation: false,
  loadingFormationSelect: false,
  loadingFormations: false,
  errorFormations: null,
  errorFormation: null
  // ... autres états spécifiques à formationReducer
};

const formationReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_FORMATION_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingFormation: true,
        errorFormations: ""
        // Autres manipulations d'état pour la demande de récupération des formations
      };

    case FETCH_FORMATION_SUCCESS:
      return {
        ...state,
        loadingFormation: false,
        errorFormations: "",
        formation: action.payload
      };

    case FETCH_FORMATION_FAILURE:
      return {
        ...state,
        loadingFormation: false,
        errorFormations: action.payload
      };


    case FETCH_FORMATIONS_REQUEST:
      return {
        ...state,
        loadingFormations: true,
        errorFormations: ""
      };

    case FETCH_FORMATIONS_SUCCESS:
      return {
        ...state,
        formations: action.payload,
        loadingFormations: false,
        errorFormations: ""
        // Autres manipulations d'état pour le succès de la récupération des formations
      };

    case FETCH_FORMATIONS_SUCCESS_2:
      return {
        ...state,
        formations2: action.payload,
        loadingFormations: false,
        errorFormations: ""
        // Autres manipulations d'état pour le succès de la récupération des formations
      };

    case FETCH_FORMATIONS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingFormations: false,
        errorFormations: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des formations
      };
    // ... autres cas pour d'autres actions liées aux formations

    default:
      return state;
  }
};

export default formationReducer;