const camelize = (str: string) => {
  const result = str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
  return result;
};

export default camelize;
