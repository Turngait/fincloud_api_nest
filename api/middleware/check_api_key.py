from services.ApiService import ApiService

def check_api_key(ip, outer_key):
    api_service = ApiService(ip, outer_key)
    return api_service.check_api_key()