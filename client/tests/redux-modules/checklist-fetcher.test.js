import reducer, { actions, initialState } from '../../src/redux-modules/checklist-fetcher';

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
});
