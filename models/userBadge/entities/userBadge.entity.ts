
import {User} from '../../user/entities/user.entity'
import {Badge} from '../../badge/entities/badge.entity'


export interface UserBadge {
  user?: User ;
  userId: number ;
  badge?: Badge ;
  badgeId: number ;
}
