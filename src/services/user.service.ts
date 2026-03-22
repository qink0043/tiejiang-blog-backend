import { AppDataSource } from "../config/data-source";
import { User } from "../models/user.entity";
import { RegisterDto, LoginDto, UpdateUserDto } from "../dtos/user.dto";
import { AppError } from "../utils/app-error";
import { HttpCode } from "../utils/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async register(data: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (existing) {
      throw new AppError(
        "Username or email already exists",
        HttpCode.BAD_REQUEST,
      );
    }

    const user = this.userRepo.create(data);
    user.password = await bcrypt.hash(data.password, 10);
    return await this.userRepo.save(user);
  }

  async login(data: LoginDto) {
    const user = await this.userRepo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.username = :username", { username: data.username })
      .getOne();

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError("Invalid username or password", HttpCode.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
      },
    );

    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
    };
  }

  async getMe(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new AppError("User not found", HttpCode.NOT_FOUND);
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.userRepo.update(id, data);
    return await this.getMe(id);
  }
}
