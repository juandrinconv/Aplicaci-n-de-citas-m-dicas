export type UserNames = {
    first_name: string;
    last_name:  string;
}

export type Token = {
    token: string
}

export type CheckAuthToken = {
    response: string;
}

  export type AppointmentsResponse = {
    ids: string[];
    dates: string[];
    times: string[];
    specialty: string[];       
    doctor_names: string[];         
    locations: string[];            
  }