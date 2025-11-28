
import {User} from '../../user/entities/user.entity'
import {Post} from '../../post/entities/post.entity'


export interface Like {
  id: number ;
  likeStatus: boolean ;
  user?: User ;
  userId: number ;
  post?: Post ;
  postId: number ;
}
