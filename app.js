
const { createApp } = Vue;
let id = 1;
createApp({

	data () {
		return {
			title: 'Todo List',
			todo: '',
			filterKey: 'all',
			todos: JSON.parse(localStorage.getItem('todos')) || []
		}
	},
	computed: {
		filteredTodos () {
			if( this.filterKey == 'all') {
				return this.todos
			}

			if( this.filterKey == 'active' ) {
				return this.todos.filter( (todo) => todo.completed == false )
			}

			if( this.filterKey == 'completed' ) {
				return this.todos.filter( (todo) => todo.completed == true )
			}
		},
		remaining () {
			return this.todos.filter( (todo) => todo.completed == false ).length
		},
		clear () {
			return this.todos.filter( (todo) => todo.completed == true ).length
		}
	},
	watch: {
		todos: {
			handler (todos) {
				console.log(todos)
				localStorage.setItem('todos', JSON.stringify(todos))
			},
			deep: true
		}
	},
	methods: {
		add (todo) {
			if(todo != ''){
				this.todos.push({
					id: id,
					title: this.todo.trim(),
					completed: false
				})
				window.localStorage.setItem('todo', JSON.stringify(this.todos));
				id++
				this.todo = ''
			}
		},
		remove (todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			window.localStorage.setItem('todo', JSON.stringify(this.todos));
		},
		clearCompletedTodos () {
			this.todos = this.todos.filter( (todo) => todo.completed == false )
			window.localStorage.setItem('todo', JSON.stringify(this.todos));
		},
		checkedAll (e) {
			this.todos.forEach( (todo) => todo.completed = e.target.checked)
		},
	}
	
}).mount('#app');