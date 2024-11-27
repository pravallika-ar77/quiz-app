// Questions Array
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ];
  // Timmer
  let timer; // To store the timer interval
let timeLeft = 10; // Time for each question
const timerElement = document.getElementById("time-left");

  
  // Initialize variables
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Select elements
  const questionElement = document.getElementById("question");
  const optionsElements = document.querySelectorAll(".option");
  const nextButton = document.getElementById("next-btn");
  
  // Load a question
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElements.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
      button.dataset.correct = currentQuestion.options[index] === currentQuestion.answer;
    });
  }
  
  // Handle option click
  optionsElements.forEach((button) => {
    button.addEventListener("click", () => {
      // Reset button styles
      optionsElements.forEach((btn) => btn.classList.remove("selected"));
      // Highlight the selected option
      button.classList.add("selected");
    });
  });
  
  // Handle "Next" button click
  nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(".option.selected");
    if (selectedOption) {
      const isCorrect = selectedOption.dataset.correct === "true";
      if (isCorrect) score++;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    } else {
      alert("Please select an option!");
    }
  });
  
  // Show results
  function showResults() {
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    document.querySelector(".options").style.display = "none";
    nextButton.style.display = "none";
  }
  
  // Start the quiz
  loadQuestion();
  
  function startTimer() {
    timeLeft = 10; // Reset the time for each question
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 1000);
  }
  function handleTimeOut() {
    alert("Time's up! Moving to the next question.");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  function loadQuestion() {
    clearInterval(timer); // Stop any previous timer
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElements.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
      button.dataset.correct = currentQuestion.options[index] === currentQuestion.answer;
    });
    startTimer(); // Start the timer for the new question
  }
  function showResults() {
    clearInterval(timer); // Stop the timer
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    document.querySelector(".options").style.display = "none";
    nextButton.style.display = "none";
    document.getElementById("timer").style.display = "none"; // Hide the timer
  }
        