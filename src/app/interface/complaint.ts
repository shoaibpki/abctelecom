import { Service } from "./service";
import { User } from "./user";

export interface Complaint {
    $key?: string;
    complaint: string;
    status: string;
    service: Service;
    feedback?: string;
    complaintId?: number;
    referenceNo?: string;
    customer?: User;
    engineerId?: number;
    cdate: any; // complaint generated date
    jdate?: any; // complaint assigning to engineer date
    rdate?: any; // complaint resolved date

}
