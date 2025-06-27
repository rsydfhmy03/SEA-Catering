import { DateTime } from 'luxon'

export default class BaseRepository {
  protected model: any
  protected mainModel: any
  protected isSoftDelete: boolean
  protected RELATIONS: string[]
  protected RELATION_OPTIONS: any

  constructor(model: any) {
    this.model = model
    this.mainModel = model
    this.isSoftDelete = model.softDelete || false
    this.RELATIONS = []
    this.RELATION_OPTIONS = {}
  }

  async findById(id: string, relations: string[] = []) {
    const query = this.model.query().where('id', id)

    if (relations.length > 0) {
      relations.forEach((relation) => query.preload(relation))
    }

    return await query.first()
  }

  async findAll(
    options: {
      relations?: string[]
      limit?: number
      offset?: number
      orderBy?: string
      orderDirection?: 'asc' | 'desc'
    } = {}
  ) {
    const {
      relations = [],
      limit,
      offset,
      orderBy = 'created_at',
      orderDirection = 'desc',
    } = options

    const query = this.model.query().orderBy(orderBy, orderDirection)

    if (relations.length > 0) {
      relations.forEach((relation) => query.preload(relation))
    }

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return await query
  }

  async create(data: any) {
    return await this.model.create(data)
  }

  async update(id: string, data: any) {
    const record = await this.findById(id)
    if (!record) return null

    return await record.merge(data).save()
  }

  async delete(id: string) {
    const record = await this.findById(id)
    if (!record) return false

    if (this.isSoftDelete) {
      await record.merge({ deleted_at: DateTime.now() }).save()
    } else {
      await record.delete()
    }
    return true
  }

  async findBy(field: string, value: any, relations: string[] = []) {
    const query = this.model.query().where(field, value)

    if (relations.length > 0) {
      relations.forEach((relation) => query.preload(relation))
    }

    return await query.first()
  }

  async findManyBy(field: string, value: any, relations: string[] = []) {
    const query = this.model.query().where(field, value)

    if (relations.length > 0) {
      relations.forEach((relation) => query.preload(relation))
    }

    return await query
  }
}
