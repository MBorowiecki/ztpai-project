import { JwtService } from '@nestjs/jwt';

export const validateRequest = (request: Request, jwtService: JwtService) => {
  const authorization = request.headers['authorization'];
  if (!authorization) {
    return false;
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return false;
  }

  try {
    const verifiedToken = jwtService.verify(token);

    return !!verifiedToken;
  } catch (e) {
    return false;
  }
};
