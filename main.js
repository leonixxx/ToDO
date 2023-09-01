"use strict";

import { stringConverter } from "./chekLength.js";

document.addEventListener("DOMContentLoaded", function () {
	let mainBase = [];

	const inputHightTask = document.getElementById("addingHight__input"),
		formHight = document.querySelector("form.add1"),
		formLow = document.querySelector("form.add2"),
		inputLowTask = document.getElementById("addingLow__input"),
		HightMainContainer = document.querySelector(".Hight-Task__container"),
		lowMainContainer = document.querySelector(".low-Task__container");

	function Task(title, priority) {
		this.id = Date.now();
		this.title = title;
		this.priority = priority;
		this.status = false;
		this.complete = function () {
			this.status = true;
		};
	}

	function addTask(item, priorit) {
        for (let k = 0; k < mainBase.length; k++) {
			if (mainBase[k].title === item) {
				return alert("Такая задача уже существует в списке задач");
			} else continue;
		}
        if (stringConverter(item)) return;

		if (item != "") {
			const tasks = new Task(item, priorit);
			mainBase.push(tasks);
			addToLocalStorage(mainBase);
		} else {
			alert("Задача не была введена!");
		}
	}

	function renderTodos(DataBase) {
		HightMainContainer.innerHTML = "";
		lowMainContainer.innerHTML = "";
		for (let i = 0; i < DataBase.length; i++) {
			let grenClass;
			if (DataBase[i].status === false) {
				grenClass = "task__text";
			} else {
				grenClass = "task__text2";
			}
			if (DataBase[i].priority === "Hight") {
				HightMainContainer.innerHTML += `<div class="task__container">
                <input
                class="check-box"
                type="checkbox"
                name= ${DataBase[i].title}
                id="delete"
                />
                <p class=${grenClass}>${DataBase[i].title}</p>
                <button  class = 'delete-Task' data-id=${DataBase[i].id}>
                <img src="close-icon.svg" alt="" />
                </button>
                </div>`;
			} else {
				lowMainContainer.innerHTML += `<div class="task__container">
                <input
                class="check-box"
                type="checkbox"
                name= ${DataBase[i].title}
                id="delete"
                />
                <p class=${grenClass}>${DataBase[i].title}</p>
                <button class = 'delete-Task' data-id=${DataBase[i].id}>
                <img src="close-icon.svg" alt="" />
                </button>
                </div>`;
			}
		}
        deleteTask(document.querySelectorAll('.delete-Task'));
        checkBoxChekin();
	}

	function addToLocalStorage(todos) {
		localStorage.setItem("todos", JSON.stringify(todos));
		renderTodos(todos);
	}

	function getFromLocalStorage() {
		const reference = localStorage.getItem("todos");
		if (reference) {
            mainBase = JSON.parse(reference)
			renderTodos(JSON.parse(reference));
		}
	}
	getFromLocalStorage();
    
    formHight.addEventListener("submit", function (event) {
		event.preventDefault(event);
		addTask(
			inputHightTask.value, 
			"Hight"
		);
		event.target.reset();
	});

    formLow.addEventListener("submit", function (event) {
		event.preventDefault(event);
		addTask(inputLowTask.value, "Low");
		event.target.reset();
	});

    function deleteTask(btnDeleteClass) {
		btnDeleteClass.forEach((btn, index) => {
			btn.addEventListener("click", () => {
				for (let i = 0; i < mainBase.length; i++) {
					if (btn.dataset.id ==	mainBase[i].id) {
                        mainBase = mainBase.filter(function (item) {
                            return item.id != mainBase[i].id;
                            });
                        addToLocalStorage(mainBase);
					} else continue;
				}
			});
		});
	}

    function checkBoxChekin() {
		document.querySelectorAll(".check-box").forEach((chek, index) => {
			chek.addEventListener("click", () => {
				if (chek.checked == true) {
					for (let i = 0; i < mainBase.length; i++) {
						if (chek.name === mainBase[i].title) {
                            mainBase[i].complete()
							addToLocalStorage(mainBase);
							chek.nextSibling.nextSibling.classList.replace(
								"task__text",
								"task__text2"
							);
						} else continue;
					}
				} else {
					for (let i = 0; i < mainBase.length; i++) {
						if (chek.name === mainBase[i].name) {
                            mainBase[i].status = false;
							addToLocalStorage(mainBase);
							chek.nextSibling.nextSibling.classList.replace(
								"task__text2",
								"task__text"
							);
						} else continue;
					}
				}
			});
		});
	}
});
