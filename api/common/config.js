const getDatabaseUri = () => {
    return (process.env.NODE_ENV) ? process.env.MONGODB_HOST : process.env.MONGODB_LOCALHOST;
};

module.exports = {
    getDatabaseUri
}
