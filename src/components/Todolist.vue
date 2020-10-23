<template>
  <section>
    <todo-filter filter-text="正在进行"></todo-filter>
    <ol id="todolist" class="demo-box">
      <todo-list-item
        v-for="todo in todos"
        :key="todo.id"
        :todo-item="todo"
        v-show="!todo.completed"
        @change-state="todo.completed = $event.target.checked"
      ></todo-list-item>
    </ol>
    <todo-filter filter-text="已经完成"></todo-filter>
    <ul id="donelist">
      <todo-list-item
        v-for="todo in todos"
        :key="todo.id"
        :todo-item="todo"
        v-show="todo.completed"
        @change-state="todo.completed = $event.target.checked"
      ></todo-list-item>
    </ul>
  </section>
</template>

<script>
import TodoListItem from './TodolistItem'
import TodoFilter from './TodoFilter'
export default {
  name: 'TodoList',
  components: {
    TodoListItem,
    TodoFilter
  },
  props: ['todos']
}
</script>
<style>
span {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  padding: 0 5px;
  height: 20px;
  border-radius: 20px;
  background: #e6e6fa;
  line-height: 22px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
ol,
ul {
  padding: 0;
  list-style: none;
}

ol li {
  cursor: move;
}
ul li {
  border-left: 5px solid #999;
  opacity: 0.5;
}
</style>