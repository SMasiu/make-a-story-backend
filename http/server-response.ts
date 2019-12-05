export const notFound = (res: any) => {
    return res.status(404).json({message: 'Resource not found'});
}

export const serverError = (res: any) => {
    return res.status(504).json({message: 'Server error'});
}

export const badRequest = (res: any) => {
    return res.status(400).json({message: 'Invalid data'});
}

export const unauthorized = (res: any) => {
    return res.status(401).json({message: 'Unauthorized user'});
}