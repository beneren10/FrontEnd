/**
 * @jest-environment jsdom
 */
const { fetchScores } = require('../client/dashboard');  // Adjust this path

describe('Leaderboard API and DOM Manipulation', () => {
  let mockFetch;
  let mockLocalStorage;
  
  beforeEach(() => {
    // Mock fetch globally
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    

    // Mock localStorage
    mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('mock_token'), // Mock token retrieval
    };
    global.localStorage = mockLocalStorage;

    // Mock DOM elements
    document.body.innerHTML = `
      <div id="first-one"></div>
      <div id="last-one"></div>
      <div id="score-one"></div>
      <div id="first-two"></div>
      <div id="last-two"></div>
      <div id="score-two"></div>
      <div id="first-three"></div>
      <div id="last-three"></div>
      <div id="score-three"></div>
      <div id="update-name"></div>
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();  // Reset mocks after each test
  });

  it('should call fetchAPIscores when DOMContentLoaded event is triggered', async () => {
    const event = new Event('DOMContentLoaded');
    window.dispatchEvent(event);

    expect(mockFetch).toHaveBeenCalledTimes(2);  // Ensure fetch is called
  });

  it('should fetch scores and update the leaderboard', async () => {
    // Mock the fetch response for scores
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { firstname: 'John', lastname: 'Doe', total_marks: 95 },
        { firstname: 'Jane', lastname: 'Smith', total_marks: 90 },
        { firstname: 'Alice', lastname: 'Johnson', total_marks: 85 },
      ]),
    });

    const scores = [
      { firstname: 'John', lastname: 'Doe', total_marks: 95 },
      { firstname: 'Jane', lastname: 'Smith', total_marks: 90 },
      { firstname: 'Alice', lastname: 'Johnson', total_marks: 85 },
    ];

    await fetchScores();  // Trigger the fetchScores function

    // Ensure that the DOM elements are updated
    expect(document.querySelector('#first-one').textContent).toBe(scores[0].firstname);
    expect(document.querySelector('#last-one').textContent).toBe(scores[0].lastname);
    expect(document.querySelector('#score-one').textContent).toBe(String(scores[0].total_marks));

    expect(document.querySelector('#first-two').textContent).toBe(scores[1].firstname);
    expect(document.querySelector('#last-two').textContent).toBe(scores[1].lastname);
    expect(document.querySelector('#score-two').textContent).toBe(String(scores[1].total_marks));

    expect(document.querySelector('#first-three').textContent).toBe(scores[2].firstname);
    expect(document.querySelector('#last-three').textContent).toBe(scores[2].lastname);
    expect(document.querySelector('#score-three').textContent).toBe(String(scores[2].total_marks));
  });

  it('should handle errors when fetching scores', async () => {
    // Mock the fetch response for scores with an error
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const consoleSpy = jest.spyOn(console, 'log');

    await fetchScores();

    // Ensure error is logged
    expect(consoleSpy).toHaveBeenCalledWith('Error http status code 500');
    consoleSpy.mockRestore();
  });
});
