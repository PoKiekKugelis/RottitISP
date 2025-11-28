
import {Comment} from '../../comment/entities/comment.entity'


export interface Reply {
  commentId: number ;
  parent?: Comment ;
  parentId: number ;
}
