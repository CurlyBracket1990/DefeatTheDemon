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
 
//  export class Enemy {
//   health = 10
//   levelEnemy = Math.round(Math.random()*10)
//   damage = this.levelEnemy
//  }

export class Enemy {
  direction = {
  Down : "V",
  Left : "<",
  Right : ">",
  Up : "^"
  }
}

// export type Content = Champion | Enemy | null

export type Content = "x" | "y" | null | "<" | "v" | "^" | ">"
export type Row = [Content, Content, Content ]
export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', { default: 'y'})
  turn: Champion["symbol"]

  @Column('text', {nullable: true})
  enemy: Enemy

  @Column('boolean', {nullable: true})
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
