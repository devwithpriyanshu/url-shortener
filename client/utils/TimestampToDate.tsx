const timestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

export default timestampToDate;