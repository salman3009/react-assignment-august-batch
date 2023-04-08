export function addAppointment(appointment) {
    return { 
        type: 'ADD_APPOINTMENT', 
        payload: appointment 
    };
}

export function addNewName(input) {
    return { 
        type: 'ADD_Name', 
        payload: input 
    };
}
  