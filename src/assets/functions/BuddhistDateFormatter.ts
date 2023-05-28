export class BuddhistDateFormatter {
    private readonly date: Date;
    private static readonly YEAR_OFFSET = 543;
  
    constructor(date: Date) {
      this.date = date;
    }
  
    public format(): string {
      let newDate = new Date(this.date);
      const day = newDate.getDate().toString().padStart(2, "0");
      const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get month in 1-12 format
      // const year = newDate.getFullYear() + BuddhistDateFormatter.YEAR_OFFSET;
      const year = newDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    }
  }