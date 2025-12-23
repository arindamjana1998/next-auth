// Format phone number
export const formatPhoneNumber = (phone: number | string): string => {
  const phoneStr = String(phone);
  if (phoneStr.length === 12 && phoneStr.startsWith("91")) {
    return `+${phoneStr}`;
  }
  if (phoneStr.length === 10) {
    return `+91${phoneStr}`;
  }
  return phoneStr;
};
