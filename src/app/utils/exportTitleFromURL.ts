export const exportTitleFromURL = (urlLink?: string) => {
  return urlLink
    ? urlLink
        .slice(30)
        .replace(/\/[\w,.]+/, '')
        .split('-')
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join(' ')
    : '';
};
