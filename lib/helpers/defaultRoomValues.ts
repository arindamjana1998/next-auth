import { RoomDataInterface } from "@/interface/room.interface";
import {
  roomDefaultValues,
  RoomFormValues,
} from "@/lib/validators/room.schema";
import { formatDate } from "@/lib/helpers/formatDate";

export const RoomDefaultValues = (
  initialData?: Partial<RoomDataInterface>
): RoomFormValues => {
  if (!initialData) {
    return roomDefaultValues;
  }

  return {
    ...roomDefaultValues,
    RoomName: initialData.RoomName || "",
    RoomOwner: initialData.RoomOwner || "",
    ContactNumber: initialData.ContactNumber
      ? String(initialData.ContactNumber)
      : "",
    SecondaryContactNumber: initialData.SecondaryContactNumber
      ? String(initialData.SecondaryContactNumber)
      : "",
    IsActive: initialData.IsActive || "Yes",
    isDeletedRoom: initialData.isDeletedRoom || false,
    RoomAddress: initialData.RoomAddress || "",
    AdvertisementStartDate: formatDate(initialData.AdvertisementStartDate),
    AdvertisementEndDate: formatDate(initialData.AdvertisementEndDate),
    RentPrice: initialData.RentPrice ? String(initialData.RentPrice) : "",
    RentType: (initialData.RentType as RoomFormValues["RentType"]) || "PG",
    RoomType: (initialData.RoomType as RoomFormValues["RoomType"]) || "Male",
    Description: initialData.Description || "",
    District: initialData.District || "",
    State: initialData.State || "",
    PinCode: initialData.PinCode ? String(initialData.PinCode) : "",
    images: null,
    VideoLink: initialData.VideoLink || "",
    VideoLinkId: initialData.VideoLinkId || "",
    NoOfBed: initialData.NoOfBed ? String(initialData.NoOfBed) : "",
    NoOfShare: initialData.NoOfShare ? String(initialData.NoOfShare) : "",
    NoOfWashroom: initialData.NoOfWashroom
      ? String(initialData.NoOfWashroom)
      : "",
    IsAc: initialData.IsAc === true || false,
    IsTv: initialData.IsTv || false,
    IsAquaguard: initialData.IsAquaguard || false,
    IsWifi: initialData.IsWifi || false,
    IsParking: initialData.IsParking || false,
    IsElevator: initialData.IsElevator || false,
    IsGeyser: initialData.IsGeyser || false,
    IsPowerBackup: initialData.IsPowerBackup || false,
    IsCCTV: initialData.IsCCTV || false,
    IsKitchen: initialData.IsKitchen || false,
    IsRefrigerator: initialData.IsRefrigerator || false,
    IsFoodFacilities: initialData.IsFoodFacilities === false,
    IsBedProvided: initialData.IsBedProvided || false,
    IsSecurityGuard: initialData.IsSecurityGuard || false,
  };
};
