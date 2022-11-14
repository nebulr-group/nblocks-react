const classNameFilter = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};


export { className };