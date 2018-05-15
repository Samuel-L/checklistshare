import reducer, { actions, initialState } from '../../src/redux-modules/checklist-adder';

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
});
