const { renderDOM } = require('./helpers');

let dom;
let document;

describe('landing.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('landing.html');
    document = await dom.window.document;
  })
  
  it('has a link to head', () => {
    const a = document.querySelector('a')
    expect(a).toBeTruthy
    expect(a.href).toBe("file:///Users/ben/Desktop/LaFosse/ProjectTeam/FrontEnd/landing.html")
  })

  it('main container loads when when website loads', () => {
    const container = document.querySelector('.container-fluid')
    expect(container).toBeTruthy
  })

  describe('Image Loading Test', () => {
    it('should verify the image is complete', (done) => {
      const img = document.querySelector('#img-one')
  
      img.onload = () => {
        expect(img.complete).toBe(true);
        done();
      };
  
      img.onerror = () => {
        done.fail('Image failed to load');
      };
    });
  });
  

  it('displays dark mode', () => {
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#dark-mode')

    darkModeBtn.click()
    expect(body.className).toBe('dark-mode')
  })

  it('adds the input value to the h1', () => {
    const form = document.querySelector('form')
    const h1 = document.querySelector('h1')
  
    const input = document.querySelector('#name')
    input.value = 'emile'
    form.dispatchEvent(new dom.window.Event('submit'));
  
    expect(h1.innerHTML).toContain(input.value)
  })

  it('switches back to light mode', () => {
    const body = document.querySelector('body')
    const darkModeBtn = document.querySelector('#dark-mode')

    darkModeBtn.click()
    darkModeBtn.click()
    expect(body.className).toBe('')
  })
})
