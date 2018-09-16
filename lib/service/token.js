'use strict';

import Constant from "../core/constant";
import jwt from 'jsonwebtoken';

class TokenService {
    verify = (token) => {
        const data = jwt.verify(token, Constant.jwt.secret)
        return data;
    }
    generate = (data) => {
        const token = jwt.sign(data, Constant.jwt.secret, {expiresIn: Constant.jwt.expiresIn})
        return token;
    }
}

export default new TokenService();