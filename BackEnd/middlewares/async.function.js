const asyncFun = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next); 
        } catch (error) {
            next(error); 
        }
    };
};

export default asyncFun;
