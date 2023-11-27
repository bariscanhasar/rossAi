import {promisify} from 'util';
import {sign, verify} from 'jsonwebtoken';
import {BadTokenError} from './apiError';
import Logger from './logger';


export class JwtPayload {
    user_id: number;
    exp: number;

    constructor(
        userId: number,
    ) {
        this.user_id = userId;
        this.exp = Math.floor(Date.now() / 1000) + 1000000
    }
}


async function encode(payload: JwtPayload): Promise<string> {
    // @ts-ignore
    return promisify(sign)({...payload}, 'secretKey');
}

// @ts-ignore
async function validate(token: string): Promise<JwtPayload> {
    try {
        // @ts-ignore
        return (await promisify(verify)(token, 'secretKey')) as JwtPayload;
    } catch (e: any) {
        Logger.debug(e);
        // throws error if the token has not been encrypted by the private key
        throw new BadTokenError();
    }
}


/**
 * Returns the decoded payload if the signature is valid even if it is expired
 */
// async function decode(token: string): Promise<JwtPayload> {
//
//   try {
//     // @ts-ignore
//     return (await promisify(Verify)(token,  {
//       ignoreExpiration: true,
//     })) as JwtPayload;
//   } catch (e) {
//     Logger.debug(e);
//     throw new BadTokenError();
//   }
// }

export default {
    encode,
    validate,
    // decode,
};