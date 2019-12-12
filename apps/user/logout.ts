import cookie from 'cookie';

const logout = async (req: any, res: any) => {

    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 10000)
    }));

    res.send({message: 'Logged out'});

}

export default logout;