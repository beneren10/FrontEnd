const { renderDOM } = require('./helpers');

let dom;
let document;

describe('landing.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./landing.html');
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

  it('Expect img urls to be correct', ()=>{
    const imgOne = document.querySelector('#img-one')
    expect(imgOne.src).toBe('file:///Users/ben/Desktop/LaFosse/ProjectTeam/FrontEnd/assets/images.png')
  })

  it('should display the header with the correct title', () => {
    const header = document.querySelector('header');
    expect(header).not.toBeNull();
    const title = document.querySelector('header a span.fs-2');
    expect(title.textContent).toBe('LingoQuest');
  });

  it('should have the correct images with valid alt attributes', () => {
    const imgOne = document.getElementById('img-one');
    const imgTwo = document.getElementById('img-two');
    const imgThree = document.getElementById('img-three');

    expect(imgOne).not.toBeNull();
    expect(imgOne.src).toContain('file:///Users/ben/Desktop/LaFosse/ProjectTeam/FrontEnd/assets/images.png');

    expect(imgTwo).not.toBeNull();
    expect(imgTwo.src).toContain('file:///Users/ben/Desktop/LaFosse/ProjectTeam/FrontEnd/assets/atlas.png');

    expect(imgThree).not.toBeNull();
    expect(imgThree.src).toContain('file:///Users/ben/Desktop/LaFosse/ProjectTeam/FrontEnd/assets/languages.png');

  });
})

