import { createListOnBackend, createItemsOnBackend } from './helpers/backendHelpers';

const ADD_CHECKLIST_REQUEST = 'checklist-adder/ADD_CHECKLIST_REQUEST';
const ADD_CHECKLIST_SUCCESS = 'checklist-adder/ADD_CHECKLIST_SUCCESS';
const ADD_CHECKLIST_FAILURE = 'checklist-adder/ADD_CHECKLIST_FAILURE';
const RESET_STATE = 'checklist-adder/RESET_STATE';

export const actions = {
  ADD_CHECKLIST_REQUEST,
  ADD_CHECKLIST_SUCCESS,
  ADD_CHECKLIST_FAILURE,
  RESET_STATE,
};

export const initialState = {
  adding: false,
  added: false,
  url: '',
  error: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CHECKLIST_REQUEST: {
      return {
        ...state, adding: true,
      };
    }
    case ADD_CHECKLIST_SUCCESS: {
      return {
        ...state, adding: false, added: true, url: action.payload,
      };
    }
    case ADD_CHECKLIST_FAILURE: {
      return {
        ...state, adding: false, error: action.payload,
      };
    }
    case RESET_STATE: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export const addChecklist = (title, items) => (dispatch) => {
  dispatch({ type: ADD_CHECKLIST_REQUEST });

  return createListOnBackend(title)
    .then((response) => {
      const listId = response.data.id;
      return createItemsOnBackend(listId, items)
        .then(() => {
          dispatch({ type: ADD_CHECKLIST_SUCCESS, payload: response.data.url });
        })
        .catch((error) => {
          dispatch({ type: ADD_CHECKLIST_FAILURE, payload: error.response.status });
        });
    })
    .catch((error) => {
      dispatch({ type: ADD_CHECKLIST_FAILURE, payload: error.response.status });
    });
};
