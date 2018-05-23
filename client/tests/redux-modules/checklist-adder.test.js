import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-adder';
import { addChecklist } from '../../src/redux-modules/checklist-adder';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const axiosInstanceMock = new MockAdapter(axiosInstance);

describe('redux-modules: checklist-adder', () => {
  describe('reducer', () => {
    it('returns initial state', () => {
      expect(reducer()).toEqual(initialState);
    });

    it('handles ADD_CHECKLIST_REQUEST', () => {
      const action = { type: actions.ADD_CHECKLIST_REQUEST };
      const correctState = { ...initialState, adding: true };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles ADD_CHECKLIST_SUCCESS', () => {
      const action = { type: actions.ADD_CHECKLIST_SUCCESS, payload: 'randomizedUrl' };
      const correctState = { ...initialState, adding: false, added: true, url: 'randomizedUrl' };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles ADD_CHECKLIST_FAILURE', () => {
      const action = { type: actions.ADD_CHECKLIST_FAILURE, payload: 404 };
      const correctState = { ...initialState, adding: false, error: 404 };

      expect(reducer(undefined, action)).toEqual(correctState);
    });

    it('handles RESET_STATE', () => {
      const action = { type: actions.RESET_STATE };
      const correctState = { ...initialState };

      expect(reducer(undefined, action)).toEqual(correctState);
    });
  });

  beforeEach(() => {
    axiosInstanceMock.reset();
  });

    describe('action creators', () => {
      describe('addChecklist()', () => {
        beforeEach(() => {
          axiosInstanceMock
            .onPost('/checklists/lists/').reply(HttpStatus.CREATED, { id: 1, url: 'randomurl' })
            .onPost('/checklists/items/').reply(HttpStatus.CREATED);
        });

        afterEach(() => {
          store.clearActions();
        });

        const name = 'name';
        const items = [{ name: 'name' }, { name: 'name' }];

        it('created ADD_CHECKLIST_REQUEST', () => {
          const expectedAction = { type: actions.ADD_CHECKLIST_REQUEST };

          return store.dispatch(addChecklist(name, items)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
          });
        });

        it('creates ADD_CHECKLIST_SUCCESS when successful', () => {
          const expectedAction = { type: actions.ADD_CHECKLIST_SUCCESS, payload: 'randomurl' };

          return store.dispatch(addChecklist(name, items)).then(() => {
            expect(store.getActions()[1]).toEqual(expectedAction);
          });
        });

        it('creates ADD_CHECKLIST_FAILURE when unsuccessful', () => {
          axiosInstanceMock.onPost('/checklists/lists/').reply(HttpStatus.INTERNAL_SERVER_ERROR);
          const expectedAction = {
            type: actions.ADD_CHECKLIST_FAILURE,
            payload: HttpStatus.INTERNAL_SERVER_ERROR,
          };

          return store.dispatch(addChecklist(name, items)).then(() => {
            expect(store.getActions()[1]).toEqual(expectedAction);
          });
        });
      });
    });
  });
