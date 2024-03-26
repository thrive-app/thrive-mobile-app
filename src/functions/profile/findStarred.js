function findStarred(arr) {
  let index;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].starred) {
      index = i;
    }
  }
  return index;
}

export default findStarred;
