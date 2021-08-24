<template>
  <div id="quiz-container">
    <div class="correctAnswers">
      You have <strong>{{ correctAnswers }} of {{ questions.length }} correct!</strong>
    </div>
    <div class="correctAnswers">
      You are at question {{ index + 1 }} of {{ questions.length }} total, hang on!
    </div>

    <hr class="divider" />

    <div>
      <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>
      <form v-if="currentQuestion">
        <button
          v-for="answer in currentQuestion.answers"
          :index="currentQuestion.key"
          :key="answer"
          v-html="answer"
          @click.prevent="selectAnswerClick"
        ></button>
      </form>

      <hr class="divider" />

      <form v-if="index + 1 == questions.length">
        <button type="submit" @click.prevent = "startNewClick"> START AGAIN? </button>
      </form>

    </div>
  </div>
</template>

<script>

import {getConfig} from "@/utils/config";

export default {
    name: "Questions",

    //get Config
    async created() {
        const config = getConfig();

        console.log(config);

        //if nothing go back
        if (config == null) {
            this.$router.push("/");
            return;
        }

        //else get the questions
        try {
                this.loading = true;

                //for indentify single answers
                let index = 0;

                //build URL
                let fetchURL = "https://opentdb.com/api.php?amount="+ config.amount +"&category="+ config.category.id +"&difficulty="+ config.difficulty.id +"&type=multiple";
                //let fetchURL = "https://opentdb.com/api.php?amount="+ 10 +"&category="+ 11 +"&difficulty="+ "easy" +"&type=multiple"

                console.log(fetchURL);

                // fetch questionns from api
                let response = await fetch(fetchURL);
                let jsonResponse = await response.json();
                let data = jsonResponse.results.map((questions) => {

                // get the answers to an array
                questions.answers = [
                    questions.correct_answer,
                    ...questions.incorrect_answers,
                ];

                // set some defaults for further use
                questions.rightAnswer = null;
                questions.key = index;
                index ++;

                return questions;
                } );

                this.questions = data;
                this.loading = false;
                     
        } 
        catch(error){
            this.error = error.message;
        }
            
    },

    // store the data
    data() {
    return {
        error: "",
        correctAnswers: 0,
        questions: [],
        loading: true,
        index: 0
        };
    },
    //computed Section
    computed: {
        //which one to ask?
        currentQuestion() {
            if(this.questions != [])
                return this.questions[this.index];
            
            return null;
        },
        questionsFinished(){
            if (this.questions.length == 0)
                return false;
            
            //is everything answered?
            let finishedQuestions = 0;
            this.questions.forEach( function(questions) {
                questions.correct_answer != null ? finishedQuestions++ : null;
            }
            );
            return finishedQuestions == this.questions.length;
        }
    
  },

    //methods Section
    methods: {
        //restart the Quiz
        startNewClick: function(){
            this.$router.push("/");
        },

        //what happens if you choose the answer
        selectAnswerClick: function(event){

            //which one was answered?
            let index = event.target.getAttribute("index");
            let selectedGivenAnswer = event.target.innerHTML;
            //make sure there is nothing wrong in the string
            let givenAnswer = selectedGivenAnswer.replace(/'/, "&#039;");

            //then set it in the array
            this.questions[index].givenAnswer = givenAnswer;

            //set the clicked button
            event.target.classList.add("clicked");
            let allButtons = document.querySelectorAll(`[index="${index}"]`)

            //disable non used buttons
            for (let i = 0; i < allButtons.length; i++){
                if (allButtons[i] == event.target) 
                    continue;
                
                allButtons[i].setAttribute("disabled", "");
            }

            //Invoke it
            this.checkAnswer(event, index);

        },

        //did you answered whise?
        checkAnswer: function(event, index){

            let actualQuestion = this.questions[index];

            //answer given?
            if (actualQuestion.givenAnswer === actualQuestion.correct_answer)
                {
                    //give user a nice feedback
                    event.target.classList.add("rightAnswer");

                    //and mark as right
                    this.questions[index].rightAnswer = true;

                    //score some point
                    this.correctAnswers++;

                }

                else {
                    //give user a not so nice feedback
                    event.target.classList.add("wrongAnswer");

                    //mark as false
                    this.questions[index].rightAnswer = false;

                    //and show the right on
                    let correctAnswer = this.questions[index].correct_answer;
                    let allButtons = document.querySelectorAll(`[index="${index}"]`);

                    allButtons.forEach(function(button) 
                    {
                        if (button.innerHTML === correctAnswer) 
                        {
                            button.classList.add("showRightAnswer");
                        }
                            
                    });
            }
                
            //set index one up
            if (this.index < this.questions.length - 1) {
                setTimeout(
                    function() {
                        this.index += 1;
                    }.bind(this),
                3000 );
            }
            
        },


        //load data as soon as the component is loaded
        mounted() {
            this.fetchQuestions();
        }
    }
}

</script>

<style scoped>
    #quiz-container {
        margin: 1rem auto;
        padding: 1rem;
        max-width: 750px;
    }

  h1 {
        font-size: 1.3rem;
        padding: 0.7rem;
    } 

  .divider {
        margin: 0.5rem 0;
        border: 3px solid rgba(72, 73, 73, 0.7);
        border-radius: 2px;
        box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
    }

    button.rightAnswer {
        color: black;
        background: linear-gradient(
            210deg,
            rgba(0, 178, 72, 0.25),
            rgba(0, 178, 72, 0.5)
        );
    }

    button.wrongAnswer {
    color: black;
    background: linear-gradient(
        210deg,
        rgba(245, 0, 87, 0.25),
        rgba(245, 0, 87, 0.5)
    );
    }

    button.showRightAnswer {
    color: black;
    background: linear-gradient(
        210deg,
        rgba(54, 131, 2, 0.25),
        rgba(5, 243, 5, 0.5)
    );
    }
</style>