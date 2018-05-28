import { axiosInstance } from '../utils/axios-helpers';

const FETCH_CHECKLIST_REQUEST = 'checklist-fetcher/FETCH_CHECKLIST_REQUEST';
const FETCH_CHECKLIST_SUCCESS = 'checklist-fetcher/FETCH_CHECKLIST_SUCCESS';
const FETCH_CHECKLIST_FAILURE = 'checklist-fetcher/FETCH_CHECKLIST_FAILURE';
const RESET_STATE = 'checklist-fetcher/RESET_STATE';

export const actions = {
  FETCH_CHECKLIST_REQUEST,
  FETCH_CHECKLIST_SUCCESS,
  FETCH_CHECKLIST_FAILURE,
  RESET_STATE,
};

export const initialState = {
  fetching: false,
  fetched: false,
  error: 0,
  checklist: {
    id: 0,
    title: '',
    url: '',
    items: [
      { id: 0, List: 0, name: '' },
    ],
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CHECKLIST_REQUEST: {
      return {
        ...state, fetching: true,
      };
    }
    case FETCH_CHECKLIST_SUCCESS: {
      return {
        ...state, fetching: false, fetched: true, checklist: action.payload,
      };
    }
    case FETCH_CHECKLIST_FAILURE: {
      return {
        ...state, fetching: false, error: action.payload,
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

export const fetchChecklist = url => (dispatch) => {
  dispatch({ type: FETCH_CHECKLIST_REQUEST });

  return axiosInstance({
    method: 'get',
    url: `/checklists/checklist/${url}/`,
  })
    .then((response) => {
      dispatch({ type: FETCH_CHECKLIST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: FETCH_CHECKLIST_FAILURE, payload: error.response.status });
    });
};
