import { combineReducers } from 'redux';

import checklistAdderReducer from './checklist-adder';
import checklistFetcherReducer from './checklist-fetcher';
import checklistUpdaterRedcuer from './checklist-updater';

export default combineReducers({
  checklistAdderReducer,
  checklistFetcherReducer,
  checklistUpdaterRedcuer,
});
