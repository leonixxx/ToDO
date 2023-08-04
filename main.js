"use strict";

import { renderHtml } from "./moduleOne.js";
import { stringConverter } from "./chekLength.js";

document.addEventListener("DOMContentLoaded", function () {
	let mainBase = [];

	const inputHightTask = document.getElementById("addingHight__input"),
		formHight = document.querySelector("form.add1"),
		formLow = document.querySelector("form.add2"),
		inputLowTask = document.getElementById("addingLow__input"),
		HightMainContainer = document.querySelector(".Hight-Task__container"),
		lowMainContainer = document.querySelector(".low-Task__container");

	const WebBase = window.localStorage;
	memoryCreate();

	function addNewTask(value, statusValue, delete_buttonClass) {
		if (checkedEmpty(value)) {
			return alert("Задача не была введена!");
		}

		for (let k = 0; k < mainBase.length; k++) {
			if (mainBase[k].name === value) {
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
		checkBoxChekin();
	}
	function checkBoxChekin() {
		document.querySelectorAll(".check-box").forEach((chek, index) => {
			chek.addEventListener("click", () => {
				if (chek.checked == true) {
					for (let i = 0; i < mainBase.length; i++) {
						if (chek.name === mainBase[i].name) {
							mainBase[i].checkbox = "checked";
							chek.nextSibling.nextSibling.classList.replace(
								"task__text",
								"task__text2"
							);
							createCheckStatus(mainBase);
						} else continue;
					}
				} else {
					for (let i = 0; i < mainBase.length; i++) {
						if (chek.name === mainBase[i].name) {
							mainBase[i].checkbox = "";
							chek.nextSibling.nextSibling.classList.replace(
								"task__text2",
								"task__text"
							);
							createCheckStatus(mainBase);
						} else continue;
					}
				}
			});
		});
	}

	function checkedEmpty(value) {
		if (!isNaN(value) || value === "") {
			return true;
		} else return false;
	}

	function deleteTask(btnDeleteClass, DataBase) {
		btnDeleteClass.forEach((btn, index) => {
			btn.addEventListener("click", () => {
				btn.parentElement.remove(btn);
				for (let i = 0; i < DataBase.length; i++) {
					if (
						btn.previousSibling.previousSibling.textContent ===
						DataBase[i].name
					) {
						DataBase.splice(i, 1);
						deleteLocalStorage(
							btn.previousSibling.previousSibling.textContent
						);
					} else continue;
				}
			});
		});
	}

	function addLocalStorage(value, objectAdd) {
		WebBase.setItem(value, JSON.stringify(objectAdd));
	}
	function deleteLocalStorage(value) {
		WebBase.removeItem(value);
	}
	function createCheckStatus(objectAdd) {
		WebBase.clear();
		objectAdd.forEach((value, index) => {
			addLocalStorage(objectAdd[index].name, value);
		});
	}
	function memoryCreate() {
		if (WebBase.length !== 0) {
			for (let i = 0; i < WebBase.length; i++) {
				mainBase.push(JSON.parse(WebBase.getItem(WebBase.key(i))));
			}

			renderHtml(mainBase, HightMainContainer, lowMainContainer);
			deleteTask(document.querySelectorAll(`.Add-taskHight`), mainBase);
			deleteTask(document.querySelectorAll(`.Add-taskLow`), mainBase);
			checkBoxChekin();
		} else return console.log("БАЗА ПУСТА");
	}

	formHight.addEventListener("submit", function (event) {
		event.preventDefault(event);
		addNewTask(
			inputHightTask.value, 
			"Hight",
			"Add-taskHight"
		);
		event.target.reset();
	});

	formLow.addEventListener("submit", function (event) {
		event.preventDefault(event);
		addNewTask(inputLowTask.value, "Low", "Add-taskLow");
		event.target.reset();
	});
});
