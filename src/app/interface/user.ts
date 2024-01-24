import { Service } from "./service";

export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    role: string;
    pinCode?: string;
    services?: Service[];
    complaints?: any[];

}
