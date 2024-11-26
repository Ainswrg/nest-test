# node-server

Этот сервер позволяет добавлять динамические маршруты с возможностью указания времени жизни маршрута (TTL).  

## Основные функции

1. **Добавление маршрутов**:
   - Маршруты можно добавлять с помощью POST-запроса на `/add-route`.
   - По умолчанию маршруты удаляются через 1 час.
   - Можно указать время жизни маршрута (TTL) в часах при добавлении.

2. **Обращение к маршрутам**:
   - GET-запрос на `/:routeName` выполняет код, связанный с маршрутом.

3. **Удаление маршрутов**:
   - Маршруты можно удалять вручную через DELETE-запрос на `/remove-route`.

---

## Пример запроса через Fetch API

### 1. **Добавление маршрута с TTL**

```javascript
fetch("http://localhost:3000/add-route", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': btoa("login:password"),
    },
    body: JSON.stringify({
        name: 'example-name',
        handler: "res.send('Hello, dynamic route!')",
        ttl: 3 // время жизни маршрута в часах, если не указывать по дефолту 1
    })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

### 2. **Удаление маршрута с TTL**
```javascript
fetch("http://localhost:3000/remove-route", {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': btoa("login:password"),
    },
    body: JSON.stringify({
        name: 'example-name'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
```

### Примечания

 1. Время жизни маршрута (TTL):
    - По умолчанию маршруты удаляются через 1 час.
    - TTL можно указать в POST-запросе на /add-route (в часах).

 2. Безопасность:
    - Для добавления и удаления маршрутов используется базовая авторизация:
    - Логин: login
    - Пароль: password
    - Токен авторизации: btoa("login:password")
