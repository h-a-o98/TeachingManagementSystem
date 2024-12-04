<template>
  <div>
    <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="学科">
        <el-select v-model="xke" clearable placeholder="请选择对应学科">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程阶段">
        <el-select v-model="jd" clearable placeholder="请选择对应阶段">
          <el-option
            v-for="(item, index) in questions"
            :key="index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-select v-model="kc" placeholder="请选择对应课程">
          <el-option
            v-for="(item, index) in kecheng"
            :key="index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目" prop="tit">
        <el-input type="text" v-model="ruleForm.tit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <vue-editor v-model="content"></vue-editor>
      </el-form-item>
      <el-form-item label="分值" prop="score">
        <el-input type="text" v-model="ruleForm.score" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="评分标准" prop="pingfen">
        <el-input type="text" v-model="ruleForm.pingfen" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>

        <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%" height="20px">
  <span>考题已添加</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary">确 定</el-button>
  </span>
</el-dialog>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
   name: "AB1",
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('题目不能为空'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('分值不能为空'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('评分标准不能为空'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      xke: "",
      jd: "",
      kc:"",
       jieduanid:'',
      nameid:'',
      datas:[],
      kecheng: [],
      content: "<p></p>",
       ruleForm: {
           tit: "",
           score:10,
          pingfen:'',
        },
        rules: {
          tit: [
            { validator: validatePass, trigger: 'blur' }
          ],
          score:[
          { validator: validatePass1, trigger: 'blur' }
          ],
          pingfen:[
          { validator: validatePass2, trigger: 'blur' }
          ]
        },
      options: [
        {
          value: "HTML5",
          label: "HTML5",
        },
        {
          value: "JAVA",
          label: "JAVA",
        },
      ],
      dialogVisible: false
    };
  },
  components: {
    VueEditor,
  },
  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      this.dialogVisible = true
      this.$refs[formName].validate(async (valid) => {
         if (valid) {
            this.bianhao=this.jieduanid+"-"+this.nameid;
            this.discipline=(this.xke=="HTML5")?"HTML5大前端就业班V12":"Java分布式开发V11";
            const res = await this.$axios("zhoukao/postTiKu", 
            {answer:this.content,
            bianhao:this.bianhao,
            biaozhun:this.ruleForm.pingfen,
            c_name:this.kc,
            c_phase:this.jd,
            discipline:this.discipline,
            score:this.ruleForm.score,
            title:this.ruleForm.tit});
            console.log(res);

            // alert('考题已添加');
          } else {
            console.log('提交不成功');
            return false;
          }
        });
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.xke='';
        this.jd='';
        this.kc='';
        this.content='Insert text here ...';
      },
  },
  watch: {
    xke: {
      async handler(newV) {
        // console.log(this.questions,"666666666666");
        const res = await this.$axios("zhoukao/getTiKu", { xk: newV });
        this.datas = res.data.data;
      },
      immediate: true,
    },
    jd: {
      handler(newV) {
        this.questions.map((item) => {
          // console.log(item);
          if (item.label == newV) {
            // console.log(newV+"课程阶段编号"+item.id);
            this.jieduanid=item.id;
            this.kecheng=item.children;
          }
        });
      },
      immediate:true
    },
    kc: {
       handler(newV){
        this.kecheng.map(item=>{
          if(item.label==newV){
            // console.log(newV+"课程名称编号"+item.id);
            this.nameid=item.id;
          }
        })
        },
        immediate:true
    },
  },
  computed: {
    questions() {
      //获取所有的阶段名称
      const jieduans = [...new Set(this.datas.map((item) => item.c_phase))];
      //获取所有的课程名称
      const kechengs = [...new Set(this.datas.map((item) => item.c_name))];
      //将所有的题目按照课程进行归类处理
      const datas = kechengs.map((item) => {
        const obj = { label: item, children: null };
        obj.children = this.datas.filter((item1) => item1.c_name == item);
        if (!obj.id) {
         obj.children[0].bianhao ? obj.id = Number(obj.children[0].bianhao.split("-")[1]) :'';
        }
        return obj;
      });
      //将所有按照课程归类后的数据按照阶段进一步归类
      let ques = jieduans.map((item) => {
        const obj = { label: item, children: null };
        obj.children = datas.filter(
          (item1) => item1.children[0].c_phase == item
        );
        if (!obj.id) {
          obj.children[0].children[0].bianhao ? obj.id = Number(obj.children[0].children[0].bianhao.split("-")[0]) : '';
        }
        return obj;
      });
      //将数据源按照阶段排序
      ques.sort((item1, item2) => item1.id - item2.id);
      ques = ques.map((item) => {
        item.children.sort((item1, item2) => item1.id - item2.id);
        return item;
      });
      return ques;
    },
  },
};
</script>