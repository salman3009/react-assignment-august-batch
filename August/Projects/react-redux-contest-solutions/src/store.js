import { createStore } from 'redux';

const initialState = {
  appointments: [],
};

function appointmentReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    default:
      return state;
  }
}

const store = createStore(appointmentReducer);

export default store;
