from werkzeug.wrappers import Request, Response


class CheckJSON:
    def __init__(self, app):
        self.app = app
        self.content_type = 'application/json'

    def __call__(self, environ, start_response):
        request = Request(environ)
        # Перенести проверки на метод в другое место
        if request.method == 'GET':
            return self.app(environ, start_response)
        if 'Content-Type' in request.headers and self.content_type == request.headers['Content-Type']:
            return self.app(environ, start_response)
        res = Response(u'Accept only JSON', mimetype='text/plain', status=406)
        return res(environ, start_response)
