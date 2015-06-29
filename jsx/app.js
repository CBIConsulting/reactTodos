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

		render: function() {
			return <div className="text-danger">Code me!</div>;
		}
	});

//List Component
	var TodoList = React.createClass({
		render: function() {
			return <div>Code me!</div>;
		}
	});

//Todo Item Component
	var Todo = React.createClass({
		render: function() {
			return <div>Code me!</div>;
		}
	});

//FORM COMPONENT
	var TaskForm = React.createClass({
		render: function() {
			return <div>Code me!</div>;
		}
	});

	$(function() {
		var container = document.getElementById('app-container');

		React.render(<App />, container);
	});

})(jQuery, React);