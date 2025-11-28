
import {Post} from '../../post/entities/post.entity'
import {User} from '../../user/entities/user.entity'
import {Reply} from '../../reply/entities/reply.entity'


export interface Comment {
  id: number ;
  content: string ;
  createdAt: Date ;
  editStatus: boolean ;
  post?: Post ;
  postId: number ;
  creator?: User ;
  creatorId: number ;
  replies?: Reply[] ;
}
