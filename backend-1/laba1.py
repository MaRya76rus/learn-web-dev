import re

class Master:
    def __init__(self, master_id: int, name: str):
        self.master_id = master_id
        self.name = name


class Service:
    def __init__(self, service_id: int, name: str):
        self.service_id = service_id
        self.name = name

masters = [
    Master(1, "Анна"),
    Master(2, "Елена"),
]

services = [
    Service(1, "Стрижка"),
    Service(2, "Окрашивание"),
]

def get_master(master_id: int):
    for master in masters:
        if master.master_id == master_id:
            return master
    return None

def get_service(service_id: int):
    for service in services:
        if service.service_id == service_id:
            return service
    return None

# Задание 1
class Appointment:
    def __init__(self, id: int, client_name: str, master_id: int, service_id: int, time: str):
        self.id = id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

    def __repr__(self):
        return f"Appointment(id={self.id}, client_name='{self.client_name}', time='{self.time}')"

appointments = []

# Задание 2
def is_valid_time(time: str) -> bool:
    if not re.match(r'^([01]\d|2[0-3]):([0-5]\d)$', time):
        return False
    hours = int(time.split(':')[0])
    return 8 <= hours < 20

def create_appointment(client_name: str,
                       master_id: int,
                       service_id: int,
                       time: str,
) -> Appointment | None:
    if not client_name or not master_id or not service_id or not time:
        return None

    if not is_valid_time(time):
        return None

    master = get_master(master_id)
    service = get_service(service_id)

    if master is None or service is None:
        return None

    appointment = Appointment(
        id=len(appointments) + 1,
        client_name=client_name,
        master_id=master.master_id,
        service_id=service.service_id,
        time=time,
    )
    appointments.append(appointment)
    return appointment

# Проверка
if __name__ == "__main__":
    print("Задание 1")
    first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
    second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
    print("Список записей:")
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    appointments.clear()
    no_correct_appointment = create_appointment("", 1, 1, '12:00')
    print(f"\nПосле записи с пустым именем: {len(appointments)}")

    print("\nЗадание 2")
    appointments.clear()
    first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
    second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
    print("Список записей:")
    for appointment in appointments:
        print(appointment.client_name, appointment.time)

    appointments.clear()
    no_correct_appointment = create_appointment("Сидорова А.А.", 1, 1, '00:00')
    print(f"\nПосле записи на 00:00: {len(appointments)}")
