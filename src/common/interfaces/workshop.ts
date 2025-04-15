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
  }
  