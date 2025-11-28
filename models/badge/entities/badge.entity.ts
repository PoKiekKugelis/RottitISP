
import {UserBadge} from '../../userBadge/entities/userBadge.entity'


export interface Badge {
  id: number ;
  name: string ;
  description: string ;
  avatar: string ;
  price: number ;
  rarity: Rarity ;
  users?: UserBadge[] ;
}

export enum Rarity {
  COMMON = "Common",
  RARE = "Rare",
  EPIC = "Epic"
}
