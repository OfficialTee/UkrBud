# Опис середовища проекту

Серед середовищ розробки було обрано WebStorm від JetBrains. Через вузьку направленість саме на розробку за допомоги
JavaScript, WebStorm має низьку дуже зручних можливостей та функцій.

Серверна частина застосунку написана на JavaScript, для цього було використано платформу NodeJS.

Бібліотеки та фреймворки Node.js, які будуть використані в розробці:

- Express;
- MongoDB;
- EJS;
- Body-parser.

Для побудови структури сторінок було використано мову розмітки HTML.

Для побудови адаптивної розмітки, було використано фреймворк Bootstrap 5.

За для іконок було взято фреймворк Font Awesome 6.

Для стилізації веб-сторінок використано препроцесор SСSS.

У якості бази даних було обрано документо-орієнтовану СКБД MongoDB.

# Інструкцію налаштувань середовища проекту

Для роботи проекту треба встановити Node JS.

Потім, для використання бібліотек Node JS вписати в консоль такі команди:

```bash
npm i body-parser
npm i ejs
npm i express
npm i mongodb
```

Після цього перейти в налаштування Settings > Tools > File Watchers та додати Watcher на SCSS файли.

Для роботи Bootstrap 5 та Font Awesome 6 треба додавати такий код, в кожному .ejs файлі:

```js
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossorigin="anonymous"></script>
```


