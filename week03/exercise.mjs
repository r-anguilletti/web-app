import dayjs from "dayjs";

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, userId, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata (3)
  this.getAnswers = () => {}

  // metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata (4)
  this.addAnswer = (answer) => {}

  // metodo per votare una risposta esistente, con up = +1 e down = -1 (5)
  this.voteAnswer = (answerId, value) => {}
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
      const sql= "SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE id= ?";
      db.get(sql,[id],(err,row)=>{
        if(err){
          reject(err);
        }else{
          resolve(new Question(row.id,row.text,row.email,row.authorId, row.date));
        }
      });

    })
  }

  // metodo per aggiungere una nuova Question di un autore esistente (2)
  this.addQuestion = (question) => {}
}

// funzione per il test
function main() {
  return;
}

main();