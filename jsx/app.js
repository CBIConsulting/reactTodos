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
;(function($, React, undefined) {
	var dummyData = [
		{
			text: 'Come to this workshop',
			completed: true
		},
		{
			text: 'Learn React.js',
			completed: false
		},
		{
			text: 'Complete this app',
			completed: false
		},
		{
			text: 'Buy cat food',
			completed: false
		},
		{
			text: 'Have a party!',
			completed: false
		}
	];

//MAIN APP COMPONENT
	var App = React.createClass({
		getInitialState: function() {
			return {
				data: dummyData
			};
		},

		onComplete: function(e) {
			e.stopPropagation();
			var newList = _.clone(this.state.data);

			var $target = $(e.currentTarget);
			var idx = $target.data('idx');

			newList[idx].completed = !newList[idx].completed;

			this.setState({
				data: newList
			});
		},

		onDelete: function(e) {
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

		onCreate: function(name) {
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

		render: function() {
			return <div className="todos-app">
				<div className="todos-count"><p>You have {this.state.data.length} todos</p></div>
				<TaskForm onCreate={this.onCreate}/>
				<TodoList todos={this.state.data} onComplete={this.onComplete} onDelete={this.onDelete} />
			</div>;
		}
	});

//List Component
	var TodoList = React.createClass({
		getDefaultProps: function() {
			return {
				todos: [],
				onComplete: null,
				onDelete: null
			};
		},

		buildList: function() {
			var todos = _.clone(this.props.todos), list = [];

			todos = _.map(todos, function(v, k) {
				if (!v.k) {
					v.k = k;
				}

				return v;
			});

			todos = _.sortBy(todos, 'completed');

			if (todos.length) {
				_.each(todos, function(todo, k) {
					list.push(<li className="list-group-item">
						<Todo key={'todo-'+todo.k} todo={todo} idx={todo.k} onComplete={this.props.onComplete} onDelete={this.props.onDelete} />
					</li>);
				}, this);

				return <ul className="list-group">{list}</ul>;
			}

			return <p className="text-muted">You have no todos!</p>
		},

		render: function() {
			var list = this.buildList();


			return <div className="todos-list">
				{list}
			</div>;
		}
	});

//Todo Item Component
	var Todo = React.createClass({
		getDefaultProps: function() {
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

		render: function() {
			var todo = this.props.todo;

			return <div className="todo" data-idx={this.props.idx} data-completed={todo.completed} onClick={this.props.onComplete} >
				<div className="row">
					<div className="col-md-8 todo-text">
						<input data-idx={this.props.idx} type="checkbox" checked={todo.completed? 'checked' : false} />
						{' ' + todo.text}
					</div>

					<div className="col-md-4 todo-input">
						<button className="btn btn-default btn-xs" onClick={this.props.onDelete} data-idx={this.props.idx}> delete</button>
					</div>
				</div>
			</div>;
		}
	});

//FORM COMPONENT
	var TaskForm = React.createClass({
		getDefaultProps: function() {
			return {
				onCreate: null
			}
		},

		newTodo: function(e) {
			var $name = $(this.refs.todo_name.getDOMNode());
			var name = $name.val();

			if (typeof this.props.onCreate == 'function') {
				this.props.onCreate(name);
				$name.val('');
			}
		},

		render: function() {
			return <form>
				<div className="todo-form">
					<div className="input-group">
				      <input ref="todo_name" type="text" className="form-control" placeholder="What needs to be done?" />
				      <span className="input-group-btn">
				        <button className="btn btn-default" type="button" onClick={this.newTodo}>Create</button>
				      </span>
				    </div>
				</div>
				<br/>
			</form>;
		}
	});

	$(function() {
		var container = document.getElementById('app-container');

		React.render(<App />, container);
	});

})(jQuery, React);
