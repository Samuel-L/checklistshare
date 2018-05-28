import MockAdapter from 'axios-mock-adapter';
import HttpStatus from 'http-status-codes';

import { axiosInstance } from '../../../src/utils/axios-helpers';
import {
  createListOnBackend,
  createItemsOnBackend,
  getItemsToBeDeleted,
  deleteItemsFromBackend,
  getItemsToBePatched,
  getItemsToBeAdded,
  patchItemsOnBackend,
  patchChecklistTitleOnBackend,
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

    it('rejects with error if unsuccessful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPost('/checklists/items/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

      return createItemsOnBackend(1, [{ name: 'item' }]).catch((error) => {
        expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      });
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

    it('rejects with false if unsuccessful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onDelete('/checklists/items/1/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

      return deleteItemsFromBackend([{ id: 1 }]).catch((error) => {
        expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      });
    });
  });

  describe('patchItemsOnBackend()', () => {
    it('resolves with true if successful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPatch('/checklists/items/1/').reply(HttpStatus.NO_CONTENT);

      return patchItemsOnBackend([{ id: 1, name: 'new name' }]).then((response) => {
        expect(response).toBe(true);
        done();
      });
    });

    it('rejects with false if unsuccessful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPatch('/checklists/items/1/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

      return patchItemsOnBackend([{ id: 1, name: 'new name' }]).catch((error) => {
        expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      });
    });
  });

  describe('patchChecklistTitleOnBackend()', () => {
    it('resolves with response if successful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPatch('/checklists/lists/1/').reply(HttpStatus.NO_CONTENT);

      return patchChecklistTitleOnBackend(1, 'new title').then((response) => {
        expect(response).toBe(true);
        done();
      });
    });

    it('rejects with error if unsuccessful', (done) => {
      expect.assertions(1);
      axiosInstanceMock.onPatch('/checklists/lists/1/').reply(HttpStatus.INTERNAL_SERVER_ERROR);

      return patchChecklistTitleOnBackend(1, 'new title').catch((error) => {
        expect(error.response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      });
    });
  });
});
