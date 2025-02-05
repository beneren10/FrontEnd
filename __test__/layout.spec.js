const { renderDOM } = require('./helpers');

let dom;
let document;

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./index.html');
    document = await dom.window.document;
  })
  
  it('has a button', () => {
    const btn = document.querySelector('button')
    expect(btn).toBeTruthy
    expect(btn.innerHTML).toBe("Click me")
  })

  it('h1 is empty when website loads', () => {
    const h1 = document.querySelector('h1')
    expect(h1).toBeTruthy
    expect(h1.innerHTML).toContain('')
  })
})