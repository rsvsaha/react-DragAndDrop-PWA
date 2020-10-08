import {combineReducers} from 'redux';
import {appStateReducer} from './appStateAndReducer';

export const rootReducer = combineReducers(
    {appStateReducer:appStateReducer}
);