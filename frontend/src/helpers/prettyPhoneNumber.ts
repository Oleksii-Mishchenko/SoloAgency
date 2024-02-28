export const prettyPhoneNumber = (phoneNumber: string): string => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const formattedPhoneNumber = `+${digitsOnly.substring(0, 2)} (${digitsOnly.substring(2, 5)}) ${digitsOnly.substring(5, 8)}-${digitsOnly.substring(8, 10)}-${digitsOnly.substring(10)}`;

  return formattedPhoneNumber;
};
