import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../../src/utils/axios-helpers';
import {
  createListOnBackend,
  createItemsOnBackend,
  getItemsToBeDeleted,
  deleteItemsFromBackend,
} from '../../../src/redux-modules/helpers/backendHelpers';

const axiosInstanceMock = new MockAdapter(axiosInstance);

describe('backendHelpers', () => {
  beforeEach(() => {
    axiosInstanceMock.reset();
  });

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

  describe('createItemsOnBackend', () => {
    it('resolves with true if successful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPost('/checklists/items/').reply(HttpStatus.CREATED);
      const items = [{ name: 'item' }];

      return createItemsOnBackend(1, items).then((response) => {
        expect(response).toBe(true);
        done();
      });
    });

    it.skip('rejects with error if unsuccessful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPost('/checklists/items/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

      return createItemsOnBackend(1, [{ name: 'item' }]).catch((error) => {
        expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      });
    });
  });

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

  describe('deleteItemsFromBackend()', () => {
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
