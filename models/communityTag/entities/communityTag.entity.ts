
import {Community} from '../../community/entities/community.entity'
import {Tag} from '../../tag/entities/tag.entity'


export interface CommunityTag {
  community?: Community ;
  communityId: number ;
  tag?: Tag ;
  tagId: number ;
}
