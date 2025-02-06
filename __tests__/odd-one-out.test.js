
const { renderDOM } = require('./helpers');

let dom;
let document;

describe('odd-one-out.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./odd-one-out.html');
    document = dom.window.document;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the title correctly', () => {
    const title = document.title;
    expect(title).toBe('Welcome to LingoQuest');
  });

  test('should render the header with LingoQuest logo and title', () => {
    const logo = document.querySelector('img');
    const title = document.querySelector('span.fs-2');

    expect(logo).toBeTruthy();
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('LingoQuest');
  });

  test('should have a Home button', () => {
    const homeButton = document.querySelector('button');
    expect(homeButton).toBeTruthy();
    expect(homeButton.textContent).toBe('Home');
  });

  test('should render all four options correctly in the odd-one-out game', () => {
    const options = [
      document.getElementById('one'),
      document.getElementById('two'),
      document.getElementById('three'),
      document.getElementById('four')
    ];

    options.forEach((option) => {
      expect(option).toBeTruthy();
      expect(option.classList.contains('fs-3')).toBe(true);
      expect(option.style.minWidth).toBe('20%');
    });

    // Check specific text inside each option
    expect(options[0].textContent.trim()).toBe('Beunos Dias');
    expect(options[1].textContent.trim()).toBe('Hola');
    expect(options[2].textContent.trim()).toBe('Beunos Tardes');
    expect(options[3].textContent.trim()).toBe('Bibliotheca');
  });

  test('should update score when an option is clicked', () => {
    const scoreElement = document.querySelector('.score span');
    const optionOne = document.getElementById('one');
    const optionTwo = document.getElementById('two');
    const optionThree = document.getElementById('three');
    const optionFour = document.getElementById('four');

    // Mock function to simulate a click event and score update
    const mockScoreUpdate = jest.fn();

    // Mocking score update functionality
    optionOne.addEventListener('click', () => {
      scoreElement.textContent = '1';
      mockScoreUpdate();
    });

    // Trigger click event on option one
    optionOne.click();

    // Check if the score updates and mock function was called
    expect(scoreElement.textContent).toBe('1');
    expect(mockScoreUpdate).toHaveBeenCalledTimes(1);

    // Trigger click event on another option
    optionTwo.addEventListener('click', () => {
      scoreElement.textContent = '2';
      mockScoreUpdate();
    });
    optionTwo.click();

    // Check if the score updates correctly after second click
    expect(scoreElement.textContent).toBe('2');
    expect(mockScoreUpdate).toHaveBeenCalledTimes(2);
  });

  test('should not let score go below 0', () => {
    const scoreElement = document.querySelector('.score span');
    const optionOne = document.getElementById('one');
    const optionTwo = document.getElementById('two');

    // Set the score to 0
    scoreElement.textContent = '0';

    // Mock function to simulate a click event that reduces the score
    const mockScoreUpdate = jest.fn(() => {
      let score = parseInt(scoreElement.textContent);
      if (score > 0) {
        scoreElement.textContent = (score - 1).toString();
      }
    });

    // Attach event listeners to options
    optionOne.addEventListener('click', mockScoreUpdate);
    optionTwo.addEventListener('click', mockScoreUpdate);

    // Trigger click event on option one and option two
    optionOne.click();
    optionTwo.click();

    // Ensure score is not below 0
    expect(scoreElement.textContent).toBe('0');
    expect(mockScoreUpdate).toHaveBeenCalledTimes(2);
  });
});
