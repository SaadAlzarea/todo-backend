export const dateValidator = (date: string): Date => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    return parsedDate;
};
