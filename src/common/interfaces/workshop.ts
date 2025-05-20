import { IUser } from "./user";


export interface IRating {
  id: number;
  stars: number;
  comment?: string;
  user: IUser
  workshop: Workshop;
  createdAt: string; // or Date, depending on how you use it
  updatedAt: string; // or Date
}

export interface Workshop {
    id: number;
    name: string;
    logo: {
      url: string;
      fileId: string;
    };
    workshopType:string;
    contactNumber: string;
    city: string;
    fullAddress: string;
    selectedServices: string[];
    sparePartsAvailable: string;
    serviceMode:  string;
    workingDays: string[];
    openingTime: string; 
    closingTime: string; 
    createdAt: string; 
    updatedAt: string; 
    reviews:IRating[]
  }
  