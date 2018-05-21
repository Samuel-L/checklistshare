import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-fetcher';
import { fetchChecklist } from '../../src/redux-modules/checklist-fetcher';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const axiosInstanceMock = new MockAdapter(axiosInstance);

describe('redux-modules: checklist-fetcher', () => {
  describe('reducer', () => {
    it('returns initial state', () => {
      expect(reducer()).toEqual(initialState);
    });

    it('handles FETCH_CHECKLIST_REQUEST', () => {
      const action = { type: actions.FETCH_CHECKLIST_REQUEST };
      const correctState = { ...initialState, fetching: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles FETCH_CHECKLIST_SUCCESS', () => {
      const checklist = { title: 'title' };
      const action = { type: actions.FETCH_CHECKLIST_SUCCESS, payload: checklist }; 
      const correctState = { ...initialState, fetching: false, fetched: true, checklist };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles FETCH_CHECKLIST_FAILURE', () => {
      const action = { type: actions.FETCH_CHECKLIST_FAILURE, payload: 500 };
      const correctState = { ...initialState, fetching: false, error: 500 };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles RESET_STATE', () => {
      const action = { type: actions.RESET_STATE };
      const correctState = { ...initialState };

      expect(reducer(undefined, action)).toEqual(correctState);
    });
  });

  describe('action creators', () => {
    describe('fetchChecklist()', () => {
      const workingURL = 'workingUrl';
      const failingURL = 'failingUrl';

      beforeEach(() => {
        axiosInstanceMock
          .onGet(`/checklists/checklist/${workingURL}/`).reply(HttpStatus.OK, { 'title': 'checklist title' })
          .onGet(`/checklists/checklist/${failingURL}/`).reply(HttpStatus.NOT_FOUND);
      });

      afterEach(() => {
        store.clearActions();
      });

      it('created FETCH_CHECKLIST_REQUEST', () => {
        const expectedAction = { type: actions.FETCH_CHECKLIST_REQUEST };

        return store.dispatch(fetchChecklist(workingURL)).then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });
      });

      it('creates FETCH_CHECKLIST_SUCCESS when successful', () => {
        const expectedAction = { type: actions.FETCH_CHECKLIST_SUCCESS, payload: { 'title': 'checklist title' }}; 

        return store.dispatch(fetchChecklist(workingURL)).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });

      it('creates FETCH_CHECKLIST_FAILURE when unsuccessful', () => {
        const expectedAction = { type: actions.FETCH_CHECKLIST_FAILURE, payload: HttpStatus.NOT_FOUND };

        return store.dispatch(fetchChecklist(failingURL)).then(() => {
          expect(store.getActions()[1]).toEqual(expectedAction);
        });
      });
    });
  });
});
