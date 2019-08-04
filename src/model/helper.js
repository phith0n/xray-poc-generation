function findObjectByIndex(dataList, index) {
  for (let id in dataList) {
    if (dataList[id].index === index) {
      return id;
    }
  }
  return -1;
}

export { findObjectByIndex }
