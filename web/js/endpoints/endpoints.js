const baseUrl = '/api';

export function blogExcerpts() {
  return `${baseUrl}/blog/excerpts`;
}

export function blog(id) {
  return `${baseUrl}/blog/${id}`;
}

export const loginUrl = `${baseUrl}/login`;
