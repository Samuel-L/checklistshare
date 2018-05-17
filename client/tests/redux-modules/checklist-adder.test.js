import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-adder';
import { createListOnBackend } from '../../src/redux-modules/checklist-adder';

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

  describe('helpers', () => {
    describe('createListOnBackend()', () => {
      it('resolves with response if successful', (done) => {
        expect.assertions(2);
        axiosInstanceMock.onPost('/checklists/lists/').reply(HttpStatus.CREATED, { id: 1, url: 'randomurl' });

        return createListOnBackend('name').then((response) => {
          expect(response.data.id).toEqual(1);
          expect(response.data.url).toEqual('randomurl');
          done();
        });
      });

      it('rejects with error if unsuccessful', (done) => {
        expect.assertions(1);
        axiosInstanceMock.onPost('/checklists/lists/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

        return createListOnBackend('error').catch((error) => {
          expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
          done();
        });
      });
    });
  });
});
