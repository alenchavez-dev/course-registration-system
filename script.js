const form = document.getElementById('registerForm');
const tableBody = document.querySelector('#courseTable tbody');

let registrations = [];
let editIndex = -1;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const semester = document.getElementById('semester').value;
  const course = document.getElementById('course').value;

  const entry = { firstName, lastName, semester, course };

  if (editIndex === -1) {
    registrations.push(entry);
  } else {
    registrations[editIndex] = entry;
    editIndex = -1;
    document.getElementById('registerButton').textContent = 'Register';
  }

  renderTable();
  form.reset();
});

function validateForm() {
  let isValid = true;

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const semester = document.getElementById('semester').value;
  const course = document.getElementById('course').value;

  isValid &= showError('firstNameError', /^[A-Za-z]+$/.test(firstName), 'First name must contain only letters.');
  isValid &= showError('lastNameError', /^[A-Za-z]+$/.test(lastName), 'Last name must contain only letters.');
  isValid &= showError('semesterError', semester !== '', 'Please select a semester.');
  isValid &= showError('courseError', course !== '', 'Please select a course.');

  return !!isValid;
}

function showError(elementId, condition, message) {
  const errorEl = document.getElementById(elementId);
  if (!condition) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    return false;
  } else {
    errorEl.style.display = 'none';
    return true;
  }
}

function renderTable() {
  tableBody.innerHTML = '';
  registrations.forEach((reg, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${reg.firstName} ${reg.lastName}</td>
      <td>${reg.semester}</td>
      <td>${reg.course}</td>
      <td>
        <button class="action-btn" onclick="editEntry(${index})">Edit</button> |
        <button class="action-btn" onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editEntry(index) {
  const reg = registrations[index];
  document.getElementById('firstName').value = reg.firstName;
  document.getElementById('lastName').value = reg.lastName;
  document.getElementById('semester').value = reg.semester;
  document.getElementById('course').value = reg.course;

  editIndex = index;
  document.getElementById('registerButton').textContent = 'Update';
}

function deleteEntry(index) {
  registrations.splice(index, 1);
  renderTable();
}
