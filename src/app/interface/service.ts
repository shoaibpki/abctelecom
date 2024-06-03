import { User } from "./user";

export interface Service {
    serviceId: number;
    name: string;
    Description?: string;
    image?: string;
    users?: User[];
    showService?: boolean;
}
