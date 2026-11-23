"""Serve Try-Aprender and its local reading references."""

from argparse import ArgumentParser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


PROJECT = Path(__file__).resolve().parent
NETWORK_LECTURES = PROJECT.parent / "computer network" / "lecture"
NETWORK_REFERENCES = {
    "ITDS231-Lecture7-VLAN-2026.pdf": "lecture 8 arp-l2switch-vlan",
    "ITDS231_Data-Link-Layer-Tutorial_with_GBN_SR.pdf": "lecture 8 arp-l2switch-vlan",
    "Chapter_4_rev3.pdf": "lecture 9-10 network layer",
    "Chapter_5_rev3.pdf": "lecture 9-10 network layer",
    "Chapter_6_rev2.pdf": "lecture 11-12 transport layer",
    "5G Introduction_ICT-MU_5Nov2026_ (1).pdf": "lecture 13-14 wireless and mobile networks",
    "NT nexConnect Deep Dive.pdf": "lecture 15 internet service over satellite",
}
SOFTWARE_LECTURES = PROJECT.parent / "software engineering" / "lecture"
SOFTWARE_REFERENCES = {
    8: "2026 - ITDS261 - L8 - User Interface Design.pdf",
    9: "2026 - ITDS261 - L9 - Design Architecture and Methodology.pdf",
    10: "2026 - ITDS261 - L10 - Implementation  Code review.pdf",
    11: "2026 - ITDS261 - L11 - VCS.pdf",
    12: "2026 - ITDS261 - L12 - Testing.pdf",
    13: "2026 - ITDS261 - L13 - Unit, integration and system testing.pdf",
    14: "2026 - ITDS261 - L14 - Agentic Software Engineering.pdf",
    15: "2026 - ITDS261 - Final guideline.pdf",
}
READING_LECTURES = PROJECT.parent / "reading english"
READING_TEXT = PROJECT / "reading-sources"
REFERENCES = {
    f"/itds231-reference/{filename}": NETWORK_LECTURES / folder / filename
    for filename, folder in NETWORK_REFERENCES.items()
}
REFERENCES.update({
    f"/itds261-reference/lecture-{number:02}.pdf": SOFTWARE_LECTURES / f"lecture {number:02}" / filename
    for number, filename in SOFTWARE_REFERENCES.items()
})
REFERENCES.update({
    f"/itlg201-reference/{source.relative_to(READING_LECTURES).as_posix()}": source
    for source in READING_LECTURES.rglob("*")
    if source.is_file() and source.suffix.lower() in {".pdf", ".png"}
    and source.resolve().is_relative_to(READING_LECTURES.resolve())
})
REFERENCES.update({
    f"/itlg201-text/{source.name}": source
    for source in READING_TEXT.glob("reading-*.json")
    if source.is_file() and source.resolve().is_relative_to(READING_TEXT.resolve())
})


class StudyHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        requested = unquote(urlsplit(path).path)
        reference = REFERENCES.get(requested)
        if reference:
            port = self.server.server_port
            local_hosts = {f"localhost:{port}", f"127.0.0.1:{port}"}
            if port == 80:
                local_hosts.update(("localhost", "127.0.0.1"))
            if self.headers.get("Host", "").lower() in local_hosts:
                return str(reference)
        return super().translate_path(path)


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    handler = partial(StudyHandler, directory=str(PROJECT / "dist"))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"Open http://localhost:{server.server_port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
