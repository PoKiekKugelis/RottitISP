
import {Community} from '../../community/entities/community.entity'
import {Moderator} from '../../moderator/entities/moderator.entity'


export interface Event {
  id: number ;
  name: string ;
  description: string ;
  startsAt: Date ;
  endsAt: Date ;
  address: string ;
  createdAt: Date ;
  editStatus: boolean ;
  community?: Community ;
  communityId: number ;
  creator?: Moderator ;
  creatorId: number ;
}
