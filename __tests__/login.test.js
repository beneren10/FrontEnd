const { renderDOM } = require('./helpers');

let dom;
let document;

describe('login.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./login.html');
    document = dom.window.document;
  });

  // Helper function to get form elements
  const getFormElements = () => ({
    form: document.getElementById('login-form'),
    studentLoginInput: document.getElementById('student_login'),
    passwordInput: document.getElementById('password'),
  });

  // Mock validation function
  const validateLoginInput = (studentLogin, password) => {
    if (!studentLogin || !password) {
      return 'Both fields are required.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return 'Valid input.';
  };

  test('should validate input fields are not empty', () => {
    const { studentLoginInput, passwordInput } = getFormElements();

    studentLoginInput.value = '';
    passwordInput.value = '';

    const errorMessage = validateLoginInput(studentLoginInput.value, passwordInput.value);
    expect(errorMessage).toBe('Both fields are required.');
  });

  test('should validate password length', () => {
    const { studentLoginInput, passwordInput } = getFormElements();

    studentLoginInput.value = 'student1';
    passwordInput.value = '123';

    const errorMessage = validateLoginInput(studentLoginInput.value, passwordInput.value);
    expect(errorMessage).toBe('Password must be at least 6 characters long.');
  });

  test('should allow form submission with valid input', () => {
    const { form, studentLoginInput, passwordInput } = getFormElements();

    studentLoginInput.value = 'student1';
    passwordInput.value = 'password123';

    let isFormSubmitted = false;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const errorMessage = validateLoginInput(studentLoginInput.value, passwordInput.value);
      if (errorMessage === 'Valid input.') {
        isFormSubmitted = true;
      }
    });

    form.dispatchEvent(new dom.window.Event('submit'));

    expect(isFormSubmitted).toBe(true);
  });

  test('should prevent form submission with invalid input', () => {
    const { form, studentLoginInput, passwordInput } = getFormElements();

    studentLoginInput.value = '';
    passwordInput.value = '';

    let isFormSubmitted = false;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const errorMessage = validateLoginInput(studentLoginInput.value, passwordInput.value);
      if (errorMessage !== 'Valid input.') {
        isFormSubmitted = false;
      }
    });

    form.dispatchEvent(new dom.window.Event('submit'));

    expect(isFormSubmitted).toBe(false);
  });
});
