export const firstCharToUpperCase = (str: string) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
};

export const firstCharToLowerCase = (str: string) => {
    return str?.charAt(0).toLocaleLowerCase() + str?.slice(1);
};
