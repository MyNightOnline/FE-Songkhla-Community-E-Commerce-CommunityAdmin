export function formatThaiMobileNumber(mobileNumber: string): string {
    // Remove any non-digit characters from the input
    const cleanedNumber = mobileNumber.replace(/\D/g, '');
  
    // Check if the cleaned number starts with '0' and has a total length of 10 digits
    if (cleanedNumber.startsWith('0') && cleanedNumber.length === 10) {
      // Split the cleaned number into groups and format it
      const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      return formattedNumber;
    }

    if (cleanedNumber.length === 9) {
        // Split the cleaned number into groups and format it
        const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
        return formattedNumber;
      }
  
    // Return the original input if it doesn't match the expected format
    return mobileNumber;
  }