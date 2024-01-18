export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    role: string;
    pinCode?: string;
    services?: any[];
    complaints?: any[];

}
