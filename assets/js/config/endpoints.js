export function getBlogIdList() {
  return '/api/blog';
}

export function getBlog(blogId) {
  return `${getBlogIdList()}/${blogId}`;
}

export function getBlogExcerpt(blogId) {
  return `${getBlog(blogId)}/excerpt`;
}


