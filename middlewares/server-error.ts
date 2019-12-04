const serverErrorMiddleware = (error: any, req: any, res: any, next: any) => {   
    return res.status(504).json({message: 'Server error'});
};

export default serverErrorMiddleware;