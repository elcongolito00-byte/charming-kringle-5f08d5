"""Serve the static site locally, including Netlify-style clean HTML URLs."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent


class SiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        candidate = (ROOT / path.lstrip('/')).resolve()
        if candidate.is_relative_to(ROOT) and not candidate.suffix:
            html = candidate.with_suffix('.html')
            if html.is_file():
                self.path = '/' + html.relative_to(ROOT).as_posix()
        super().do_GET()


if __name__ == '__main__':
    print('Open http://localhost:8000. Press Ctrl+C to stop.')
    ThreadingHTTPServer(('127.0.0.1', 8000), SiteHandler).serve_forever()
