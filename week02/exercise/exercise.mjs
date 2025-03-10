import dayjs from "dayjs";

function Answer(text, username, date, score=0) {
  this.text=text;
  this.username=username;
  this.score=score;
  this.date=dayjs(date);

  this.toString = () => {
    return `${this.username} replied ${this.text} on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
  }
}

function Question(text, username, date) {
  this.text=text;
  this.username=username;
  this.date=dayjs(date);
  this.answers = [];

  this.add = (answer) => {
    this.answers.push(answer);
  }

  this.find = (username) => {
    /*const foundAnswers = [];
    for(const ans of this.answers) {
      if(ans.username === username)
        foundAnswers.push(ans);
    }
    return foundAnswers;*/
    return this.answers.filter(ans => ans.username === username);
  }

  this.afterDate = (date) => {
    return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
  }

  this.listByDate = () => {
    return [...this.answers].sort((a,b) => (a.date.isAfter(b.date)) ? 1 : -1);
  }

  this.listByScore = () => {
    return [...this.answers].sort((a,b) => b.score - a.score);
  }

}

const question = new Question('Is JavaScript better than Python?', 'luigidr', '2025-02-28');

const firstAnswer = new Answer('Yes', 'stefanoz', '2025-03-03', -10);
const secondAnswer = new Answer('Not in a million year', 'guidovanrossum', '2025-03-02', 5);
const thirdAnswer = new Answer('No', 'alessiog', '2025-03-03');
const fourthAnswer = new Answer('Then, I don\'t know', 'stefanoz', '2025-03-04');

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answersByStefano = question.find("stefanoz");

console.log(question);
console.log("Answers by Stefano: " + answersByStefano); // concatena stringhe => chiama il toString() di Answer
console.log("\nBy date: " + question.listByDate());
console.log("\nBy score: " + question.listByScore());
