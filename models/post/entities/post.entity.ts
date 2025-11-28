
import {Community} from '../../community/entities/community.entity'
import {User} from '../../user/entities/user.entity'
import {Comment} from '../../comment/entities/comment.entity'
import {Like} from '../../like/entities/like.entity'
import {File} from '../../file/entities/file.entity'


export interface Post {
  id: number ;
  name: string ;
  description: string ;
  createdAt: Date ;
  likesCount: number ;
  editStatus: boolean ;
  views: number ;
  ageRestriction: boolean ;
  community?: Community ;
  communityId: number ;
  creator?: User ;
  creatorId: number ;
  comments?: Comment[] ;
  likes?: Like[] ;
  attachment?: File  | null;
}
