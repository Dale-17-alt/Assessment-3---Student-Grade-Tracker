let students = [];

const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");
const averageGrade = document.getElementById("averageGrade");
const errorMessage = document.getElementById("errorMessage");

addBtn.addEventListener("click", addStudent);

function addStudent() {

    const name = studentName.value.trim();
    const grade = Number(studentGrade.value);

    if (name === "") {
        errorMessage.textContent = "Student name cannot be empty";
        return;
    }

    if (grade < 0 || grade > 100 || isNaN(grade)) {
        errorMessage.textContent = "Grade must be between 0 and 100";
        return;
    }

    errorMessage.textContent = "";

    const student = {
        id: Date.now(),
        name: name,
        grade: grade
    };

    students.push(student);

    displayStudents();
    calculateAverage();

    studentName.value = "";
    studentGrade.value = "";
}

function displayStudents() {

    studentList.innerHTML = "";

    students.forEach(function(student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentList.appendChild(row);
    });
}

function deleteStudent(id) {

    students = students.filter(function(student) {
        return student.id !== id;
    });

    displayStudents();
    calculateAverage();
}

function calculateAverage() {

    if (students.length === 0) {
        averageGrade.textContent = 0;
        return;
    }

    let total = 0;

    students.forEach(function(student) {
        total = total + student.grade;
    });

    const average = total / students.length;

    averageGrade.textContent = average.toFixed(2);
}