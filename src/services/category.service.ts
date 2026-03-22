import { AppDataSource } from "../config/data-source";
import { Category } from "../models/category.entity";
import { CreateCategoryDto } from "../dtos/meta.dto";

export class CategoryService {
  private categoryRepo = AppDataSource.getRepository(Category);

  async create(data: CreateCategoryDto) {
    const category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async list() {
    return await this.categoryRepo.find();
  }
}
