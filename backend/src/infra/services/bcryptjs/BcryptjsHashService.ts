import { type HashService } from '../../../data'
import bcrypt from 'bcryptjs'

export class BcryptjsHashService implements HashService {
  private readonly saltRounds = 12

  async hash (request: HashService.Request): HashService.Response {
    const { text } = request

    const salt = await bcrypt.genSalt(this.saltRounds)
    const hash = await bcrypt.hash(text, salt)

    return hash
  }
}
