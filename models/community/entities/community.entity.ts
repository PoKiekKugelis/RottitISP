
import {User} from '../../user/entities/user.entity'
import {Moderator} from '../../moderator/entities/moderator.entity'
import {CommunityMember} from '../../communityMember/entities/communityMember.entity'
import {CommunityTag} from '../../communityTag/entities/communityTag.entity'
import {Event} from '../../event/entities/event.entity'
import {Post} from '../../post/entities/post.entity'


export interface Community {
  id: number ;
  name: string ;
  description: string ;
  createdAt: Date ;
  avatar: string ;
  header: string ;
  ageRestriction: boolean ;
  creator?: User ;
  creatorId: number ;
  moderators?: Moderator[] ;
  members?: CommunityMember[] ;
  tags?: CommunityTag[] ;
  events?: Event[] ;
  posts?: Post[] ;
}
