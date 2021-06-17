module.exports = function sortObject(obj, keyOrder, isSortByUnicode = true) {
  if (!obj) return;
  const res = {};
  if (keyOrder) {
    keyOrder.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = obj[key];
        delete obj[key]; // 下面排序后还会再次赋值给 res
      }
    });
  }
  const keys = Object.keys(obj);
  isSortByUnicode && keys.sort();
  keys.forEach(key => {
    res[key] = obj[key];
  });

  return res;
};
