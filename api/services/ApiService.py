class ApiService:
    def __init__(self, ip, outer_key) -> None:
        self.ip = ip
        self.outer_key = outer_key

    def check_api_key(self) -> bool:
        return True
    
    def check_token(self) -> bool:
        return True
