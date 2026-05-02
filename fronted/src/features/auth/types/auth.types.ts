export type LoginDTO = {
    email: string,
    password: string
}

export type User = {
    id: string;
    email: string;
    name: string;
};

export type AuthState = {
    user: User | null;
    token: string | null;
};