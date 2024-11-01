const adjustString = (str?: string, length = 20, dots = true) => {
  if (!str) return '';
  str = str.trim();
  // Return the string itself if it doesn't exceed the given length
  if (str.length < length) return str;
  return str.slice(0, length) + (dots ? '...' : '');
};

export default adjustString;
