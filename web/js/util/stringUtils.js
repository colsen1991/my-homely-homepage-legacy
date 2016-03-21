export function makeBlogId(title = '') {
  return title
    .replace(/[^\w\s]/gi, '')
    .replace(/\s/gi, '-')
    .toLowerCase();
}
