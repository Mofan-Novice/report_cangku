<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-image-viewer__close{
  color:lightblue !important;
}
.el-tabs__item{
  padding: 0 !important;
}
.input-search{
  padding: 5px 10px;
}
.el-tree{
  background-color: #F0F0F0;
}
.aside{
  margin:0;
  padding: 0;
  background-color:#F0F0F0;
  height: 100vh;
}
.card-box{
  margin-top: 10px;
}
.inner-center{
  padding: 0 50px;
}
.mg-big{
  margin-top: 50px;
}
.mg-top{
  margin-top: 8px;
}
.mg-small{
  margin-top: 5px;
}
.right_model{
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width:300px;
  height: 100vh;
  background-color:#F1F1F1;
}
.right_control{
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  height: 100vh;
  flex-direction: row;
  align-items: center;
  width: 30px;
  justify-content: right;
  font-size: 45px;
  color: #409EFF;
}
.right_box{
  position: absolute;
  top: 0;
  right: -300px;
  height: 100vh;
  width:300px;
  height: 100vh;
  background-color:#F1F1F1;
}
.right_in{
  transition: 0.2s;
  transform: translateX(-300px);
}
.right_out{
  transition: 0.2s;
  transform: translateX(0);
}
/* .tableHeight{
  height: calc(100vh - 97px);
} */
.doctor-row{
  margin-top: 40px;
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
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
