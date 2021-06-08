import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({ AuthReducer, ReportReducer });
