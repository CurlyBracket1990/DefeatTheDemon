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

export type Content = "x" | "y" | null | "<" | "v" | "^" | ">" | "n" | "m" | "g" | "s" | "z"
export type Row = [Content, Content, Content, Content, Content, Content ]
export type Board = [ Row, Row, Row, Row, Row ]

type Status = 'pending' | 'started' | 'Level completed!' | 'Game over!'

const row: Row = [null, null, null, null, null, null]
let emptyBoard: Board = [ row, row, row, row, row ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', { default: 'x'})
  turn: Champion["symbol"]

  @Column('integer', {default: 12})
  totalMoves: number

  @Column('integer', {nullable: true})
  enemyCount: number

  @Column('integer', {default: 1})
  currentLevel: number

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
