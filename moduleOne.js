export function renderHtml (DataBase, parent1, parent2) {
    parent1.innerHTML = "";
    parent2.innerHTML = "";
    for (let i = 0; i < DataBase.length; i++) {
        let grenClass;
        if (DataBase[i].checkbox === "") {
            grenClass = "task__text";
        } else {
            grenClass = "task__text2";
        }
        if (DataBase[i].status === "Hight") {
            parent1.innerHTML += `<div class="task__container">
    <input
    class="check-box"
    type="checkbox"
    name= ${DataBase[i].name}
    id="delete"${DataBase[i].checkbox}
    />
    <p class=${grenClass}>${DataBase[i].name}</p>
    <button class = ${DataBase[i].deleteClass}>
    <img src="close-icon.svg" alt="" />
    </button>
    </div>`;
        } else {
            parent2.innerHTML += `<div class="task__container">
    <input
    class="check-box"
    type="checkbox"
    name= ${DataBase[i].name}
    id="delete"${DataBase[i].checkbox}
    />
    <p class=${grenClass}>${DataBase[i].name}</p>
    <button class = ${DataBase[i].deleteClass}>
    <img src="close-icon.svg" alt="" />
    </button>
    </div>`;
        }
    }
}