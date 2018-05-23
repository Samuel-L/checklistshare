import reducer, { actions, initialState } from '../../src/redux-modules/checklist-updater';
import { getItemsToBeDeleted } from '../../src/redux-modules/checklist-updater';

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
  });
});
