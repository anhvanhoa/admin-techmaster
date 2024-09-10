export const sorter =
    <T>(key: keyof T) =>
    (a: T, b: T) => {
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            return a[key].localeCompare(b[key]) as any;
        }
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return a[key] - b[key];
        }
        return 0;
    };
