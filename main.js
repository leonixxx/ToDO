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
		if (stringConverter(value)) return;

		const taskobj = {
			name: `${value}`,
			status: `${statusValue}`,
			checkbox: "",
			deleteClass: `${delete_buttonClass}`,
		};
		mainBase.push(taskobj);
		addLocalStorage(value, taskobj);
		renderHtml(mainBase, HightMainContainer, lowMainContainer);

		deleteTask(
			document.querySelectorAll(`.${delete_buttonClass}`),
			mainBase
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
