// create subject
function createSubject(name, mark) {
	return {
		name: name,
		mark: mark
	}
}
class Student{
	constructor(name, gender, subjects) {
		this.name = name
		this.gender = gender
		this.subjects = subjects
		this.mark = this.caculatorMark(subjects)
	}
	caculatorMark(subjects) {
		var mark = subjects.reduce((total, currentValue) => {
			return total+currentValue.mark
		},0)
		return mark/subjects.length
	}

	showInfo() {
		return {
			name: this.name,
			gender: this.gender,
			mark: this.mark,
			subjects: this.subjects
		}
	}

	getMark() {
		return this.mark
	}
	getGender() {
		return this.gender
	}
}

class StudentList {
	createList() {
		var studentList = [
			new Student('thanh', 'nam' ,[createSubject('toan', 8), createSubject('Ly', 9)]),
			new Student('cong',  'nam' ,[createSubject('toan', 8), createSubject('Ly', 8.9)]),
			new Student('hanh',  'nu' ,[createSubject('toan', 9), createSubject('Ly', 8.8)]),
			new Student('thuy',  'nu' ,[createSubject('toan', 9.2), createSubject('Ly', 7)]),
			new Student('lien', 'nu' ,[createSubject('toan', 8), createSubject('Ly', 8.8)]),
			new Student('tin',  'nam' ,[createSubject('toan', 6.2), createSubject('Ly', 10)]),
			new Student('binh', 'nam' ,[createSubject('toan', 7), createSubject('Ly', 7)]),
			new Student('vu',  'nam' ,[createSubject('toan', 9), createSubject('Ly', 8)]),
		 	new Student('tung', 'nam' ,[createSubject('toan', 8), createSubject('Ly', 8.9)]),
		 	new Student('ngao', 'nam' ,[createSubject('toan', 0), createSubject('Ly', 0)])
		]
		return studentList
	}

	sortMarkMaxMin(studentList) {
		for (var i = 0; i < studentList.length; i++) {
			for (var j = i+1; j < studentList.length; j++) {
				if(studentList[i].getMark() < studentList[j].getMark()) {
					var temp = studentList[i]
					studentList[i] = studentList[j]
					studentList[j] = temp
				}
			}
		}
	}

	sortMarkMinMax(studentList) {
		for (var i = 0; i < studentList.length; i++) {
			for (var j = i+1; j < studentList.length; j++) {
				if(studentList[i].getMark() > studentList[j].getMark()) {
					var temp = studentList[i]
					studentList[i] = studentList[j]
					studentList[j] = temp
				}
			}
		}
	}

	filterMale(studentList) {
		let student = studentList.filter((student) => student.getMark() >= 5.0 && student.getGender() === 'nu')
		return student
	}

	filterMarkEight(studentList) {
		let student = studentList.filter((student) => {
			var subjectMark = student.subjects.filter((subject, index, arr) => subject.mark > 8)
			return student.subjects.includes(...subjectMark)
		})
		return student
	}

	searchMath(studentList){
		var mathMax = 0
		var mathMin = 10

		// search student is math max
		studentList.forEach((student, index, arr) => {
			var mathSt = student.subjects.filter(subject => subject.name=='toan')[0].mark
			if(mathMax < mathSt) {
				mathMax = mathSt
			}
		})

		// search student is math min
		studentList.forEach((student, index, arr) => {
			var mathSt= student.subjects.filter(subject => subject.name=='toan')[0].mark
			if(mathMin > mathSt) {
				mathMin = mathSt
			}
		})

		var studentMathMax = studentList.filter(student => student.subjects.filter(subject => subject.name='toan')[0].mark == mathMax)
		var studentMathMin = studentList.filter(student => student.subjects.filter(subject => subject.name='toan')[0].mark == mathMin)
		return {
			studentMathMin,
			studentMathMax
		}
	}

	removeStudentZero(studentList) {
		studentList = studentList.filter((student) => student.getMark() !== 0)
		return studentList
	}
	addStudent(studentList) {
		let st1 = new Student('huy', 'nam' ,[createSubject('toan', 9), createSubject('Ly', 8)])
		let st2 = new Student('tuan', 'nam' ,[createSubject('toan', 5), createSubject('Ly', 9)])
		let st3 = new Student('ngan',  'nu' ,[createSubject('toan', 8), createSubject('Ly', 8.9)])
		studentList.push(st1, st2, st3)
	}
}

let stdList = new StudentList
let listStudent = stdList.createList()


var heading = document.getElementById('heading')
var thead = document.getElementById('thead')
var tbody = document.getElementById('tbody')
var theadHtml = `
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tên</th>
      <th scope="col">Giới tính</th>
      <th scope="col">Điểm trung bình</th>
      <th scope="col">Môn học</th>
    </tr>
`
let renderHTML = (studentList) => {
	var studentHTML = studentList.map((student, index) => {
			var subject= student.subjects.map(subject => `<span class='ml-1 mr-1'>${subject.name}: ${subject.mark},</span>`)
			return `
				 <tr>
				      <th scope="row">${index+1}</th>
				      <td>${student.name}</td>
				      <td>${student.gender}</td>
				      <td>${student.mark}</td>
				      <td>${subject.join('')}</td>
				 </tr>
			`
		})
	
	return studentHTML.join('')
}



var showList = document.getElementById('show-list')
var sortMaxMin = document.getElementById('sort-max-min')
var sortMinMax = document.getElementById('sort-min-max')
var listMaleMark = document.getElementById('list-male-mark')
var subjectMathPhysical = document.getElementById('subject-math-physical')
var subjectMath = document.getElementById('subject-math')
var removeStudent = document.getElementById('remove-student')
var addStudent = document.getElementById('add-student')


showList.onclick = () => {
	heading.textContent = 'Danh sách sinh viên của một lớp có 10 sinh viên'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(stdList.createList())
}

sortMaxMin.onclick = () => {
	stdList.sortMarkMaxMin(listStudent)
	heading.textContent = 'Sắp xếp danh sách sinh viên theo thứ tự điểm tích luỹ từ lớn đến bé'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(listStudent)
}

sortMinMax.onclick = () => {
	stdList.sortMarkMinMax(listStudent)
	heading.textContent = 'Sắp xếp danh sách sinh viên theo thứ tự điểm tích luỹ từ bé đến lớn'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(listStudent)
}

listMaleMark.onclick = () => {
	heading.textContent = 'Lọc ra danh sách sinh viên là nữ và có điểm tích luỹ lớn hơn 5.0'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(stdList.filterMale(listStudent))
}

subjectMathPhysical.onclick = () => {
	heading.textContent = 'Lọc ra danh sách sinh viên có điểm toán hoặc lý lớn hơn 8.0'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(stdList.filterMarkEight(listStudent))
}

subjectMath.onclick = () => {
	var studentMath = [...stdList.searchMath(listStudent).studentMathMax, ...stdList.searchMath(listStudent).studentMathMin]
	heading.textContent = 'Sinh viên có điểm môn Toán cao nhất và thấp nhất'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(studentMath)
}

removeStudent.onclick = () => {
	listStudent = stdList.removeStudentZero(listStudent)
	heading.textContent = 'Xoá khỏi danh sách sinh viên có điểm tích luỹ là 0'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(listStudent)
}

addStudent.onclick = () => {
	stdList.addStudent(listStudent)
	heading.textContent = 'Thêm 03 sinh viên mới vào danh sách.'
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(listStudent)
}
