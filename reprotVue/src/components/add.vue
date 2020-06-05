<template>
  <div>
    <el-row>
      <el-button plain type="primary" size="mini" @click="updateModel">修改当前模板</el-button>
      <el-button plain type="primary" size="mini" @click="openDrawer">插入元素</el-button>
      <el-button plain type="primary" size="mini" @click="insertModel">添加模板</el-button>
    </el-row>
    <el-row class="card-box">
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
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          maxlength="100"
          show-word-limit
          @contextmenu.prevent.native="openMenu($event)"
        >
        </el-input>
      </el-row>
    </el-row>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="openDrawer">添加元素模块</li>
      <li>打开元素模块</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    textarea:{ 
      type: String,
      default:'' 
    }
  },
  data () {
    return {
      visible: false,
			top: 0,
			left: 0
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods:{
    openDrawer(){
      this.$emit('openRight')
    },
    updateModel(){
      this.$emit('updateModel')
    },
    insertModel(){
      this.$emit('insertModel')
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
    }
  }
}
</script>

<style>
.card-box{
  margin-top: 10px;
}
.inner-center{
  padding: 0 50px;
}
.mg-top{
  margin-top: 8px;
}
.mg-small{
  margin-top: 5px;
}
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    
  }
.contextmenu li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      
    }
.contextmenu li:hover {
        background: #eee;
      }
</style>
