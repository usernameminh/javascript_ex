var arr = []
for (let index = -28; index <= 28; index++) {
  arr.push(index)  
}
isPrimeNumber = (n) => {
  if (n < 2) {
    return false
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true
}

checkPrimeNumber = (n) => {
  if (isPrimeNumber(n)) {
    console.log(`${n} là số nguyên tố`)
    return;
  }
  console.log(`${n} không là số nguyên tố`)
}

checkPrimeNumber(9)
/**
 * 02 Viết chương trình có sử dụng hàm
  Viết chương trình nhập mảng một chiều A với n phần tử
  (n>=10). Xuất mảng A ra màn hình các nguyên tố trong A trên.
 */
checkPrimeArr = (arr) => {
  if (arr.length < 10) {
    console.log('Vui lòng nhập mảng một chiều có số phần tử lớn hơn 10')
    return;
  }
  var result = []
  for (const i of arr) {
    if (isPrimeNumber(i)) {
      result.push(i)
    }
  }
  console.log(result)
}
checkPrimeArr(arr)


/**
 * 
  03 Số hoàn hảo là số nguyên dương bằng tổng các ước thực sự
  của nó. Ví dụ: 6=1+2+3. Viết chương trình có sử dụng hàm kiểm tra n (nhập từ bàn phím) có phải số hoàn hảo không ?
 */


isPerfectNumber = (n) => {
  // Số hoàn hảo luôn luôn > 2
  var s = 1;
  for (let i = 2; i < n; i++) {
    if (!(n % i)) {
      s += i
    }
  }
  if (s === n && n != 1) {
    return true
  }
  return false
}

checkPerfectNumber = (n) => {
  if (isPerfectNumber(n)) {
    console.log(`${n} là số hoàn hảo`)
    return;
  }
  console.log(`${n} không là số hoàn hảo`)
}

checkPerfectNumber(28)


/**
 * 04 Viết chương trình có sử dụng hàm
  Viết chương trình nhập mảng một chiều A với n phần tử
  (n>=10).Xuất mảng A ra màn hình:
  Xuất ra màn hình các hoàn hảo trong A trên
 */

const checkPerfectArr = (arr) => {
  if (arr.length < 10) {
    console.log('Vui lòng nhập mảng một chiều có số phần tử lớn hơn 10')
    return;
  }
  var result = []
  for (const i of arr) {
    if (isPerfectNumber(i)) {
      result.push(i)
    }
  }
  console.log(result)
}
checkPerfectArr(arr)
