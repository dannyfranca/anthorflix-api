import { v4 as uuidV4, validate as isUUID } from 'uuid';
import InvalidUuidError from '../errors/invalid-uuid.error';

export default class UniqueEntityId {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id ?? UniqueEntityId.generateUuid();
    this.validate();
  }

  private validate() {
    if (!UniqueEntityId.isUuid(this.id)) throw new InvalidUuidError();
  }

  private static generateUuid() {
    return uuidV4();
  }

  private static isUuid(value: string) {
    return isUUID(value);
  }
}
