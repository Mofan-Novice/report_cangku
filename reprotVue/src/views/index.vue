<template>
  <div>
    <el-container>
      <el-aside class="aside">
        <el-row class="input-search">
          <el-input placeholder="输入关键字进行筛选" v-model="filterText"></el-input>
        </el-row>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
          @node-contextmenu="handleMenuClick"
        ></el-tree>
      </el-aside>
      <el-main>
       <el-row>
        <el-button v-if="!addModel" plain type="primary" size="mini" @click="updateModel">修改当前模板</el-button>
        <el-button v-if="addModel" plain type="primary" size="mini" @click="saveModel">保存报告</el-button>
        <el-button v-if="!right" plain type="primary" size="mini" @click="openDrawer">显示插入元素</el-button>
        <el-button v-if="right" plain type="primary" size="mini" @click="openDrawer">隐藏插入元素</el-button>
        <el-button v-if="!addModel" plain type="primary" size="mini" @click="insertModel">添加模板</el-button>
        <el-button plain type="primary" size="mini" @click="toReport">书写报告</el-button>
      </el-row>
     
        <el-row class="card-box" :style="right?'margin-right:300px':'margin-right:0'">
          <!-- 标题 -->
          <h4 style="text-align:center">影像报告单</h4>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 用户信息 -->
          <el-row :gutter="20" class="inner-center">
            <el-col :span="6">
              <el-row>
                姓名：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                性别：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                年龄：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                检查单号：
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="inner-center mg-top">
            <el-col :span="6">
              <el-row>
                科室：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                床号：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                ID：
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                号：
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="inner-center mg-top">
            <el-col :span="12">
              <el-row>
                检查日期：
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                报告日期：
              </el-row>
            </el-col>
          </el-row>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 内容 -->
          <el-row class="inner-center">
            检查名称：
          </el-row>
          <el-row class="inner-center mg-top">
            影像所见：
          </el-row>
          <el-row class="inner-center mg-small">
            <el-input
              select="1"
              type="textarea"
              placeholder="请输入内容"
              v-model="textareaA"
              :autosize="{ minRows: 2}"
              show-word-limit
              @focus="inputClick"
            >
            </el-input>
          </el-row>
          <el-row class="inner-center mg-big">
            诊断意见：
          </el-row>
          <el-row  class="inner-center mg-small">
            <el-input
              select="2"
              type="textarea"
              placeholder="请输入内容"
              v-model="textareaB"
              :autosize="{ minRows: 2}"
              show-word-limit
              @focus="inputClick"
            >
            </el-input>
          </el-row>
          <el-row class="doctor-row">
            <div style="width:50%;text-align:left">报告医师：</div>
            <div style="width:50%;text-align:right">审核医师：</div>
          </el-row>
          <el-divider></el-divider>
          <el-row style="text-align:center;fontSize:15px">
            （此影像资料仅供临床医师参考）
          </el-row>
        </el-row>
      
      <transition name="el-zoom-in-bottom">
        <el-row v-if="right" class="right_model">
          <el-tabs v-model="activeName" @tab-click="tabsClick" stretch>
            <el-tab-pane label="标签添加" name="first">
              <el-row style="margin-bottom:10px">
                <el-select v-model="typeValue" placeholder="请选择类型" size="small" clearable >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-row>
              
              <el-table :data="gridData" border style="width:300px" height="calc(100vh - 97px)" @row-click="rowClick">
                <el-table-column property="id" align="center" label="ID" width="40"></el-table-column>
                <el-table-column property="name" align="center" label="名称" show-overflow-tooltip></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="图片选择" name="second">
              <el-row :gutter="20" style="padding:0 20px;height:calc(100vh - 60px);overflow-y:auto">
                <el-col :span="12" style="margin:5px 0" v-for="(item,index) in tabsImage" :key="index">
                  <!-- @click="choiceImage(item)" -->
                  <el-image :preview-src-list="imgList" :src="item" alt="当前图片" @contextmenu.prevent.native="choiceImage(index)"></el-image>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </transition>
      <el-dialog title="保存报告 —— 选择检查类型-选择部位" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form">
          <el-form-item label="检查类型" label-width="110px">
            <el-select v-model="form.type" placeholder="请选择检查类型" style="width:300px" @change="saveSelectType">
              <el-option label="类型一" value="类型一"></el-option>
              <el-option label="类型二" value="类型二"></el-option>
              <el-option label="类型三" value="类型三"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查部位" label-width="110px">
            <el-select v-model="form.posi" placeholder="请选择检查部位" style="width:300px" @change="saveSelectPosi">
              <el-option label="部位一" value="部位一"></el-option>
              <el-option label="部位二" value="部位二"></el-option>
              <el-option label="部位三" value="部位三"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查名称" label-width="110px">
            <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitModel">确 定</el-button>
        </div>
      </el-dialog>
        <!-- <el-drawer
          title=""
          :visible.sync="right"
          :wrapperClosable="false"
          direction="rtl"
          :show-close="true"
          @close="closeDrawer"
          size="300px">
          <el-table :data="gridData" border style="margin-left:4px;width:292px" @row-click="rowClick">
            <el-table-column property="id" align="center" label="ID" width="40"></el-table-column>
            <el-table-column property="name" align="center" label="名称" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-drawer> -->
      </el-main>
    </el-container>
    <!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="openDrawer">添加元素模块</li>
      <li>打开元素模块</li>
    </ul> -->
  </div>
</template>

<script>
import add from '../components/add'
export default {
  components:{
    add
  },
  data() {
    return {
      right:false,
      addModel:false,
      filterText: "",
      textareaA:"",
      textareaB:"",
      visible: false,
      dialogFormVisible: false,//dialog 显示状态
      activeName:'first',
      typeValue:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
			top: 0,
      left: 0,
      textDom:'',
      textDomNumber:'',
      form:{
        type:'',
        posi:'',
        name:''
      },
      tabsImage:[
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
        "../../static/image/ct1.jpg",
      ],
      imgList:[
        "../../static/image/ct1.jpg"
      ],
      gridData: [
        {
          id: 1,
          name: '垂体高度',
        }, {
          id: 2,
          name: '垂体宽度',
        }, {
          id: 3,
          name: '脑室侧脑室体部指数',
        }, {
          id: 4,
          name: '脑室眼静脉的宽度',
        }, {
          id: 5,
          name: '脑垂体球半径长度与宽度',
        },{
          id: 6,
          name: '垂体高度',
        }, {
          id: 7,
          name: '垂体宽度',
        }, {
          id: 8,
          name: '脑室侧脑室体部指数',
        }, {
          id: 9,
          name: '脑室眼静脉的宽度',
        }, {
          id: 10,
          name: '脑垂体球半径长度与宽度',
        },{
          id: 11,
          name: '垂体高度',
        }, {
          id: 12,
          name: '垂体宽度',
        }, {
          id: 13,
          name: '脑室侧脑室体部指数',
        }, {
          id: 14,
          name: '脑室眼静脉的宽度',
        }, {
          id: 15,
          name: '脑垂体球半径长度与宽度测试测试测试测试测试测试',
        },{
          id: 16,
          name: '垂体高度',
        }, {
          id: 17,
          name: '垂体宽度',
        }, {
          id: 18,
          name: '脑室侧脑室体部指数指数指数指数测试测试测试测试',
        }, {
          id: 19,
          name: '脑室眼静脉的宽度',
        }, {
          id: 20,
          name: '脑垂体球半径长度与宽度',
        }
      ],
      data: [
        {
          id: "1",
          label: "一级 1",
          children: [
            {
              id: "1-1",
              label: "二级 1-1",
              children: [
                {
                  id:'1-1-1',
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          id:'2',
          label: "一级 2",
          children: [
            {
              id:'2-1',
              label: "二级 2-1",
              children: [
                {
                  id:'2-1-1',
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              id:'2-2',
              label: "二级 2-2",
              children: [
                {
                  id:'2-2-1',
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          id:'3',
          label: "一级 3",
          children: [
            {
              id:'3-1',
              label: "二级 3-1",
              children: [
                {
                  id:'3-1-1',
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              id:'3-2',
              label: "二级 3-2",
              children: [
                {
                  id:'3-2-1',
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted(){
    // document.addEventListener('click',function(event){
    //   var ele = event.target
    //   // console.log(event.pageX,'x')
    //   // console.log(event.pageY,'y')
    //   var targetArea = document.getElementById('yxInput');
    //   if(targetArea.contains(ele)){
    //     console.log('在区域内')
    //   }else{
    //     return
    //   }
    // })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    /**
     * 标签页
     */
    tabsClick(e){
      console.log(e)
    },
    /**
     * 获取DOM节点
     */
    inputClick(){
      this.textDom = event.target
      this.textDomNumber = this.textDom.getAttribute('select')
    },
    /**
     * 打开抽屉
     */
    openDrawer(){
      this.right = !this.right
    },
    /**
     * 修改
     */
    updateModel(){
      this.$confirm('是否确认修改当前模板？', '修改提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认保存',
        cancelButtonText: '放弃修改'
      })
        .then(() => {
          var textA = JSON.parse(JSON.stringify(this.textareaA))
          var textB = JSON.parse(JSON.stringify(this.textareaB))
          textA = textA.replace(/\[|]/g,'')
          textB = textB.replace(/\[|]/g,'')
          console.log(textA,'textA')
          console.log(textB,'textB')
          this.$message({
            type: 'info',
            message: '保存修改'
          });
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '放弃保存'
          })
        });
    },
    /**
     * 显示dialog
     */
    saveModel(){
      this.dialogFormVisible = true
    },
    submitModel(){
      console.log(this.form)
    },
    /**
     * 添加
     */
    insertModel(){
      this.addModel = true
    },
    rowClick(row, column, event){
      let _this = this
      // console.log(row,'row')
      var name = '[' + row.name + ']mm'
      // this.textarea = this.textarea + name
      // console.log(textDom)
      if(this.textDomNumber == '1'){
        this.insertAtCursor(this.textDom,name)
        this.textareaA = this.textDom.value
      }else if(this.textDomNumber == '2'){
        this.insertAtCursor(this.textDom,name)
        this.textareaB = this.textDom.value
      }else{
        this.$alert('请先选中要添加的文本框', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
      }
    },
    choiceImage(i){
      this.$alert(`当前选中的是第${i + 1}张照片`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
    },
    /**
     * 节点点击
     */
    handleNodeClick(data) {
      if(data.children){
        return
      }else{
        this.addModel = false
        console.log(data)
      }
    },
    saveSelectType(e){
      this.form.name = ''
      this.form.name += e
      console.log(e,'type')
    },
    saveSelectPosi(e){
      this.form.name += e
      console.log(e,'posi')
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleMenuClick(event, data, node, el) {
      if (data.children) {
        this.$message({
          message: "当前不是最后一级节点",
          type: "warning"
        });
        return
      } else {
        this.$alert("是否操作当前节点", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            if (action == "confirm") {
              this.$message({
                type: "info",
                message: `确认操作`
              });
            } else {
              this.$message({
                type: "info",
                message: `取消操作`
              });
            }
          }
        });
      }
      // console.log(event, "event");
      // console.log(data, "data");
      // console.log(node, "node");
      // console.log(el, "el");
    },
    openMenu(e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      // console.log(maxLeft)
      const left = e.clientX - offsetLeft // 15: margin right
      // console.log(left)

      // if (left > maxLeft) {
      //   this.left = 0
      // } else {
      this.left = offsetLeft + left
      // }

      this.top = e.clientY - 60 // fix 位置bug
      this.visible = true
    },
    closeMenu() {
      this.visible = false
    },
    insertAtCursor(myField, myValue) { 
      //IE 浏览器  
      if (document.selection) {
          myField.focus();
          sel = document.selection.createRange();
          sel.text = myValue;
          sel.select();
      } else if (myField.selectionStart || myField.selectionStart == '0') { //FireFox、Chrome等
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
    toReport(){
      this.$router.push({
        path: '/report'
      })
    }
  }
};
</script>

<style>

</style>