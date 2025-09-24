import { FETCH_LESSON_FAILURE, FETCH_LESSON_REQUEST, FETCH_LESSON_SUCCESS, FETCH_LESSONS_FAILURE, FETCH_LESSONS_REQUEST, FETCH_LESSONS_SUCCESS, FETCH_LESSONS_SUCCESS_2 } from "../actions/actions";



// lessonReducer.js
const initialState = {
  lessons: [],
  lessons2: [],
  lesson: {},
  lessonSelect: {},
  loadingLesson: false,
  loadingLessonSelect: false,
  loadingLessons: false,
  errorLessons: null,
  errorLesson: null
  // ... autres états spécifiques à lessonReducer
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_LESSON_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingLesson: true,
        errorLessons: ""
        // Autres manipulations d'état pour la demande de récupération des lessons
      };

    case FETCH_LESSON_SUCCESS:
      return {
        ...state,
        loadingLesson: false,
        errorLessons: "",
        lesson: action.payload
      };

    case FETCH_LESSON_FAILURE:
      return {
        ...state,
        loadingLesson: false,
        errorLessons: action.payload
      };


    case FETCH_LESSONS_REQUEST:
      return {
        ...state,
        loadingLessons: true,
        errorLessons: ""
      };

    case FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: action.payload,
        loadingLessons: false,
        errorLessons: ""
        // Autres manipulations d'état pour le succès de la récupération des lessons
      };

    case FETCH_LESSONS_SUCCESS_2:
      return {
        ...state,
        lessons2: action.payload,
        loadingLessons: false,
        errorLessons: ""
        // Autres manipulations d'état pour le succès de la récupération des lessons
      };

    case FETCH_LESSONS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingLessons: false,
        errorLessons: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des lessons
      };
    // ... autres cas pour d'autres actions liées aux lessons

    default:
      return state;
  }
};

export default lessonReducer;