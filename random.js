function randomArr(arr) {
    let len = arr.length;
    while (len) {
        randomIndex = Math.floor(Math.random() * (len--));
        temp = arr[randomIndex];
        arr[randomIndex] = arr[len];
        arr[length] = temp
    }
}
