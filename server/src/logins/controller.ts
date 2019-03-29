import { IsString } from 'class-validator'
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers'
import { sign } from '../jwt'
import User from '../users/entity'

class AuthenticatePayload {
  @IsString()
  nickname: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() { nickname, password }: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { nickname } })
    if (!user || !user.id) throw new BadRequestError('A user with this nickname does not exist')

    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: user.id })
    return { jwt }
  }
}
