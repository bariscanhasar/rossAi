import {AuthFailureError, InternalError} from '../core/apiError';
import JWT, {JwtPayload} from '../core/jwt';
import {User} from '../orm/model/User/User'





// Function to retrieve access token from Authorization header
export const getAccessToken = (authorization?: string) => {
    if (!authorization) throw new AuthFailureError('Invalid Authorization');
    if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization')
    const token = authorization.split(' ')[1]
    return token
}
// Function to validate token data
export const validateTokenData = (payload: JwtPayload): boolean => {
    if (!payload.user_id) throw new AuthFailureError('Invalid Access Token');

    return true;
};

// Function to create tokens for a User
export const createTokens = async (
    user: User | null,
) => {
    const token = await JWT.encode(
        new JwtPayload(
            user?.id!, // We use the User's ID in the JWT payload
        ),
    );

     return {
        token,
    };
};


