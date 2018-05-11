<template>
<div class='question_area'>

	<el-button type="primary" @click="pdfQuestion()" round> Questions PDF </el-button>
	<el-button type="primary" @click="pdfAnswer()" round> Answer PDF </el-button>

	<h2>{{ question_title }}</h2>

	<el-row>
	  <el-col v-for="(item, index) in questions" :key="index" :span="8"><div class="question">
{{ index + 1 }}. {{ item.l }} <span v-html="item.o"></span> {{ item.r }} =
		</div></el-col>
	</el-row>


	<h2>{{ answer_title }}</h2>
	<el-row>
		<el-col v-for="(item, index) in questions" :key="index" :span="8"><div class="answer">
{{ index + 1 }}. {{ item.v }}
		</div></el-col>
	</el-row>

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
    pdfQuestion() {
      let doc = new jsPDF();

      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");
    },
    pdfAnswer() {}
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
