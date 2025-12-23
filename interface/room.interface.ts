export interface RoomDataInterface {
  Id: number;
  id: string;
  RoomName: string;
  RoomOwner: string;
  ContactNumber: number | string;
  SecondaryContactNumber: string;
  IsActive: "Yes" | "No" | "Deleted";
  isDeletedRoom: boolean;
  RoomAddress: string;
  AdvertisementStartDate: string;
  AdvertisementEndDate: string;
  RentPrice: number | string;
  RentType: "PG" | "Room" | "Room & PG";
  RoomType: "Male" | "Female" | "Family";
  Description: string;
  District: string;
  State: string;
  PinCode: string;
  Image1: string;
  Image2: string;
  Image3: string;
  Image4: string;
  VideoLink: string;
  VideoLinkId: string;
  NoOfBed: string;
  NoOfShare: string;
  NoOfWashroom: string;
  IsAc: boolean;
  IsTv: boolean;
  IsAquaguard: boolean;
  IsWifi: boolean;
  IsParking: boolean;
  IsElevator: boolean;
  IsGeyser: boolean;
  IsPowerBackup: boolean;
  IsCCTV: boolean;
  IsKitchen: boolean;
  IsRefrigerator: boolean;
  IsFoodFacilities: boolean;
  IsBedProvided: boolean;
  IsSecurityGuard: boolean;
}

export interface RoomCardPropsInterface {
  room: RoomDataInterface;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface RoomSummaryPropsInterface {
  room: RoomDataInterface;
}

export interface RoomMediaPropsInterface {
  videoUrl?: string;
  videoId?: string;
  images: string[];
  roomName: string;
}
