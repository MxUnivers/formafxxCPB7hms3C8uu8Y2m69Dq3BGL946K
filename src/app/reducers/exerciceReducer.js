import { FETCH_EXERCISE_FAILURE, FETCH_EXERCISE_REQUEST, FETCH_EXERCISE_SUCCESS, FETCH_EXERCISES_FAILURE, FETCH_EXERCISES_REQUEST, FETCH_EXERCISES_SUCCESS, FETCH_EXERCISES_SUCCESS_2 } from "../actions/actions";



// exerciceReducer.js
const initialState = {
  exercices: [],
  exercices2: [],
  exercice: {},
  exerciceSelect: {},
  loadingExercice: false,
  loadingExerciceSelect: false,
  loadingExercices: false,
  errorExercices: null,
  errorExercice: null
  // ... autres états spécifiques à exerciceReducer
};

const exerciceReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_EXERCISE_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingExercice: true,
        errorExercices: ""
        // Autres manipulations d'état pour la demande de récupération des exercices
      };

    case FETCH_EXERCISE_SUCCESS:
      return {
        ...state,
        loadingExercice: false,
        errorExercices: "",
        exercice: action.payload
      };

    case FETCH_EXERCISE_FAILURE:
      return {
        ...state,
        loadingExercice: false,
        errorExercices: action.payload
      };


    case FETCH_EXERCISES_REQUEST:
      return {
        ...state,
        loadingExercices: true,
        errorExercices: ""
      };

    case FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        exercices: action.payload,
        loadingExercices: false,
        errorExercices: ""
        // Autres manipulations d'état pour le succès de la récupération des exercices
      };

    case FETCH_EXERCISES_SUCCESS_2:
      return {
        ...state,
        exercices2: action.payload,
        loadingExercices: false,
        errorExercices: ""
        // Autres manipulations d'état pour le succès de la récupération des exercices
      };

    case FETCH_EXERCISES_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingExercices: false,
        errorExercices: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des exercices
      };
    // ... autres cas pour d'autres actions liées aux exercices

    default:
      return state;
  }
};

export default exerciceReducer;