export const setValRecursive = (currObj: any, newObj: any) => {
  Object.keys(newObj).forEach((k: any) => {
    if (typeof newObj[k] == "object" && currObj[k] != null) {
      setValRecursive(currObj[k], newObj[k]);
    } else {
      currObj[k] = newObj[k];
    }
  });
  return currObj;
};
