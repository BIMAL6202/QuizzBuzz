const express = require("express");
const router = express.Router();

const questions = [
  {
    _id: 1,
    category: "Geography",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    difficulty: "easy"
  },
  {
    _id: 2,
    category: "Science",
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
    difficulty: "easy"
  },
  {
    _id: 3,
    category: "History",
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctAnswer: "George Washington",
    difficulty: "easy"
  },
  {
    _id: 4,
    category: "General",
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    difficulty: "easy"
  },
  {
    _id: 5,
    category: "Geography",
    question: "Which is the largest ocean on Earth?",
    options: ["Indian", "Pacific", "Atlantic", "Arctic"],
    correctAnswer: "Pacific",
    difficulty: "easy"
  },
  {
    _id: 6,
    category: "Science",
    question: "What is H2O commonly known as?",
    options: ["Hydrogen", "Oxygen", "Salt", "Water"],
    correctAnswer: "Water",
    difficulty: "easy"
  },
  {
    _id: 7,
    category: "Sports",
    question: "How many players are there in a football (soccer) team on the field?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11",
    difficulty: "easy"
  },
  {
    _id: 8,
    category: "Literature",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare",
    difficulty: "medium"
  },
  {
    _id: 9,
    category: "General",
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    difficulty: "easy"
  },
  {
    _id: 10,
    category: "Geography",
    question: "Mount Everest lies on the border of Nepal and which country?",
    options: ["China", "India", "Bhutan", "Pakistan"],
    correctAnswer: "China",
    difficulty: "medium"
  },
  {
    _id: 11,
    category: "History",
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    correctAnswer: "1945",
    difficulty: "medium"
  },
  {
    _id: 12,
    category: "Science",
    question: "What is the chemical symbol for Gold?",
    options: ["G", "Au", "Ag", "Go"],
    correctAnswer: "Au",
    difficulty: "medium"
  },
  {
    _id: 13,
    category: "General",
    question: "Which language has the most native speakers?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: "Mandarin Chinese",
    difficulty: "medium"
  },
  {
    _id: 14,
    category: "Technology",
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperText Transmission Package",
      "Hyper Transfer Text Protocol"
    ],
    correctAnswer: "HyperText Transfer Protocol",
    difficulty: "medium"
  },
  {
    _id: 15,
    category: "Geography",
    question: "Which country has the most natural lakes?",
    options: ["Canada", "USA", "Russia", "Brazil"],
    correctAnswer: "Canada",
    difficulty: "hard"
  },
  {
    _id: 16,
    category: "General",
    question: "How many bones are there in an adult human body?",
    options: ["196", "206", "216", "226"],
    correctAnswer: "206",
    difficulty: "medium"
  },
  {
    _id: 17,
    category: "Science",
    question: "What part of the cell contains genetic material?",
    options: ["Cytoplasm", "Nucleus", "Cell membrane", "Mitochondria"],
    correctAnswer: "Nucleus",
    difficulty: "easy"
  },
  {
    _id: 18,
    category: "General",
    question: "Which instrument measures atmospheric pressure?",
    options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
    correctAnswer: "Barometer",
    difficulty: "medium"
  },
  {
    _id: 19,
    category: "History",
    question: "The ancient city of Rome was built on how many hills?",
    options: ["Five", "Seven", "Nine", "Eleven"],
    correctAnswer: "Seven",
    difficulty: "hard"
  },
  {
    _id: 20,
    category: "Geography",
    question: "Which river flows through London?",
    options: ["Thames", "Seine", "Danube", "Rhine"],
    correctAnswer: "Thames",
    difficulty: "easy"
  }
];

router.get("/", (req, res) => {
  const sendQuestions = questions.map(({ correctAnswer, ...rest }) => rest);
  res.json(sendQuestions);
});

router.post("/submit", (req, res) => {
  const userAnswers = req.body.answers; 

  let score = 0;
  let results = [];

  questions.forEach((q) => {
    const userAns = userAnswers.find((ua) => ua._id === q._id);
    const isCorrect = userAns && userAns.selected === q.correctAnswer;
    if (isCorrect) score++;

    results.push({
      _id: q._id,
      question: q.question,
      correctAnswer: q.correctAnswer,
      selected: userAns ? userAns.selected : null,
      isCorrect
    });
  });

  res.json({
    score,
    total: questions.length,
    results
  });
});

module.exports = router;
