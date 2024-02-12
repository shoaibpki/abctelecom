import { Service } from "./service";
import { User } from "./user";

export interface Complaint {
    complaint: string;
    status: string;
    service: Service;
    feedback?: string;
    complaintId?: number;
    referenceNo?: string;
    customer?: User;
    engineerId?: number;
    cdate?: Date; // complaint generated date
    jdate?: Date; // complaint assigning to engineer date
    rdate?: Date; // complaint resolved date

}
