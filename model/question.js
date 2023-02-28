const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    required: true,
  },
  question : {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true
  }
},{timestamps: true});

const Question = mongoose.model("Question", QuestionSchema);

const AnswerSubmissionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

const Answer = mongoose.model("Answer", AnswerSubmissionSchema);


module.exports = {
    Question,
    Answer
};