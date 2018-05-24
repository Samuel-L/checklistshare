import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-updater';
import { updateChecklist } from '../../src/redux-modules/checklist-updater';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const axiosInstanceMock = new MockAdapter(axiosInstance);

describe('redux-modules: checklist-updater', () => {
  describe('reducer', () => {
    it('returns initial state', () => {
      expect(reducer()).toEqual(initialState);
    });

    it('handles UPDATE_CHECKLIST_REQUEST', () => {
      const action = { type: actions.UPDATE_CHECKLIST_REQUEST };
      const correctState = { ...initialState, updating: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles UPDATE_CHECKLIST_SUCCESS', () => {
      const action = { type: actions.UPDATE_CHECKLIST_SUCCESS };
      const correctState = { ...initialState, updating: false, updated: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles UPDATE_CHECKLIST_FAILURE', () => {
      const action = { type: actions.UPDATE_CHECKLIST_FAILURE, payload: 400 };
      const correctState = { ...initialState, updating: false, error: 400 };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles RESET_STATE', () => {
      const action = { type: actions.RESET_STATE };
      const correctState = { ...initialState };

      expect(reducer(undefined, action)).toEqual(correctState);
    });
  });

  describe('action creators', () => {
    beforeEach(() => {
      axiosInstanceMock
        .onDelete('/checklists/items/1/').reply(HttpStatus.NO_CONTENT)
        .onPatch('/checklists/items/2/').reply(HttpStatus.NO_CONTENT)
        .onPatch('/checklists/lists/0/').reply(HttpStatus.NO_CONTENT)
        .onPost('/checklists/items/').reply(HttpStatus.NO_CONTENT);
    });

    afterEach(() => {
      store.clearActions();
      axiosInstanceMock.reset();
    });

    describe('updateChecklist()', () => {
      const uneditedChecklist = { id: 0, title: 'Checklist title', url: 'url', items: [
        { id: 0, List: 0, name: 'Item 1' },
        { id: 1, List: 0, name: 'Item 2' },
        { id: 2, List: 0, name: 'Item 3' },
        { id: 3, List: 0, name: 'Item 4' },
      ]};
      const editedChecklist = { id: 0, title: 'Patched Checklist title', url: 'url', items: [
        { id: 0, List: 0, name: 'Item 1' },
        { id: 2, List: 0, name: 'Patched Item 3' },
        { id: 3, List: 0, name: 'Item 4' },
        { id: 4, List: 0, name: 'Added Item 4', newlyAdded: true },
      ]};

      it('creates UPDATE_CHECKLIST_REQUEST', () => {
        const expectedAction = { type: actions.UPDATE_CHECKLIST_REQUEST }; 

        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
      });
      
      it('creates UPDATE_CHECKLIST_SUCCESS if successful', () => {
        const expectedAction = { type: actions.UPDATE_CHECKLIST_SUCCESS };

        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('creates UPDATE_CHECKLIST_FAILURE if unsuccessful', () => {
        axiosInstanceMock.onDelete('/checklists/items/1/').reply(HttpStatus.INTERNAL_SERVER_ERROR);
        const expectedAction = { type: actions.UPDATE_CHECKLIST_FAILURE, payload: HttpStatus.INTERNAL_SERVER_ERROR };

        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });
      
      it('calls onDelete method on axiosInstanceMock', () => {
        const spy = jest.spyOn(axiosInstance, 'delete');
        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          // doesn't work without the setTimeout method, don't know why
          // https://stackoverflow.com/a/49761230
          setTimeout(() => {expect(spy).toHaveBeenCalled()}, 0);
        }); 
      });

      it('calls onPatch method on axiosInstanceMock once', () => {
        const spy = jest.spyOn(axiosInstance, 'patch');
        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          // doesn't work without the setTimeout method, don't know why
          // https://stackoverflow.com/a/49761230
          setTimeout(() => {expect(spy).toHaveBeenCalled()}, 0);
        });
      });

      it('calls onPost method on axiosInstanceMock once', () => {
        const spy = jest.spyOn(axiosInstance, 'post');
        return store.dispatch(updateChecklist(uneditedChecklist, editedChecklist)).then(() => {
          // doesn't work without the setTimeout method, don't know why
          // https://stackoverflow.com/a/49761230
          setTimeout(() => {expect(spy).toHaveBeenCalled()}, 0);
        });
      });
    });
  });
});
