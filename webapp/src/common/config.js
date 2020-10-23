export const getBaseUrl = () => {
    console.log(process.env.NODE_ENV);
    return (process.env.NODE_ENV) ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCALHOST;
};