import {
  getItemsToBeDeleted,
  getItemsToBePatched,
  getItemsToBeAdded,
} from '../../../src/redux-modules/helpers/filterHelpers';

describe('filterHelpers', () => {

  describe('getItemsToBeDeleted()', () => {
    const unEditedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 1, List: 0, name: 'item 2' },
      { id: 2, List: 0, name: 'item 3' },
    ]};
    const editedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 5, List: 0, name: 'item 4' },
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

  describe('getItemsToBePatched()', () => {
     const unEditedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 1, List: 0, name: 'item 2' },
      { id: 2, List: 0, name: 'item 3' },
    ]};
    const editedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 1, List: 0, name: 'item 9' },
      { id: 2, List: 0, name: 'item 10' },

    ]};
    const items = getItemsToBePatched(unEditedChecklist, editedChecklist);

    it('returns an array', () => {
      expect(Array.isArray(items)).toBe(true);
    });

    it('returns items that should be patched', () => {
      expect(items.length).toEqual(2);
      expect(items[0].name).toEqual('item 9');
      expect(items[1].name).toEqual('item 10');
    });

    it('returns an empty array if no items should be patched', () => {
      const items = getItemsToBePatched(unEditedChecklist, unEditedChecklist);

      expect(items.length).toEqual(0);
    });
  });

  describe('getItemsToBeAdded()', () => {
     const unEditedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 1, List: 0, name: 'item 2' },
      { id: 2, List: 0, name: 'item 3' },
    ]};
    const editedChecklist = { items: [
      { id: 0, List: 0, name: 'item 1' },
      { id: 3, List: 0, name: 'item 11', newlyAdded: true },
    ]};
    const items = getItemsToBeAdded(unEditedChecklist, editedChecklist);

    it('returns an array', () => {
      expect(Array.isArray(items)).toBe(true);
    });

    it('returns items that should be added', () => {
      expect(items.length).toEqual(1);
      expect(items[0].newlyAdded).toBe(true);
    });

    it('returns an empty array if no items should be added', () => {
      const items = getItemsToBeAdded(unEditedChecklist, unEditedChecklist);

      expect(items.length).toEqual(0);
    });
  });
});
