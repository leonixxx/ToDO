export function stringConverter(str) {
    try {
        if (str.length < 3) {
            throw new Error("Ошибка: Строка слишком коротка");
        }
    } catch {
        alert("Ошибка: Строка слишком коротка");
        return	true
    }
    try {
        if (str.length > 30) {
            throw new Error("Ошибка: Сстрока слишком длинная");
        }
    } catch {
        alert("Ошибка: Сстрока слишком длинная");
        return true
    }
}