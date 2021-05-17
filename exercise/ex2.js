/**
 * 
  Viết chương trình nhập mảng một chiều A với n phần tử
  (n>=9). Xuất mảng A ra màn hình
  Sắp xếp mảng theo thứ tự giảm dần,xuất ra lại màn hình
 */

var arr = [1, 4, 3, 2, 6]
sortArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
}
sortArr(arr)
console.log(arr)

