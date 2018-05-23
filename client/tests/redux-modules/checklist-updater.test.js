import { axiosInstance } from '../../src/utils/axios-helpers';
import reducer, { actions, initialState } from '../../src/redux-modules/checklist-updater';



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
});
