export default class BaseService {
  repository: any

  constructor(repository: any) {
    this.repository = repository
  }

  async findById(id: string, relations: string[] = []) {
    return await this.repository.findById(id, relations)
  }

  async findAll(options: any = {}) {
    return await this.repository.findAll(options)
  }

  async create(data: any) {
    return await this.repository.create(data)
  }

  async update(id: string, data: any) {
    return await this.repository.update(id, data)
  }

  async delete(id: string) {
    return await this.repository.delete(id)
  }

  async findBy(field: string, value: any, relations: string[] = []) {
    return await this.repository.findBy(field, value, relations)
  }

  async findManyBy(field: string, value: any, relations: string[] = []) {
    return await this.repository.findManyBy(field, value, relations)
  }
}
