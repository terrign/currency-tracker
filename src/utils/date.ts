export const toStringDate = (date: Date) => date.toISOString().split('T')[0];

export const today = () => toStringDate(new Date(Date.now()));

export const currentYear = () => new Date(Date.now()).getFullYear();
