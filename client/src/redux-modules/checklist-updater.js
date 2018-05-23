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

export const getItemsToBeDeleted = (unEditedChecklist, editedChecklist) => {
  const items = unEditedChecklist['items'].filter((item) => {
    let exists;

    editedChecklist['items'].forEach((eItem) => {
      if (item.id === eItem.id) {
        exists = true;
      }
    });
    
    if (!exists) {
      return item;
    }
  });

  return items;
};

export const deleteItemsFromBackend = (items) => {
  const promise = new Promise((resolve, reject) => {
    items.forEach((item) => {
      axiosInstance({
        method: 'delete',
        url: `/checklists/items/${item.id}/`,
      })
        .catch((error) => {
          reject(error);
        })
    }, resolve(true));
  });

  return promise;
};
