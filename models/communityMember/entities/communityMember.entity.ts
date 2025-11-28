
import {Community} from '../../community/entities/community.entity'
import {User} from '../../user/entities/user.entity'


export interface CommunityMember {
  community?: Community ;
  communityId: number ;
  user?: User ;
  userId: number ;
}
