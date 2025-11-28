
import {UserBadge} from '../../userBadge/entities/userBadge.entity'
import {Community} from '../../community/entities/community.entity'
import {CommunityMember} from '../../communityMember/entities/communityMember.entity'
import {Post} from '../../post/entities/post.entity'
import {Comment} from '../../comment/entities/comment.entity'
import {Like} from '../../like/entities/like.entity'


export interface User {
  id: number ;
loginName: string ;
email: string ;
password: string ;
avatar: string ;
country: string ;
createdAt: Date ;
username: string ;
karma: number ;
bio: string ;
birthdate: Date ;
status: boolean ;
badges?: UserBadge[] ;
createdCommunities?: Community[] ;
communities?: CommunityMember[] ;
posts?: Post[] ;
comments?: Comment[] ;
likes?: Like[] ;
}
