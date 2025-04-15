import { IUser } from "./user";
import { Workshop } from "./workshop";

export interface IBooking {
    id: number;
    date: string;
    time: string;
    status: BookingStatus; 
    user: IUser;
    workshop:Workshop
    services: string[];
    serviceType:string;
    problemDescription?: string | null;
    createdAt: Date; 
  }

  export enum BookingStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
  }
  