<template>
  <div>
    <el-row class="card-box" :style="right?'margin-right:300px':'margin-right:0'">
      <!-- 标题 -->
      <h4 style="text-align:center">影像报告单</h4>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 用户信息 -->
      <el-row :gutter="20" class="inner-center">
        <el-col :span="6">
          <el-row>姓名：<span>{{info.absname}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>性别：<span>{{info.sex}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>年龄：<span>{{info.old}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>检查单号：<span>{{info.checkOrderNumber}}</span></el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="inner-center mg-top">
        <el-col :span="6">
          <el-row>科室：<span>{{info.department}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>床号：<span>{{info.berth}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>ID：<span>{{info.reportId}}</span></el-row>
        </el-col>
        <el-col :span="6">
          <el-row>号：<span>{{info.number}}</span></el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="inner-center mg-top">
        <el-col :span="12">
          <el-row>检查日期：{{info.checkdate}}</el-row>
        </el-col>
        <el-col :span="12">
          <el-row>报告日期：{{info.reportdate}}</el-row>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 内容 -->
      <el-row class="inner-center">检查名称：</el-row>
      <el-row class="inner-center mg-top">影像所见：</el-row>
      <el-row class="inner-center mg-small">
        <el-input
          select="1"
          type="textarea"
          placeholder="请输入内容"
          v-model="textareaA"
          :autosize="{ minRows: 2}"
          show-word-limit
          @focus="inputClick"
        ></el-input>
      </el-row>
      <el-row class="inner-center mg-big">诊断意见：</el-row>
      <el-row class="inner-center mg-small">
        <el-input
          select="2"
          type="textarea"
          placeholder="请输入内容"
          v-model="textareaB"
          :autosize="{ minRows: 2}"
          show-word-limit
          @focus="inputClick"
        ></el-input>
      </el-row>
      <el-row class="doctor-row">
        <div style="width:50%;text-align:left">报告医师：</div>
        <div style="width:50%;text-align:right">审核医师：</div>
      </el-row>
      <el-divider></el-divider>
      <el-row style="text-align:center;fontSize:15px">（此影像资料仅供临床医师参考）</el-row>
    </el-row>

    <div class="right_control" :style="right?'margin-right:300px':'margin-right:0'">
      <i class="el-icon-caret-left" @click="openDrawer"></i>
    </div>
    <el-row v-if="right" class="right_model">
      <el-tabs v-model="activeName" @tab-click="tabsClick(activeName)" stretch>
        <el-tab-pane label="标签添加" name="first">
          <el-row style="margin-bottom:10px">
            <el-select v-model="typeValue" placeholder="请选择类型" size="small" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>

          <el-table
            :data="gridData"
            border
            style="width:300px"
            height="calc(100vh - 97px)"
            @row-click="rowClick"
          >
            <el-table-column property="id" align="center" label="ID" width="40"></el-table-column>
            <el-table-column property="name" align="center" label="名称" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="图片选择" name="second">
          <el-row :gutter="20" style="padding:0 20px;height:calc(100vh - 60px);overflow-y:auto">
            <el-col :span="12" style="margin:5px 0" v-for="(item,index) in tabsImage" :key="index">
              <el-image
                :preview-src-list="imgList"
                :src="item"
                alt="当前图片"
                @contextmenu.prevent.native="choiceImage(index)"
              ></el-image>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      right: false,
      textDom: "",
      textDomNumber: "",
      textareaA: "",
      textareaB: "",
      activeName: "first",
      typeValue: "",
      info:{
        name:'',
        sex:'',
        old:'',
        checkOrderNumber:'',
        department:'',
        berth:'',
        reportId:'',
        number:'',
        checkdate:'',
        reportdate:''
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      gridData: [
        {
          id: 1,
          name: "垂体高度"
        },
        {
          id: 2,
          name: "垂体宽度"
        },
        {
          id: 3,
          name: "脑室侧脑室体部指数"
        },
        {
          id: 4,
          name: "脑室眼静脉的宽度"
        },
        {
          id: 5,
          name: "脑垂体球半径长度与宽度"
        },
        {
          id: 6,
          name: "垂体高度"
        },
        {
          id: 7,
          name: "垂体宽度"
        },
        {
          id: 8,
          name: "脑室侧脑室体部指数"
        },
        {
          id: 9,
          name: "脑室眼静脉的宽度"
        },
        {
          id: 10,
          name: "脑垂体球半径长度与宽度"
        },
        {
          id: 11,
          name: "垂体高度"
        },
        {
          id: 12,
          name: "垂体宽度"
        },
        {
          id: 13,
          name: "脑室侧脑室体部指数"
        },
        {
          id: 14,
          name: "脑室眼静脉的宽度"
        },
        {
          id: 15,
          name: "脑垂体球半径长度与宽度测试测试测试测试测试测试"
        },
        {
          id: 16,
          name: "垂体高度"
        },
        {
          id: 17,
          name: "垂体宽度"
        },
        {
          id: 18,
          name: "脑室侧脑室体部指数指数指数指数测试测试测试测试"
        },
        {
          id: 19,
          name: "脑室眼静脉的宽度"
        },
        {
          id: 20,
          name: "脑垂体球半径长度与宽度"
        }
      ],
      tabsImage: [
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg",
        "../../static/image/ct1.jpg"
      ],
      imgList: ["../../static/image/ct1.jpg"]
    };
  },
  methods: {
    tabsClick(e) {
      console.log(e);
    },
    inputClick() {
      this.textDom = event.target;
      this.textDomNumber = this.textDom.getAttribute("select");
    },
    choiceImage(i) {
      this.$alert(`当前选中的是第${i + 1}张照片`, "提示", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    rowClick(row, column, event) {
      let _this = this;
      // console.log(row,'row')
      var name = "[" + row.name + "]mm";
      // this.textarea = this.textarea + name
      // console.log(textDom)
      if (this.textDomNumber == "1") {
        this.insertAtCursor(this.textDom, name);
        this.textareaA = this.textDom.value;
      } else if (this.textDomNumber == "2") {
        this.insertAtCursor(this.textDom, name);
        this.textareaB = this.textDom.value;
      } else {
        this.$alert("请先选中要添加的文本框", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    insertAtCursor(myField, myValue) {
      //IE 浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
      } else if (myField.selectionStart || myField.selectionStart == "0") {
        //FireFox、Chrome等
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
      } else {
        myField.value += myValue;
        myField.focus();
      }
    },
    openDrawer() {
      this.right = !this.right;
    }
  }
};
</script>

<style>
</style>