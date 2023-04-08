import { createStore } from 'redux';

const initialState = {
  appointments: [],
  fullName:"no name"
};

function appointmentReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
      case 'ADD_Name':
        return {
          ...state,
          fullName:action.payload,
        };
    default:
      return state;
  }
}

const store = createStore(appointmentReducer);

export default store;
