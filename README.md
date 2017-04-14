 ## Приложение "Почтовый ящик" (или gmail-clone)
В приложении зарегистрировано 3 пользователя:

1.Email: Ivanov@mail.ru Password: vanya
2.Email: Petrov@mail.ru  Password: petya
3.Email: Vasin@mail.ru    Password: vasya

Под любым из них вы можете войти. Между пользователями осуществляется переписка. Каждый пользователь может написать письмо другому пользователю. У отправителя письмо будет исходящим, у получателя входящим. Пользователь может изменять только  свои  личные данные(имя, фамилия),  при этом другие пользователи видят изменения. Пользователь может удалять письма из своих почтовых ящиков, у других пользователей они удаляться не будут. 
Для каждого пользователя реализовано:
1. Авторизация в приложении под любым из зарегистрированных пользователей.
2. Вывод списка почтовых ящиков. Почтовый ящик отмечен цветом если в нем хотя бы одно непрочитанное сообщение. Почтовые ящики сортируются  по дате последнего сообщения.
3. Почтовый ящик отображает имя собеседника, последнее сообщение в диалоге и дату последнего сообщения
4. Вывод списка писем(краткий формат) в почтовом ящике (при выборе ящика)
5. Вывод письма полностью
6. Фильтр непрочитанных сообщений
7. Возможность удаления письма 
8. Отправка нового письма по любому адресу + валидация
9. При создании письма поле "кому" автодополнение по почтовым адресам пользователей из списка контактов.
10. При отправке письма на адрес, которого нет в адресной книге - он добавляется в  в список контактов.
11. Возможность добавления новых контактов в списке “Контакты” +валидация(если пользователь существует)
12. Редактирование собственных данных (+валидация).Другие пользователи видят изменение ваших данных(имя,фамилия)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
