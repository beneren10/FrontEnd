/**
 * @jest-environment jsdom
 */
const { renderDOM } = require('./helpers');

let dom;
let document;

describe('login.js', () => {
  beforeEach(async () => {
    dom = await renderDOM('./login.html');
    document = dom.window.document;

    // Mock global fetch and localStorage
    global.fetch = jest.fn();
    global.localStorage = {
      setItem: jest.fn(),
    };

    require('./client/login.js'); // Ensure the script is loaded
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle successful login', async () => {
    // Mock fetch response
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ token: 'mockToken' }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Fill form inputs
    const form = document.getElementById('login-form');
    const studentLoginInput = form.querySelector('input[name="student_login"]');
    const passwordInput = form.querySelector('input[name="password"]');

    studentLoginInput.value = 'testStudent';
    passwordInput.value = 'testPassword';

    // Spy on window.location.assign
    delete window.location;
    window.location = { assign: jest.fn() };

    // Submit the form
    const event = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    // Wait for async actions
    await new Promise((resolve) => setImmediate(resolve));

    // Check fetch call
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_login: 'testStudent',
        password: 'testPassword',
      }),
    });

    // Check localStorage and navigation
    expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
    expect(window.location.assign).toHaveBeenCalledWith('dashboard.html');
  });

  test('should handle failed login', async () => {
    // Mock fetch response
    const mockResponse = {
      status: 401,
      json: jest.fn().mockResolvedValue({ error: 'Invalid credentials' }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    // Spy on alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Fill form inputs
    const form = document.getElementById('login-form');
    const studentLoginInput = form.querySelector('input[name="student_login"]');
    const passwordInput = form.querySelector('input[name="password"]');

    studentLoginInput.value = 'wrongStudent';
    passwordInput.value = 'wrongPassword';

    // Submit the form
    const event = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    // Wait for async actions
    await new Promise((resolve) => setImmediate(resolve));

    // Check fetch call
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_login: 'wrongStudent',
        password: 'wrongPassword',
      }),
    });

    // Check alert
    expect(alertMock).toHaveBeenCalledWith('Invalid credentials');

    // Cleanup alert mock
    alertMock.mockRestore();
  });
});
