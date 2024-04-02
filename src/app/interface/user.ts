import { Complaint } from "./complaint";
import { Service } from "./service";

export interface User {
    $key?: string;
    id: number;
    userName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    joiningDate: Date;
    pinCode?: string;
    services?: Service[];
    complaints?: Complaint[];

}
