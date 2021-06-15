module.exports = function sortObject(obj, keyOrder, isSortByUnicode = true) {
  if (!obj) return;
  const res = {};
  console.log('keyOrder :>> ', keyOrder);
  if (keyOrder) {
    keyOrder.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = obj[key];
        delete obj[key]; // 下面排序后还会再次赋值给 res
      }
    });
  }
  console.log('res111 :>> ', res);
  const keys = Object.keys(obj);
  isSortByUnicode && keys.sort();
  keys.forEach(key => {
    res[key] = obj[key];
  });

  console.log('res 222 :>> ', res);

  return res;
};
