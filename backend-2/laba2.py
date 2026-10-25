from flask import Flask, jsonify

app = Flask(__name__)

class Category:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

class Service:
    def __init__(self, id: int, name: str, category_id: int):
        self.id = id
        self.name = name
        self.category_id = category_id

categories = [
    Category(1, "Стрижки и укладки"),
    Category(2, "Маникюр и педикюр"),
    Category(3, "Брови и ресницы"),
    Category(4, "Спа-процедуры"),
]

services = [
    # Стрижки и укладки (5 услуг)
    Service(1, "Женская стрижка", 1),
    Service(2, "Мужская стрижка", 1),
    Service(3, "Укладка", 1),
    Service(4, "Окрашивание", 1),
    Service(5, "Мелирование", 1),

    # Маникюр и педикюр (5 услуг)
    Service(6, "Классический маникюр", 2),
    Service(7, "Аппаратный маникюр", 2),
    Service(8, "Покрытие гель-лаком", 2),
    Service(9, "Классический педикюр", 2),
    Service(10, "Аппаратный педикюр", 2),

    # Брови и ресницы (4 услуги)
    Service(11, "Коррекция бровей", 3),
    Service(12, "Окрашивание бровей", 3),
    Service(13, "Наращивание ресниц", 3),
    Service(14, "Ламинирование ресниц", 3),

    # Спа-процедуры (4 услуги)
    Service(15, "Массаж лица", 4),
    Service(16, "Пилинг", 4),
    Service(17, "Маска для лица", 4),
    Service(18, "Обертывание", 4),
]

def get_categories_with_services_count():
    result = []
    for category in categories:
        services_count = sum(1 for service in services if service.category_id == category.id)
        result.append({
            "id": category.id,
            "name": category.name,
            "servicesCount": services_count
        })
    return result

def get_category_by_id(category_id: int):
    for category in categories:
        if category.id == category_id:
            services_count = sum(1 for service in services if service.category_id == category.id)
            return {
                "id": category.id,
                "name": category.name,
                "servicesCount": services_count
            }
    return None

# Задание 1
@app.route('/categories', methods=['GET'])
def get_categories():
    categories_list = get_categories_with_services_count()
    return jsonify(categories_list), 200

# Задание 2
@app.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id: int):
    category = get_category_by_id(category_id)

    if category is None:
        return "Сategory not found", 404

    return jsonify(category), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)