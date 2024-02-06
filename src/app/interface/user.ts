import { Complaint } from "./complaint";
import { Service } from "./service";

export interface User {
    id: number;
    userName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    pinCode?: string;
    services?: Service[];
    complaints?: Complaint[];

}
