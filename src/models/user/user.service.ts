import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '@base/services';
import { User } from './entities/user.entity';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { GroupUserService } from '@models/group-user';

@Injectable()
export class UserService extends BaseService<User>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly groupUserService: GroupUserService
  ) {
    super(userRepository)
  }

  async findOne(userName: string) {
    const groupUser = await this.groupUserService.getFromUserNames(userName)
    return groupUser
    // console.log(groupUser)
    // return await this.userRepository.findOne({
    //   where: { userName },
    //   relations: ['groupUser'],
    // });
  }

  async isUser(userName: string) {
    return await this.userRepository.findOne({ where: { userName } });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async transitionPayment(id: number, amount: number) {
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, { where: { id } });
      // user.balance += amount;
      if (!user) throw new Error('User not found');

      console.log(user);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    }
    catch (err) {
      await queryRunner.rollbackTransaction();
    }
    finally {
      await queryRunner.release();
    }

  }

  async addUser(body: CreateUserDto) {
    const { userName } = body;

    if (await this.userExists(userName)) throw new Error('User already exists');

    const user = this.userRepository.create(body);
    console.log(user)
    return await this.userRepository.save(user);
  }

  async userExists(userName: string) {
    const user = await this.userRepository.findOne({ where: { userName } });
    return !!user;
  }
}
