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

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'text-danger' },
				'Code me!'
			);
		}
	});

	//List Component
	var TodoList = React.createClass({
		displayName: 'TodoList',

		render: function render() {
			return React.createElement(
				'div',
				null,
				'Code me!'
			);
		}
	});

	//Todo Item Component
	var Todo = React.createClass({
		displayName: 'Todo',

		render: function render() {
			return React.createElement(
				'div',
				null,
				'Code me!'
			);
		}
	});

	//FORM COMPONENT
	var TaskForm = React.createClass({
		displayName: 'TaskForm',

		render: function render() {
			return React.createElement(
				'div',
				null,
				'Code me!'
			);
		}
	});

	$(function () {
		var container = document.getElementById('app-container');

		React.render(React.createElement(App, null), container);
	});
})(jQuery, React);