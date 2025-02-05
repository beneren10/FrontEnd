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

  it('has images on load', ()=>{
    const imgOne = document.querySelector('#img-one')
    expect(imgOne).toHaveAttribute('src', './assets/images.png')
    expect(imgOne).toBeTruthy()
  })
})