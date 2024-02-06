export const cleanPhoneNumber = (value: string): string => {
  const cleanedValue = value.replace(/[() -]/g, '');
  return cleanedValue;
};
