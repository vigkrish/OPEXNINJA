import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../validators';
import { ApiError } from '../middleware/errorHandler';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async register(input: RegisterInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new ApiError('USER_EXISTS', 409, 'Email already registered');
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, ...tokens };
  }

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new ApiError('INVALID_CREDENTIALS', 401, 'Invalid email or password');
    }

    const passwordMatch = await comparePassword(input.password, user.password);

    if (!passwordMatch) {
      throw new ApiError('INVALID_CREDENTIALS', 401, 'Invalid email or password');
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new ApiError('INVALID_REFRESH_TOKEN', 401, 'Invalid or expired refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new ApiError('USER_NOT_FOUND', 404, 'User not found');
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return tokens;
  }
}
