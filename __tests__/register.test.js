const { renderDOM } = require('./helpers');

let dom;
let document;

describe('register.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./register.html');
    document = await dom.window.document;
  })

  it('has a log in button', () => {
    const teacherBtn = document.querySelector('#teachers')
    const studentBtn = document.querySelector('#students')
    expect(teacherBtn).toBeTruthy
    expect(studentBtn).toBeTruthy
    expect(teacherBtn.innerHTML).toBe("Teachers")
    expect(studentBtn.innerHTML).toBe("Students")
  })  

  it('should call a function when the "Teachers" button is clicked', () => {
    const teachersButton = document.getElementById('teachers');
    const mockFunction = jest.fn();

    teachersButton.addEventListener('click', mockFunction);
    teachersButton.click();

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should call a function when the "Students" button is clicked', () => {
    const studentsButton = document.getElementById('students');
    const mockFunction = jest.fn();

    studentsButton.addEventListener('click', mockFunction);
    studentsButton.click();

    expect(mockFunction).toHaveBeenCalledTimes(1);
});

  it('Expect title text to be correct', ()=>{
    const titlePage = document.querySelector('#title-id')
    expect(titlePage.textContent).toContain('Sign up here Compadre')
  })

  it('should display the header with the correct title', () => {
    const header = document.querySelector('header');
    expect(header).not.toBeNull();
    const title = document.querySelector('header a span.fs-2');
    expect(title.textContent).toBe('LingoQuest');
  });

  it('should include form element and correct', () => {
    const formId = document.getElementById('registerForm');
    const firstName = document.getElementById('form3Example1c')
    const lastName = document.getElementById('form3Example2c')
    const student_login = document.getElementById('form3Example3c')
    const password = document.getElementById('form3Example4c')

    expect(formId).toBeDefined()

    expect(firstName.type).toBe('text')
    expect(firstName.name).toBe('firstName')
    expect(lastName.type).toBe('text')
    expect(lastName.name).toBe('lastName')
    expect(student_login.type).toBe('text')
    expect(student_login.name).toBe('student_login')
    expect(password.type).toBe('password')
    expect(password.name).toBe('password')
  });

  it('should include a register button', ()=>{
    const register = document.querySelector('#submitBtn')
    const mockFunction = jest.fn();

    expect(register).toBeDefined()
    expect(register.type).toBe('submit')
    expect(register.innerHTML).toBe('Register')
  })
})

