
import { Post } from '../../post/entities/post.entity'
import { User } from '../../user/entities/user.entity'


export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  editStatus: boolean;
  post?: Post;
  postId: number;
  creator?: User;
  creatorId: number;
  parentId?: number;
  replies?: Comment[];
}
