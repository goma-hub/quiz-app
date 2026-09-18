const questions = [
  {
    question: "日本で最も面積が大きい都道府県はどれ？",
    choices: ["長野県", "北海道", "新潟県", "岩手県"],
    answer: 1,
    explanation: "北海道の面積は約8万3千平方キロメートルで、日本の都道府県で最も大きいです。",
  },
  {
    question: "1年は通常、何週間と何日でできている？",
    choices: ["50週間と15日", "51週間と8日", "52週間と1日", "53週間と0日"],
    answer: 2,
    explanation: "365日は52週間（364日）と1日です。うるう年はさらに1日多くなります。",
  },
  {
    question: "植物が光を使って養分をつくるはたらきを何という？",
    choices: ["呼吸", "蒸散", "発芽", "光合成"],
    answer: 3,
    explanation: "光合成では、植物が光のエネルギーを利用して養分をつくります。",
  },
  {
    question: "日本国憲法が施行されたのは何年？",
    choices: ["1945年", "1946年", "1947年", "1950年"],
    answer: 2,
    explanation: "日本国憲法は1946年11月3日に公布され、1947年5月3日に施行されました。",
  },
  {
    question: "オリンピックの五輪マークに使われていない色はどれ？",
    choices: ["緑", "紫", "黄", "赤"],
    answer: 1,
    explanation: "五輪マークは青・黄・黒・緑・赤の5色で構成されています。",
  },
  {
    question: "地球の表面積のうち、海が占める割合に最も近いのはどれ？",
    choices: ["約30%", "約50%", "約70%", "約90%"],
    answer: 2,
    explanation: "地球の表面のおよそ71%は海で覆われています。",
  },
];

const questionElement = document.querySelector("#question");
const choicesElement = document.querySelector("#choices");
const progressElement = document.querySelector("#progress");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const scoreElement = document.querySelector("#score");
const scoreMessageElement = document.querySelector("#score-message");
const startButtons = document.querySelectorAll(".start-button");
const restartButtons = document.querySelectorAll(".restart-button");

let currentQuestion = 0;
let score = 0;
let activeQuestions = [];

function showQuestion() {
  const quiz = activeQuestions[currentQuestion];
  progressElement.textContent = `第${currentQuestion + 1}問 / ${activeQuestions.length}問`;
  questionElement.textContent = quiz.question;
  choicesElement.replaceChildren();
  feedbackElement.hidden = true;
  feedbackElement.className = "feedback";
  nextButton.textContent = "次の問題へ";
  nextButton.hidden = true;

  quiz.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = `${index + 1}. ${choice}`;
    button.addEventListener("click", () => selectAnswer(index));
    choicesElement.append(button);
  });
}

function selectAnswer(selectedIndex) {
  const quiz = activeQuestions[currentQuestion];
  const isCorrect = selectedIndex === quiz.answer;
  const buttons = choicesElement.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === quiz.answer) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("incorrect");
  });

  if (isCorrect) score += 1;
  feedbackElement.classList.add(isCorrect ? "correct" : "incorrect");
  feedbackElement.innerHTML = `<strong>${isCorrect ? "正解！" : "不正解"}</strong><br>${quiz.explanation}`;
  feedbackElement.hidden = false;
  nextButton.textContent = currentQuestion === activeQuestions.length - 1 ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
  nextButton.focus();
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  progressElement.textContent = `全${activeQuestions.length}問終了`;
  scoreElement.textContent = `${activeQuestions.length}問中${score}問正解！`;
  scoreMessageElement.textContent = score === activeQuestions.length ? "素晴らしい！全問正解です。" : score >= Math.ceil(activeQuestions.length / 2) ? "お見事！一般常識が身についています。" : "もう一度挑戦して、知識を深めましょう。";
  restartButtons[0].focus();
}

function startQuiz(questionCount) {
  currentQuestion = 0;
  score = 0;
  activeQuestions = questions.slice(0, questionCount);
  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

nextButton.addEventListener("click", () => {
  if (currentQuestion === activeQuestions.length - 1) {
    showResult();
  } else {
    currentQuestion += 1;
    showQuestion();
  }
});

startButtons.forEach((button) => {
  button.addEventListener("click", () => startQuiz(Number(button.dataset.questionCount)));
});

restartButtons.forEach((button) => {
  button.addEventListener("click", () => startQuiz(Number(button.dataset.questionCount)));
});
