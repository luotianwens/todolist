// function clear() {
//   localStorage.clear()
//   load()
// }

// 输入框添加备忘录内容
// function postaction() {
//   var title = document.getElementById('title')
//   if (title.value == '') {
//     alert('内容不能为空')
//   } else {
//     var data = loadData()
//     var todo = { title: title.value, done: false }
//     data.push(todo)
//     saveData(data)
//     var form = document.getElementById('form')
//     form.reset()
//     load()
//   }
// }

function loadData() {
  var collection = localStorage.getItem('todo');
  if (collection != null) {
    return JSON.parse(collection);
  } else return [];
}

function saveSort() {
  var todolist = document.getElementById('todolist');
  var donelist = document.getElementById('donelist');
  var ts = todolist.getElementsByTagName('p');
  var ds = donelist.getElementsByTagName('p');
  var data = [];
  for (var i = 0; i < ts.length; i++) {
    var todo = { title: ts[i].innerHTML, done: false };
    data.unshift(todo);
  }
  for (i = 0; i < ds.length; i++) {
    var todo = { title: ds[i].innerHTML, done: true };
    data.unshift(todo);
  }
  saveData(data);
}

// 将备忘录上传到localStorage
function saveData(data) {
  localStorage.setItem('todo', JSON.stringify(data));
}

// 删除备忘录内容
function remove(i) {
  var data = loadData();
  var todo = data.splice(i, 1)[0];
  saveData(data);
  load();
}

// 勾选框实现正在进行与已完成状态切换
function update(i, field, value) {
  var data = loadData();
  var todo = data.splice(i, 1)[0];
  todo[field] = value;
  data.splice(i, 0, todo);
  saveData(data);
  load();
}

// 编辑备忘录内容
function edit(i) {
  load();
  var p = document.getElementById('p-' + i);
  title = p.innerHTML;
  p.innerHTML = "<input id='input-" + i + "' value='" + title + "' />";
  var input = document.getElementById('input-' + i);
  input.setSelectionRange(0, input.value.length);
  input.focus();
  input.onblur = function() {
    if (input.value.length == 0) {
      p.innerHTML = title;
      alert('内容不能为空');
    } else {
      update(i, 'title', input.value);
    }
  };
}

// 初始化备忘率内容
function load() {
  var todolist = document.getElementById('todolist');
  var donelist = document.getElementById('donelist');
  var collection = localStorage.getItem('todo');
  if (collection != null) {
    var data = JSON.parse(collection);
    var todoCount = 0;
    var doneCount = 0;
    var todoString = '';
    var doneString = '';
    for (var i = data.length - 1; i >= 0; i--) {
      if (data[i].done) {
        doneString +=
          "<li draggable='true'><input type='checkbox' onchange='update(" +
          i +
          ",\"done\",false)' checked='checked' />" +
          "<p id='p-" +
          i +
          "' onclick='edit(" +
          i +
          ")'>" +
          data[i].title +
          '</p>' +
          "<a href='javascript:remove(" +
          i +
          ")'>-</a></li>";
        doneCount++;
      } else {
        todoString +=
          "<li draggable='true'><input type='checkbox' onchange='update(" +
          i +
          ',"done",true)\' />' +
          "<p id='p-" +
          i +
          "' onclick='edit(" +
          i +
          ")'>" +
          data[i].title +
          '</p>' +
          "<a href='javascript:remove(" +
          i +
          ")'>-</a></li>";
        todoCount++;
      }
    }
    todocount.innerHTML = todoCount;
    todolist.innerHTML = todoString;
    donecount.innerHTML = doneCount;
    donelist.innerHTML = doneString;
  } else {
    todocount.innerHTML = 0;
    todolist.innerHTML = '';
    donecount.innerHTML = 0;
    donelist.innerHTML = '';
  }

  var lis = todolist.querySelectorAll('ol li');
  [].forEach.call(lis, function(li) {
    li.addEventListener('dragstart', handleDragStart, false);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('drop', handleDrop, false);

    onmouseout = function() {
      saveSort();
    };
  });
}

window.onload = load;

window.addEventListener('storage', load, false);

var dragSrcEl = null;
function handleDragStart(e) {
  dragSrcEl = this;
  // 指定拖动的行为，如复制、移动等
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  // 控制在拖放操作中给用户的反馈(通常是视觉上)
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
