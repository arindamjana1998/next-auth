export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return dateString.includes("T") ? dateString.split("T")[0] : dateString;
};
