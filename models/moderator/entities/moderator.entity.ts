
import {Community} from '../../community/entities/community.entity'
import {Event} from '../../event/entities/event.entity'


export interface Moderator {
  id: number ;
  assignedAt: Date ;
  assignedBy: string ;
  community?: Community ;
  communityId: number ;
  events?: Event[] ;
}
