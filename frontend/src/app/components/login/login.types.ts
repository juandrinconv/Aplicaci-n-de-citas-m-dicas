export type UserComplete = {
    token?:      string;
    user_names?: UserNames;
    response:   string;
}

export type UserNames = {
    first_name: string;
    last_name:  string;
    username: string;
}