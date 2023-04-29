export function formatDate(oldDate: Date): string {
    let newDate = new Date(oldDate);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get month in 1-12 format
    const year = newDate.getFullYear() + 543;
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}