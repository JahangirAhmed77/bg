export const formatDate = (dateString) => {
    if (!dateString) return "—"; // fallback for null/empty
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getCurrentDateISO = () => {
    return new Date().toISOString();
};

