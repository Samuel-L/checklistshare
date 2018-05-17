import { axiosInstance } from '../utils/axios-helpers';

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

export const createListOnBackend = (name) => {
  const promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: 'post',
      url: '/checklists/lists/',
      data: {
        name,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
