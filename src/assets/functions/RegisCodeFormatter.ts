export function formatRegisCode(input: string): string {
    const matches =
      input.match(/^(?:(\d)-)?(\d{2})-(\d{2})\/(\d)-(\d{4})$/) ||
      input.match(/^(\d)(\d{2})(\d{2})(\d{2})(\d)-(\d{4})$/);
    
    if (matches) {
      const [_, firstPart, secondPart, thirdPart, fourthPart, fifthPart] = matches;
      return `${firstPart}-${secondPart}-${thirdPart}/${fourthPart}-${fifthPart}`;
    }
    
    return input;
  }