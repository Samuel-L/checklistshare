import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-updater';
import {
  getItemsToBeDeleted,
  deleteItemsFromBackend,
} from '../../src/redux-modules/checklist-updater';

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

  beforeEach(() => {
    axiosInstanceMock.reset();
  });

  describe('helpers', () => {
    describe('getItemsToBeDeleted()', () => {
      const unEditedChecklist = { items: [
        { id: 0, List: 0, name: 'item 1' },
        { id: 1, List: 0, name: 'item 2' },
        { id: 2, List: 0, name: 'item 3' },
      ]};
      const editedChecklist = { items: [
        { id: 0, List: 0, name: 'item 1' },
      ]};
      const items = getItemsToBeDeleted(unEditedChecklist, editedChecklist); 

      it('returns an array', () => {
        expect(Array.isArray(items)).toBe(true);
      });

      it('returns items that should be deleted', () => {
        expect(items.length).toEqual(2);
        expect(items[0].id).toBe(1);
        expect(items[1].id).toBe(2);
      });

      it('returns an empty array if no items should be deleted', () => {
        const items = getItemsToBeDeleted(unEditedChecklist, unEditedChecklist);

        expect(items.length).toEqual(0);
      });
    });

    describe('getItemsToBeDeleted()', () => {
      it('resolves with true if successful', (done) => {
        expect.assertions(1);
        axiosInstanceMock.onDelete('/checklists/items/1/').reply(HttpStatus.NO_CONTENT);

        return deleteItemsFromBackend([{ id: 1 }]).then((response) => {
          expect(response).toBe(true);
          done();
        });
      });

      it.skip('rejects with false if unsuccessful', (done) => {
        expect.assertions(1);
        axiosInstanceMock.onDelete('/checklists/items/1/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

        return deleteItemsFromBackend([{ id: 1 }]).catch((error) => {
          expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
          done();
        });
      });
    });
  });
});
