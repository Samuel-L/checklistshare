import { axiosInstance } from '../utils/axios-helpers';

const UPDATE_CHECKLIST_REQUEST = 'checklist-updater/UPDATE_CHECKLIST_REQUEST';
const UPDATE_CHECKLIST_SUCCESS = 'checklist-updater/UPDATE_CHECKLIST_SUCCESS';
const UPDATE_CHECKLIST_FAILURE = 'checklist-updater/UPDATE_CHECKLIST_FAILURE';
const RESET_STATE = 'checklist-updater/RESET_STATE';

export const actions = {
  UPDATE_CHECKLIST_REQUEST,
  UPDATE_CHECKLIST_SUCCESS,
  UPDATE_CHECKLIST_FAILURE,
  RESET_STATE,
};

export const initialState = {
  updating: false,
  updated: false,
  error: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CHECKLIST_REQUEST: {
      return {
        ...state, updating: true,
      };
    }
    case UPDATE_CHECKLIST_SUCCESS: {
      return {
        ...state, updating: false, updated: true,
      };
    }
    case UPDATE_CHECKLIST_FAILURE: {
      return {
        ...state, updating: false, error: action.payload,
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


