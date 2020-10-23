import { onMounted, ref } from 'vue';

export default function loadData() {
  const todos = ref([]);
  const addItem = (item) => todos.value.push(item);

  const fetchDatas = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );
    const data = await response.json();
    todos.value = data.map((item) => ({
      id: item.id,
      content: item.title,
      completed: item.completed,
    }));
  };

  onMounted(() => {
    fetchDatas();
  });

  return {
    todos,
    addItem,
  };
}
