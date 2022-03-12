import { v4 as uuidV4, validate as isUUID } from 'uuid';
import InvalidUuidError from '../errors/invalid-uuid.error';

export default class UniqueEntityId {
  public readonly value: string;

  constructor(id?: string) {
    this.value = id ?? UniqueEntityId.generateUuid();
    this.validate();
  }

  private validate() {
    if (!UniqueEntityId.isUuid(this.value)) throw new InvalidUuidError();
  }

  private static generateUuid() {
    return uuidV4();
  }

  private static isUuid(value: string) {
    return isUUID(value);
  }
}
