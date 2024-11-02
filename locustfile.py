from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_users(self):
        self.client.get("/users")

    @task
    def get_user_by_id(self):
        user_id = 1  # Contoh user ID
        self.client.get(f"/users/{user_id}")

    @task
    def create_user(self):
        # Contoh data untuk POST request
        user_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "username": "johndoe"
        }
        self.client.post("/users", json=user_data)

    @task
    def update_user(self):
        user_id = 1  # Contoh user ID untuk update
        updated_data = {
            "name": "John Doe Updated",
            "email": "john.updated@example.com",
            "username": "johnupdated"
        }
        self.client.put(f"/users/{user_id}", json=updated_data)

    @task
    def delete_user(self):
        user_id = 3  # Contoh user ID untuk delete
        self.client.delete(f"/users/{user_id}")
