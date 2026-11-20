
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents(data = students) {
    studentList.innerHTML = "";

    data.forEach((student) => {
        const index = students.indexOf(student);

        const row = document.createElement("tr");

        const values = [
            student.name,
            student.matric,
            student.email,
            student.gender,
            student.department,
            student.level
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editStudent(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteStudent(index);

        actions.append(editButton, deleteButton);
        row.appendChild(actions);

        studentList.appendChild(row);
    });

    document.getElementById("totalStudents").textContent =
        "Total Students: " + students.length;
}

// Register and Update Student
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        matric: document.getElementById("matric").value.trim(),
        email: document.getElementById("email").value.trim(),
        gender: document.getElementById("gender").value,
        department: document.getElementById("department").value.trim(),
        level: document.getElementById("level").value
    };

    const editIndex = document.getElementById("editIndex").value;

    const duplicate = students.some((s, i) =>
        s.matric.toLowerCase() === student.matric.toLowerCase()
        && String(i) !== editIndex
    );

    if (duplicate) {
        alert("This matric number is already registered!");
        return;
    }

    if (editIndex !== "") {
        students[Number(editIndex)] = student;
        alert("Student updated successfully!");
    } else {
        students.push(student);
        alert("Student registered successfully!");
    }

    saveStudents();
    displayStudents();
    form.reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("formTitle").textContent =
        "Register New Student";
    document.getElementById("submitBtn").textContent =
        "Register Student";
});

// Edit Student
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("matric").value = student.matric;
    document.getElementById("email").value = student.email;
    document.getElementById("gender").value = student.gender;
    document.getElementById("department").value = student.department;
    document.getElementById("level").value = student.level;

    document.getElementById("editIndex").value = index;

    document.getElementById("formTitle").textContent =
        "Update Student Information";
    document.getElementById("submitBtn").textContent =
        "Update Student";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete Student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveStudents();
        displayStudents();
        alert("Student deleted successfully!");
    }
}

// Search Student
search.addEventListener("input", function() {
    const query = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.matric.toLowerCase().includes(query)
    );

    displayStudents(filteredStudents);
});

// Display students when page loads
displayStudents();