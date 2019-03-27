import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export class Champion {
  constructor(symbol) {
    this.symbol = symbol
  }
  
  health = 10
  levelChampion = 1
  weapon = {
    type: "sword" ,
    damage: 3
  }
  damage = 1 + this.weapon.damage + this.levelChampion
  symbol = ""
 }

export class Enemy {
  direction = {
  Down : "V",
  Left : "<",
  Right : ">",
  Up : "^"
  }
}

export type Content = "x" | "y" | null | "<" | "v" | "^" | ">"
export type Row = [Content, Content, Content, Content, Content, Content ]
export type Board = [ Row, Row, Row, Row, Row ]

type Status = 'pending' | 'started' | 'Level completed!'

let enemyCount = 0

const createRandomEnemy = () => {
  const randomNumber = Math.random()
  switch (true) {
    case randomNumber <= 0.6:
      return null
  
    case randomNumber > 0.6 && randomNumber <= 0.7 && enemyCount < 6:
      enemyCount++
      return '>'
    case randomNumber > 0.7 && randomNumber <= 0.8 && enemyCount < 6:
      enemyCount++
      return '<'
    case randomNumber > 0.8 && randomNumber <= 0.9 && enemyCount < 6:
      enemyCount++
      return '^'
    case randomNumber > 0.9 && enemyCount < 6:
      enemyCount++
      return 'v'
    default:
      return null
  }
}

const createRandomRow = () => {
  return [createRandomEnemy(), createRandomEnemy(), createRandomEnemy(), createRandomEnemy(), createRandomEnemy(), createRandomEnemy()]
}

const row1: Row = createRandomRow()
const row5: Row = ["x", null, null, null, null, "y"]
const row3: Row = createRandomRow()
const row4: Row = createRandomRow()
const row2: Row = createRandomRow()
let emptyBoard: Board = [ row1, row2, row3, row4, row5 ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', { default: 'x'})
  turn: Champion["symbol"]

  @Column('text', {nullable: true})
  enemy: Enemy

  @Column('integer', {nullable: true})
  enemyCount: number

  @Column('boolean', {nullable: true, default: false})
  defeatedTheDemon: boolean

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column('char')
  symbol: Champion["symbol"]

  @Column('integer', { name: 'user_id' })
  userId: number
}
