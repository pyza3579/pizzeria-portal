import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({tables}) => tables.data;
export const getLoadingState = ({tables}) => tables.loading;


/* action name creator */
const reducerName = 'tables';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_UPDATE = createActionName('FETCH_UPDATE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchUpdate = payload => ({ payload, type: FETCH_UPDATE });

/* thunk creators */
export const fetchFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    console.log('fetchStarted',dispatch);
    console.log('url =>',`${api.url}/${api.tables}`);
    Axios
      .get(`${api.url}/${api.tables}`)
      .then(res => {
        console.log('then ',res);
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        console.log('error',err);
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updateApp = (rowId, status) => {
  return (dispatch, getState) => {
    

    Axios
      .get(`${api.url}/${api.tables}`)
      .then(res => {
        console.log('then ',res);
        dispatch(fetchUpdate({rowId, status}));
      })
      .catch(err => {
        console.log('error',err);
        dispatch(fetchError(err.message || true));
      });
    
    
  };
};
/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_UPDATE: {
      const data = [...statePart.data].filter(el => el.id !== action.payload.rowId);
      const orderToUpdate = [...statePart.data].find(el => el.id === action.payload.rowId);
      orderToUpdate.status = action.payload.status;
      console.log (statePart);
      const result = [...data, orderToUpdate].sort((orderPrev, orderNext) => {
        return orderPrev.id - orderNext.id;
      });
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: result,
      };
    }
    default:
      return statePart;
  }
}