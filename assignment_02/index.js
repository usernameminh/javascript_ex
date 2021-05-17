var tienVay = document.getElementById('loan')
var thoiGianVay = document.getElementById('borrowedTime')
var laiSuat = document.getElementById('interestRate')
var ngayGiaiNgan = document.getElementById('disbursementDate')




var calculateElement = document.getElementById('calculate')
var tBody = document.querySelector('.table-body')

calculateElement.onclick = (e) => {
  e.preventDefault()
  validateForm()
  var rowsLenght = tBody.rows.length
  for (var i = rowsLenght - 1; i > 0; i--) {
    tBody.deleteRow(i)
  }

  printPayShedule(tienVay.value, laiSuat.value / 100, thoiGianVay.value, new Date(ngayGiaiNgan.value))
}

let printPayShedule = (goc, laiSuat, thoiGianVay, ngayGiaiNgan) => {
  var gocConLai = goc
  var gocHangThang = goc / thoiGianVay
  var tongTienVay = 0
  var tongLaiSuat = 0

  createTable(formatDate(ngayGiaiNgan), 0, gocConLai)
  for (let i = 1; i <= thoiGianVay; i++) {
    var laiPhaiTra = gocConLai * laiSuat / 12,
      tienPhaiTraHangThang = laiPhaiTra + gocHangThang
    gocConLai = gocConLai - gocHangThang

    ngayGiaiNgan.setMonth(ngayGiaiNgan.getMonth() + 1)
    createTable(formatDate(ngayGiaiNgan), i, gocConLai, gocHangThang, laiPhaiTra, tienPhaiTraHangThang)
    tongTienVay += gocHangThang
    tongLaiSuat += laiPhaiTra
  }

  createRowTotal(tongTienVay, tongLaiSuat, tongLaiSuat + tongTienVay)
}

let validateForm = () => {
  if (!tienVay.value || !thoiGianVay.value || !laiSuat.value || !ngayGiaiNgan.value) {
    alert('Vui lòng nhập đầy đủ các trường.')
    return;
  }

  if (tienVay.value < 0) {
    alert('Giá trị tiền vay không chính xác!')
    return;
  }

  if (thoiGianVay.value < 0 || thoiGianVay.value > 24) {
    alert('Thời gian vay tối đa 24 tháng!')
    return;
  }

  if (laiSuat.value < 0 || laiSuat.value > 100) {
    alert('Giá trị lãi suất không chính xác!')
    return;
  }
}

let createRowTotal = (totalLoan, totalInterest, total) => {
  var row = tBody.insertRow(-1);
  var cell0 = row.insertCell(0)
  var cell1 = row.insertCell(1)
  var cell2 = row.insertCell(2)
  var cell3 = row.insertCell(3)
  var cell4 = row.insertCell(4)
  var cell5 = row.insertCell(5)

  cell0.innerHTML = `<b>Tổng</b>`
  cell1.innerHTML = ''
  cell2.innerHTML = ''
  cell3.innerHTML = `<b>${formatNumber(totalLoan)}</b>`
  cell4.innerHTML = `<b>${formatNumber(totalInterest)}</b>`
  cell5.innerHTML = `<b>${formatNumber(total)}</b>`
}

let createTable = (disbursementDate, index, gocConLai,
  gocHangThang = 0, laiPhaiTra = 0, tienPhaiTraHangThang = 0) => {
  var row = tBody.insertRow(-1)
  var cell0 = row.insertCell(0)
  var cell1 = row.insertCell(1)
  var cell2 = row.insertCell(2)
  var cell3 = row.insertCell(3)
  var cell4 = row.insertCell(4)
  var cell5 = row.insertCell(5)

  if (index == 0) {
    cell0.innerText = disbursementDate
    cell1.innerText = index
    cell2.innerText = formatNumber(gocConLai)
    cell3.innerText = ''
    cell4.innerText = ''
    cell5.innerText = ''
    return
  }

  cell0.innerText = disbursementDate
  cell1.innerText = index
  cell2.innerText = formatNumber(gocConLai)
  cell3.innerText = formatNumber(gocHangThang)
  cell4.innerText = formatNumber(laiPhaiTra)
  cell5.innerText = formatNumber(tienPhaiTraHangThang)
}

let formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

let formatNumber = (number) => {
  var numToFixed = parseFloat(number).toFixed()
  return new Intl.NumberFormat().format(parseInt(numToFixed))
}
