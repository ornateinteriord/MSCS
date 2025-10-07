import moment from "moment";

export const getFormattedDate = (date: Date | string) => {
    const dateformats =[
        moment.ISO_8601,   // Handles "2025-02-14T19:18:09.013Z"
        "DD/MM/YYYY",      // Handles "21/02/2025"
        "DD-MM-YYYY",      // Handles "22-12-2025"
        "DD MMM , YYYY",   // Handles "20 Feb , 2025"
        "YYYY/MM/DD",      // Handles "2025/02/14"
        "YYYY-MM-DD",      // Handles "2025-02-14"
        "MM/DD/YYYY",      // Handles "02/14/2025" (US format)
        "MMMM D, YYYY",    // Handles "February 14, 2025"
        "MMM D, YYYY",     // Handles "Feb 14, 2025"
        "D MMM YYYY"       // Handles "14 Feb 2025" (without comma)
    ];
    
    if (!date) return "-"; // Handle empty/null values

    const parsedDate = moment(date, dateformats, true);
    
    return parsedDate.isValid() ? parsedDate.format("DD MMM , YYYY") : "Invalid Date";
};


export const getFormattedName = (name: string) => {
    return name?.split(" ")?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(" ");
}
