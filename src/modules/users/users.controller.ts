import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { apiResponse } from "src/utils/helpers";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return apiResponse(await this.userService.findAll(), 'Success get all users', 200);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return apiResponse(await this.userService.create(user), 'User has been created', 200);
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }

    return apiResponse(result, 'Success get user by id', 200);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }

    if (!user.password) {
      delete user.password;
    }

    await this.userService.update(id, user);

    return apiResponse(await this.userService.findOne(id), 'User has been updated', 200);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number) {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }

    await this.userService.destroy(id);

    return apiResponse([], 'User has been deleted', 200);
  }

}
