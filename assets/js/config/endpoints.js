const baseUrl = '/api';

// TODO Rename blogs. Make const.
export function blogIdListUrl() {
  return `${baseUrl}/blog`;
}

// TODO Rename blog
export function blogUrl(blogId) {
  return `${blogIdListUrl()}/${blogId}`;
}

// TODO Remove
export function blogExcerptUrl(blogId) {
  return `${blogUrl(blogId)}/excerpt`;
}

export const loginUrl = `${baseUrl}/login`;
