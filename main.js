const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const correctAnswer = document.querySelector('#correct-answer');

let score = 0; // Right answers
let questionIndex = 0; // Current question

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
	correctAnswer.innerHTML = '';
}

function showQuestion() {
	submitBtn.innerText = 'Ответить';
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = 
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate
								.replace('%answer%', answerText)
								.replace('%number%', index + 1);
		
		listContainer.innerHTML += answerHTML;
	}

	submitBtn.onclick = checkAnswer;
}

function checkAnswer() {
	// Find checked radio btn
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	// if no check - exit from function
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	// Number of user answer
	const userAnswer = parseInt(checkedRadio.value);

	let rightChoose = questions[questionIndex]['correct'];

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
		correctAnswer.innerHTML = `
					<p>Верно!</p>
		`;
		correctAnswer.style.color = '#84b400';
	} else {
		correctAnswer.innerHTML = `
					<p>Увы! Правильный ответ - ${questions[questionIndex].answers[rightChoose-1]}</p>
		`;
		correctAnswer.style.color = 'red';

	}

	submitBtn.blur();
	submitBtn.innerText = 'Следующий вопрос';
	submitBtn.onclick = nextquestion;
}

function nextquestion() {
	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	let title, message;

	// Title and message
	if (score === questions.length) {
		title = 'Поздравляем! ';
		message = 'Вы ответили верно на все вопросы!';
	} else if ( (score * 100) / questions.length  > 50) {
		title = 'Неплохой результат! ';
		message = 'Вы дали более половины правильных ответов!';
	} else {
		title = 'Стоит подучить теорию';
		message = 'Пока у Вас меньше половины правильных ответов';
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	//Change btn to 'play again'
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();

}

clearPage();
showQuestion();