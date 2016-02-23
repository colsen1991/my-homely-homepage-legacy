const baseUrl = '/api';

export function blogIdListUrl() {
  return `${baseUrl}/blog`;
}

export function blogUrl(blogId) {
  return `${blogIdListUrl()}/${blogId}`;
}

export function blogExcerptUrl(blogId) {
  return `${blogUrl(blogId)}/excerpt`;
}

export const loginUrl = `${baseUrl}/login`;
