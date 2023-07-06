import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BaseService } from '@base/services';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService extends BaseService<Group> {
	constructor(
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>
	) {
		super(groupRepository);
	}


}
