
import {Post} from '../../post/entities/post.entity'


export interface File {
  id: number ;
  link: string ;
  content: string ;
  type: string ;
  size: number ;
  post?: Post ;
  postId: number ;
}
