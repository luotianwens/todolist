<template>
  <div>
    <header>
      <todo-add :tid="todos.length" @add-item="addItem"></todo-add>
    </header>
    <todo-list :todos="todos"></todo-list>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoAdd from './components/TodoAdd'
import TodoList from './components/Todolist'
import TodoFooter from './components/TodoFooter'
import loadData from './composables/getData.js'
export default {
  name: 'App',
  components: {
    TodoAdd,
    TodoList,
    TodoFooter
  },
  setup() {
    const { todos, addItem } = loadData()
    return {
      todos,
      addItem
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #cdcdcd;
}

header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}

h2 {
  position: relative;
}

@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}
@media screen and (min-width: 620px) {
  section {
    width: 600px;
    padding: 0 10px;
  }
}
</style>
