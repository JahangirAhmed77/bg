// Extract year and month from a date string (format: YYYY-MM-DD)
export const getYearAndMonth = (dateString) => {
    const date = new Date(dateString);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-based
    };
};

// Get number of days in a given month/year
export const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // Month is 1-based
};
