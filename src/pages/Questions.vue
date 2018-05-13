<template>
<div class="question_area">

	<el-button type="primary" @click="pdfQuestion()" round> Questions PDF </el-button>
	<el-button type="primary" @click="pdfAnswer()" round> Answer PDF </el-button>

	<div id="questions">
		<h2>{{ question_title }}</h2>

		<el-row>
		  <el-col v-for="(item, index) in questions" :key="index" :span="8">
				<div class="question">
					({{ index + 1 }})  {{ item.l }} <span v-html="item.o"></span> {{ item.r }} =
				</div>
			</el-col>
		</el-row>
	</div>

	<div id="answers">
		<h2>{{ answer_title }}</h2>
		<el-row>
			<el-col v-for="(item, index) in questions" :key="index" :span="8">
				<div class="answer">
					({{ index + 1 }})  {{ item.v }}
				</div>
			</el-col>
		</el-row>
	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "underscore";

import compute from "@/components/service/compute";
import * as jsPDF from "jspdf";

export default {
  data() {
    return {
      question_title: "",
      answer_title: "",
      questions: []
    };
  },
  created() {
    let [add_list, sub_list, multiply_list, divide_list, questions] = [
      [],
      [],
      [],
      [],
      []
    ];

    switch (this.settings.type) {
      case "add":
        add_list = compute.initAdds(this.settings.min, this.settings.max);
        this.questions = compute.pick(add_list, this.settings.size);
        this.question_title = "questions for addition";

        break;

      case "substract":
        add_list = compute.initAdds(this.settings.min, this.settings.max);
        sub_list = compute.initSubstracts(add_list);
        this.questions = compute.pick(sub_list, this.settings.size);
        this.question_title = "questions for substraction";
        break;

      case "multiply":
        multiply_list = compute.initMutiplies(
          this.settings.min,
          this.settings.max
        );
        this.questions = compute.pick(multiply_list, this.settings.size);
        this.question_title = "questions for multiplication";
        break;

      case "divide":
        multiply_list = compute.initMutiplies(
          this.settings.min,
          this.settings.max
        );
        divide_list = compute.initDivides(multiply_list);
        this.questions = compute.pick(divide_list, this.settings.size);
        this.question_title = "questions for divide";
        break;

      default:
        console.log("Mix in construction");
    }
    this.answer_title = "answer";
  },
  computed: {
    ...mapGetters(["settings"])
  },
  methods: {
    // Paper size
    // A4:	210 × 297mm	8.3 × 11.7inch
    // letter: 216 × 279mm 8 1⁄2 × 11	inch
    pdfQuestion() {
      // console.log("question pdf called");
      let doc = new jsPDF();

      let list = _.map(this.questions, function(item, index) {
        return "(" + (index + 1) + ")  " + item.l + item.o + item.r + "=";
      });

      // compute three columns
      let column1 = this.getColumn(list, 0);

      // add an empty line
      column1 = this.addSpaceLine(column1);
      let column2 = this.getColumn(list, 1);
      column2 = this.addSpaceLine(column2);
      let column3 = this.getColumn(list, 2);
      column3 = this.addSpaceLine(column3);

      // compute the pages - 40 columns per page
      while (column1.length > 0) {
        let c1 = column1.splice(0, 39);
        let c2 = column2.splice(0, 39);
        let c3 = column3.splice(0, 39);
        doc.text(c1, 10, 30);
        doc.text(c2, 80, 30);
        doc.text(c3, 150, 30);
        if (column1.length > 0) {
          doc.addPage();
        }
      }

      doc.save("questions.pdf");
    },
    getColumn(list, modulo) {
      return _.filter(list, function(item, index) {
        return index % 3 == modulo;
      });
    },
    addSpaceLine(list) {
      let line = [];
      list.forEach(x => {
        line.push(x);
        line.push(" ");
      });
      return line;
    },
    pdfAnswer() {
      let doc = new jsPDF();

      let list = _.map(this.questions, function(item, index) {
        return "(" + (index + 1) + ")  " + item.v;
      });

      // compute three columns
      let column1 = this.getColumn(list, 0);

      // add an empty line
      column1 = this.addSpaceLine(column1);
      let column2 = this.getColumn(list, 1);
      column2 = this.addSpaceLine(column2);
      let column3 = this.getColumn(list, 2);
      column3 = this.addSpaceLine(column3);

      // compute the pages - 40 columns per page
      while (column1.length > 0) {
        let c1 = column1.splice(0, 39);
        let c2 = column2.splice(0, 39);
        let c3 = column3.splice(0, 39);
        doc.text(c1, 10, 30);
        doc.text(c2, 80, 30);
        doc.text(c3, 150, 30);
        if (column1.length > 0) {
          doc.addPage();
        }
      }

      doc.save("answer.pdf");
    }
  }
};
</script>
<style lang="scss">
%question_base {
  height: 36px;
  padding-top: 20px;
  padding-left: 40px;
  text-align: left;
}
.question_area {
  text-align: center;
  .question {
    @extend %question_base;
  }

  .answer {
    @extend %question_base;
  }
}
</style>
