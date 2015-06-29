/*
	Use this file to make your app

	You have the prototypes for all the components you need to implement below.
	Feature requirements (order matters!):

	1. show a list of todos
	2. add new todos
	3. delete todos
	4. set/unset completed todos
	BONUS: Sort todos by completion state

	Tips:
		- Your components should be as stateless as possible
		- You can set callbacks as props
		- Dont Repeat Yourself. If you are repeating the same code over and over again you may
		  want to create a new component.
		- With Babel you can use ES6!
*/
'use strict';

;(function ($, React, undefined) {
	var dummyData = [{
		text: 'Come to this workshop',
		completed: true
	}, {
		text: 'Learn React.js',
		completed: false
	}, {
		text: 'Complete this app',
		completed: false
	}, {
		text: 'Buy cat food',
		completed: false
	}, {
		text: 'Have a party!',
		completed: false
	}];

	//MAIN APP COMPONENT
	var App = React.createClass({
		displayName: 'App',

		getInitialState: function getInitialState() {
			return {
				data: dummyData
			};
		},

		onComplete: function onComplete(e) {
			e.stopPropagation();
			var newList = _.clone(this.state.data);

			var $target = $(e.currentTarget);
			var idx = $target.data('idx');

			newList[idx].completed = !newList[idx].completed;

			this.setState({
				data: newList
			});
		},

		onDelete: function onDelete(e) {
			e.stopPropagation();
			var newList = _.clone(this.state.data);

			var $target = $(e.currentTarget);
			var del = $target.data('idx');

			delete newList[del];
			newList = _.values(newList);

			this.setState({
				data: newList
			});
		},

		onCreate: function onCreate(name) {
			var newList = _.clone(this.state.data);

			if (name && name.length) {
				newList.push({
					text: name,
					completed: false
				});

				this.setState({
					data: newList
				});
			}
		},

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'todos-app' },
				React.createElement(
					'div',
					{ className: 'todos-count' },
					React.createElement(
						'p',
						null,
						'You have ',
						this.state.data.length,
						' todos'
					)
				),
				React.createElement(TaskForm, { onCreate: this.onCreate }),
				React.createElement(TodoList, { todos: this.state.data, onComplete: this.onComplete, onDelete: this.onDelete })
			);
		}
	});

	//List Component
	var TodoList = React.createClass({
		displayName: 'TodoList',

		getDefaultProps: function getDefaultProps() {
			return {
				todos: [],
				onComplete: null,
				onDelete: null
			};
		},

		buildList: function buildList() {
			var todos = _.clone(this.props.todos),
			    list = [];

			todos = _.map(todos, function (v, k) {
				if (!v.k) {
					v.k = k;
				}

				return v;
			});

			todos = _.sortBy(todos, 'completed');

			if (todos.length) {
				_.each(todos, function (todo, k) {
					list.push(React.createElement(
						'li',
						{ className: 'list-group-item' },
						React.createElement(Todo, { key: 'todo-' + todo.k, todo: todo, idx: todo.k, onComplete: this.props.onComplete, onDelete: this.props.onDelete })
					));
				}, this);

				return React.createElement(
					'ul',
					{ className: 'list-group' },
					list
				);
			}

			return React.createElement(
				'p',
				{ className: 'text-muted' },
				'You have no todos!'
			);
		},

		render: function render() {
			var list = this.buildList();

			return React.createElement(
				'div',
				{ className: 'todos-list' },
				list
			);
		}
	});

	//Todo Item Component
	var Todo = React.createClass({
		displayName: 'Todo',

		getDefaultProps: function getDefaultProps() {
			return {
				todo: {
					text: null,
					completed: false
				},
				idx: 0,
				onComplete: null,
				onDelete: null
			};
		},

		render: function render() {
			var todo = this.props.todo;

			return React.createElement(
				'div',
				{ className: 'todo', 'data-idx': this.props.idx, 'data-completed': todo.completed, onClick: this.props.onComplete },
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'col-md-8 todo-text' },
						React.createElement('input', { 'data-idx': this.props.idx, type: 'checkbox', checked: todo.completed ? 'checked' : false }),
						' ' + todo.text
					),
					React.createElement(
						'div',
						{ className: 'col-md-4 todo-input' },
						React.createElement(
							'button',
							{ className: 'btn btn-default btn-xs', onClick: this.props.onDelete, 'data-idx': this.props.idx },
							' delete'
						)
					)
				)
			);
		}
	});

	//FORM COMPONENT
	var TaskForm = React.createClass({
		displayName: 'TaskForm',

		getDefaultProps: function getDefaultProps() {
			return {
				onCreate: null
			};
		},

		newTodo: function newTodo(e) {
			var $name = $(this.refs.todo_name.getDOMNode());
			var name = $name.val();

			if (typeof this.props.onCreate == 'function') {
				this.props.onCreate(name);
				$name.val('');
			}
		},

		render: function render() {
			return React.createElement(
				'form',
				null,
				React.createElement(
					'div',
					{ className: 'todo-form' },
					React.createElement(
						'div',
						{ className: 'input-group' },
						React.createElement('input', { ref: 'todo_name', type: 'text', className: 'form-control', placeholder: 'What needs to be done?' }),
						React.createElement(
							'span',
							{ className: 'input-group-btn' },
							React.createElement(
								'button',
								{ className: 'btn btn-default', type: 'button', onClick: this.newTodo },
								'Create'
							)
						)
					)
				),
				React.createElement('br', null)
			);
		}
	});

	$(function () {
		var container = document.getElementById('app-container');

		React.render(React.createElement(App, null), container);
	});
})(jQuery, React);