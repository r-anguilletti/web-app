import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("questions.sqlite", (err) => {
  if(err){
    throw err;
  }
});

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, userId, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata (3)
  this.getAnswers = () => {
    return new Promise((resolve,reject)=>{
      const sql= "SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId = user.id WHERE answer.id= ?";
      db.all(sql,[this.id],(err,row)=>{
        if(err){
          reject(err);
        }else{
          const answers = row.map(row=>new Answer(ans.id, ans.text, ans.email, ans.authorId, ans.date, ans.score));
          resolve(answers);
        }
      });

    });
  }

  // metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata (4)
  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO answer (id, text, authorId, date) VALUES (?, ?, ?, ?)";
      db.run(sql, [answer.id, answer.text, answer.authorId, answer.date.toISOString()], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  // metodo per votare una risposta esistente, con up = +1 e down = -1 (5)
  this.voteAnswer = (answerId, value) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE answer SET score = score + ? WHERE id = ?"; // i punti integgroga il valore di score con il valore di value
      const delta = value === "up" ? 1 : -1; //if su una riga
      db.run(sql, [delta, answerId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, email, userId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.score = score;
  this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {


  // metodo per recuperare una singola Question dato il suo ID (1)
  this.getQuestion = (id) => {
    return new Promise((resolve,reject)=>{
      const sql= "SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id= ?";
      db.get(sql,[id],(err,row)=>{
        if(err){
          reject(err);
        }else{
          resolve(new Question(row.id,row.text,row.email,row.authorId, row.date));
        }
      });

    });
  }

  // metodo per aggiungere una nuova Question di un autore esistente (2)
  this.addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO question (text, authorId, date) VALUES (?, ?, ?)";
      db.run(sql, [question.text, question.userId, question.date.toISOString()], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
}

// funzione per il test
async function main() {
  const questionList = new QuestionList();
  const question = await questionList.getQuestion(1);
  console.log(await questionList.getQuestion(1));

  console.log(await question.getAnswers());
  return;
}

main();