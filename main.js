const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener('submit',function(event){
  event.preventDefault();
  console.log(input.value);
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement('li'); // liタグを作成
    li.innerText = todoText; // ユーザがホームに入力した値を取得
    li.classList.add('list-group-item'); // デザインを当てるために新規クラス追加

    if (todo && todo.completed) {
      li.classList.add('text-decoration-line-through');
    }

    // contextmenuで右クリックを検知し、右クリックされたら削除する(event.preventDefaultでデフォルトのメニューを表示させない)
    li.addEventListener('contextmenu', function(event){
      event.preventDefault();
      li.remove();
      saveDate();
    });

    li.addEventListener('click', function () {
      li.classList.toggle('text-decoration-line-through');
      saveDate();
    });

    ul.appendChild(li); // ulタグの子として画面に追加できる
    input.value = ''; // Enter押した後、バー内を空にする
    saveDate();
  }
}

function saveDate() {
  const lists = document.querySelectorAll('li');
  let todos = [];

  lists.forEach(list => {
    let todo = {
      text:list.innerText,
      completed: list.classList.contains
        ('text-decoration-line-through')
    };
    todos.push(todo);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// console.log();

// データの保存
// データの取得
