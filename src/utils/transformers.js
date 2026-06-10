export function transformUser(user) {
  if (!user) {
    return { _id: null, name: "", photo: "", followers: [], following: [] };
  }

  return {
    _id: user.id || user._id || user.userId || "",
    name: user.name || user.username || "",
    photo: user.photo || user.pic || "",
    followers: Array.isArray(user.followers) ? user.followers : [],
    following: Array.isArray(user.following) ? user.following : [],
    email: user.email || "",
  };
}

export function transformPost(post, currentUserId) {
  const id = post._id || post.id || "";
  const likes = Array.isArray(post.likes) ? post.likes : [];
  const likedByCurrentUser =
    post.likedByCurrentUser ?? (currentUserId ? likes.includes(currentUserId) : false);
  const likesCount = post.likesCount ?? likes.length;
  const comments = Array.isArray(post.comments) ? post.comments : [];

  return {
    _id: id,
    title: post.title || post.post_title || "",
    body: post.body || post.post_body || "",
    photo: post.photo || post.image || "",
    postedBy: {
      _id: post.postedBy?._id || post.postedBy || post.postedById || post.posted_by || null,
      name:
        post.postedBy?.name ||
        post.postedByName ||
        post.postedBy_name ||
        "",
      photo: post.postedBy?.photo || post.postedByPhoto || null,
    },
    likes,
    likedByCurrentUser,
    comments,
    likesCount,
    commentsCount: post.commentsCount ?? comments.length,
    createdAt: post.createdAt || post.created_at,
    updatedAt: post.updatedAt || post.updated_at,
  };
}
