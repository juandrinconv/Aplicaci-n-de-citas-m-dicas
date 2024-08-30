export type UserComplete = {
    response: string;
    user?:     User;
}

export type User = {
    username:   string;
    email:      string;
    password:   string;
    first_name: string;
    last_name:  string;
}