import { AppDataSource } from "../config/data-source";
import { Tag } from "../models/tag.entity";
import { CreateTagDto } from "../dtos/meta.dto";

export class TagService {
  private tagRepo = AppDataSource.getRepository(Tag);

  async create(data: CreateTagDto) {
    const tag = this.tagRepo.create(data);
    return await this.tagRepo.save(tag);
  }

  async list() {
    return await this.tagRepo.find();
  }

  async delete(id: number) {
    return await this.tagRepo.delete(id);
  }
}
