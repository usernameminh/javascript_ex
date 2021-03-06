class Subjects {
	constructor(name, grade) {
		this.name = name.toLowerCase()
		this.grade = grade
	}

	getGrade() {
		return this.grade
	}
	getName() {
		return this.name
	}
}

class Student {
	constructor(name, gender, subjects) {
		this.name = name
		this.gender = gender
		this.subjects = subjects
		this.mark = this.caculatorMark(subjects)
	}

	caculatorMark(subjects) {
		var mark = 0
		subjects.forEach(subject => {
			mark += subject.getGrade()
		})
		return mark/subjects.length
	}

	getMark() {
		return this.mark
	}

	showInfo() {
		return this.name +" - "+ this.mark
	}

	getGender() {
		return this.gender
	}

	getName() {
		return this.name
	}

	getMathOrPhysicsMark(subjects) {
		subjects.forEach(subject => {
			mark += subject.mark
		})
		return s
	}
}

class StudentManage {
	constructor(studentList) {
		this.studentList = studentList
	}

	add(...students) {
		// this.studentList = [...this.studentList, ...students]
		this.studentList = this.studentList.concat(students)
		return this.studentList
	}

	sort(value = 'asc') {
		this.studentList.sort((stdBefore, stdAfter) => {
			if(value == 'desc') {
				return stdAfter.getMark() - stdBefore.getMark()
			}
			return stdBefore.getMark() - stdAfter.getMark()
		})
	}


	findByGenderAndMark(gender = 'nam', mark = 5) {
		return this.studentList.filter((student) => {
			return student.getGender() == gender && student.getMark() > mark
		})
	}

	findBySubjectsAndGrade(subjects, grade) {
		let student = this.studentList.filter((student, index) => {
			var subjectMark = student.subjects.filter((subject, index) => {
				return (subjects.includes(subject.getName())) && subject.getGrade() > grade
			})
			return student.subjects.includes(...subjectMark)
		})
		 return student
	}

	findBySubjectGradeMax(nameSb) {
		this.studentList.sort((student1, student2) => {
			let gradeSt1 = student1.subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()
			let gradeSt2 = student2.subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()
			return gradeSt2 - gradeSt1
		})
		let maxGrade = this.studentList[0].subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()

		let students = this.studentList.filter(student =>
			student.subjects.filter( subject => subject.name.toLowerCase() == nameSb.toLowerCase())[0].getGrade() === maxGrade
		)
		return students
	}

	findBySubjectGradeMin(nameSb) {
		this.studentList.sort((student1, student2) => {
			let gradeSt1 = student1.subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()
			let gradeSt2 = student2.subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()
			return gradeSt1 - gradeSt2
		})
		let minGrade = this.studentList[0].subjects.filter(subject => subject.getName() === nameSb.toLowerCase())[0].getGrade()

		let students = this.studentList.filter(student =>
			student.subjects.filter( subject => subject.name.toLowerCase() == nameSb.toLowerCase())[0].getGrade() === minGrade
		)
		return students
	}

	removeByMark(mark) {
		this.studentList = this.studentList.filter(student => student.getMark() !== mark)
	}
	getStudentList() {
		return this.studentList.map(student => {
			return student
		})
	}
}

const renderHTML = (studentList) => {
	let studentHTML = studentList.map((student, index) => {
			let subject= student.subjects.map(subject => `<span class='ml-1 mr-1'>${subject.getName()}: ${subject.getGrade()},</span>`)
			return `
				 <tr>
				      <th scope="row">${index+1}</th>
				      <td>${student.getName()}</td>
				      <td>${student.getGender()}</td>
				      <td>${student.getMark()}</td>
				      <td>${subject.join('')}</td>
				 </tr>
			`
		})
	
	return studentHTML.join('')
}

runHTML = ( studentList ,headingText, headingSelector, theadSelector, tbodySelector) => {
	let theadHtml = `
	  <tr>
	    <th scope="col">#</th>
	    <th scope="col">T??n</th>
	    <th scope="col">Gi???i t??nh</th>
	    <th scope="col">??i???m trung b??nh</th>
	    <th scope="col">M??n h???c</th>
	  </tr>
	`
	heading.textContent = headingText
	thead.innerHTML = theadHtml
	tbody.innerHTML = renderHTML(studentList)
}

var showBtn 				= document.getElementById('show-list')
var sortMaxMinBtn 	= document.getElementById('sort-max-min')
var sortMinMaxBtn 	= document.getElementById('sort-min-max')
var listMaleAndMarkBtn = document.getElementById('list-male-mark')
var showSubjectsBtn =	document.getElementById('subject-math-physical')
var showMathMaxBtn 		= document.getElementById('subject-math-max')
var showMathMinBtn 		= document.getElementById('subject-math-min')
var removeBtn  			= document.getElementById('remove-student')
var addBtn 					= document.getElementById('add-student')


let heading = document.getElementById('heading')
let thead 	= document.getElementById('thead')
let tbody 	= document.getElementById('tbody')


let studentList = [
	new Student('Tung', 'nam', [ new Subjects('Ly', 8), new Subjects('Toan', 8) ]),
	new Student('Nam', 'nam', [ new Subjects('Ly', 9), new Subjects('Toan', 9) ]),
	new Student('Hoai', 'nu', [ new Subjects('Ly', 8), new Subjects('Toan', 7) ]),
	new Student('Thuan', 'nam', [ new Subjects('Ly', 8), new Subjects('Toan', 9) ]),
	new Student('Linh', 'nu', [ new Subjects('Ly', 8), new Subjects('Toan', 7) ]),
	new Student('Hanh', 'nu', [ new Subjects('Ly', 8), new Subjects('Toan', 10) ]),
	new Student('Tuan', 'nam', [ new Subjects('Ly', 8), new Subjects('Toan', 6) ]),
]
let students = new StudentManage(studentList)


// 1/ T???o danh s??ch sinh vi??n c???a m???t l???p c?? 10 sinh vi??n
showBtn.onclick = () => {
	runHTML(students.getStudentList(), 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 2/ S???p x???p danh s??ch sinh vi??n theo th??? t??? ??i???m t??ch lu??? t??? l???n ?????n b??
sortMaxMinBtn.onclick = () => {
	students.sort('desc')
	runHTML(students.getStudentList(), 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 3/ S???p x???p danh s??ch sinh vi??n theo th??? t??? ??i???m t??ch lu??? t??? b?? ?????n l???n
sortMinMaxBtn.onclick = () => {
	students.sort()
	runHTML(students.getStudentList(), 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 4/ L???c ra danh s??ch sinh vi??n l?? n??? v?? c?? ??i???m t??ch lu??? l???n h??n 5.0
listMaleAndMarkBtn.onclick = () => {
	let studentMale = students.findByGenderAndMark('nu', 5 )
	runHTML(studentMale, 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 5/ L???c ra danh s??ch sinh vi??n c?? ??i???m to??n ho???c l?? l???n h??n 8.0
showSubjectsBtn.onclick = () => {
	let studentMathAndPhysical =	students.findBySubjectsAndGrade(['toan', 'ly'], 8.1)
	runHTML(studentMathAndPhysical, 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 6/ T??m sinh vi??n c?? ??i???m m??n To??n cao nh???t
showMathMaxBtn.onclick = () => {
	let studentMathMax = students.findBySubjectGradeMax('toan')
	runHTML(studentMathMax, 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 6/ T??m sinh vi??n c?? ??i???m m??n To??n th???p nh???t
showMathMinBtn.onclick = () => {
	let studentMathMin = students.findBySubjectGradeMin('toan')
	runHTML(studentMathMin, 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 7/ Xo?? kh???i danh s??ch sinh vi??n c?? ??i???m t??ch lu??? l?? 0
removeBtn.onclick = () => {
	students.removeByMark(0)
	runHTML(students.getStudentList(), 'Danh s??ch sinh vi??n', heading, thead, tbody)
}

// 8/ Th??m 03 sinh vi??n m???i v??o danh s??ch.
addBtn.onclick = () => {
	students.add(new Student('HI', 'nu', [ new Subjects('Ly', 0), new Subjects('Toan', 0) ]))
	runHTML(students.getStudentList(), 'Danh s??ch sinh vi??n', heading, thead, tbody)
}


