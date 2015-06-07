angular.module('todoApp', [])
    .controller('todoController', function() {
        var todoList = this;
        todoList.todos = [];
        todoList.add = function() {
            if (todoList.newText && todoList.newText.length) {
                todoList.todos.push({
                    todoitem: todoList.newText,
                    done: false,
                    time: todoList.newTime,
                    descp: todoList.newDesc
                });
                todoList.newText = '';
                todoList.newDesc = '';
                todoList.newTime = '';
                todoList.setLocalStorage();
            }
        };

        todoList.clearTodo = function(i) {
            todoList.todos.splice(i, 1);
        };

        todoList.setLocalStorage = function() {
            localStorage.setItem("dl", JSON.stringify(todoList.todos));
        };

        todoList.load = function() {
            todoList.todos = JSON.parse(localStorage.getItem("dl")) || [];
        };
    });
