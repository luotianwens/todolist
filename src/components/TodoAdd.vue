<template>
  <section>
    <label for="title">ToDoList</label>
    <input type="text" v-model="todoContent" @keyup.enter="emitAddItem" placeholder="添加ToDo" />
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TodoAdd',
  props: ['tid'],
  setup(props, context) {
    return useEmitAddItem(props.tid, context.emit)
  }
}

function useEmitAddItem(tid, emit) {
  const todoContent = ref('')
  const emitAddItem = () => {
    const todo = {
      id: tid,
      content: todoContent.value,
      complected: false
    }
    emit('add-item', todo)
  }

  return {
    todoContent,
    emitAddItem
  }
}
</script>
<style>
section {
  margin: 0 auto;
}

label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  cursor: pointer;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
header input {
  float: right;
  width: 60%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),
    0 1px 6px rgba(0, 0, 0, 0.45) inset;
  border: none;
}
input:focus {
  outline-width: 0;
}
</style>