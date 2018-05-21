import { combineReducers } from 'redux';

import checklistAdderReducer from './checklist-adder';
import checklistFetcherReducer from './checklist-fetcher';

export default combineReducers({
  checklistAdderReducer,
  checklistFetcherReducer,
});
