import { SCREEN_NAMES } from '../../common/screenName';

const SET_SCREEN = 'SET-SCREEN';
const SET_LEVEL_LINE = 'SET-LEVEL-LINE';
const SET_VALUE_USER_DATA = 'SET-VALUE-USER-DATA';

const initialState = {
  levelProgressLine: 1,
  quantityLevelLine: 3,
  currentScreen: SCREEN_NAMES.LOGIN_FORM,
  userData: {},
};


const StateApp = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SCREEN:
      return { ...state, currentScreen: payload };
    case SET_LEVEL_LINE:
      return { ...state, levelProgressLine: payload };
    case SET_VALUE_USER_DATA:
      return { ...state, userData: { ...state.userData, ...payload } };
    default:
      return state;
  }
};

export const setScreen = payload => ({ type: SET_SCREEN, payload });
export const setLevelProgressLine = payload => ({ type: SET_LEVEL_LINE, payload });
export const setValueUserData = payload => ({ type: SET_VALUE_USER_DATA, payload });

export default StateApp;
