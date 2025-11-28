
import {CommunityTag} from '../../communityTag/entities/communityTag.entity'


export interface Tag {
  id: number ;
  name: string ;
  description: string ;
  group: string  | null;
  communities?: CommunityTag[] ;
}
