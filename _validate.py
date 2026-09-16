"""Structural validator for the VIETD static site.
Correctly handles: void elements, self-closing (/>) tags, raw-text elements
(script/style), duplicate IDs, label->control wiring, internal links,
anchors, and local asset existence.
"""
import os, glob
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link',
        'meta','param','source','track','wbr'}
RAWTEXT = {'script','style'}


class V(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []       # open non-void, non-self-closing elements
        self.errors = []
        self.ids = []
        self.hrefs = []
        self.assets = []
        self.label_for = []
        self.controls = []

    # --- <tag .../> : must NOT be pushed on the stack
    def handle_startendtag(self, tag, attrs):
        self._attrs(tag, attrs)

    def handle_starttag(self, tag, attrs):
        if tag in RAWTEXT:
            self._attrs(tag, attrs)
            return                      # rawtext: content ignored, closed by endtag
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))
        self._attrs(tag, attrs)

    def handle_endtag(self, tag):
        if tag in RAWTEXT:
            return
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append(f'stray </{tag}> at {self.getpos()}')
            return
        top, pos = self.stack.pop()
        if top != tag:
            self.errors.append(
                f'mismatch: </{tag}> at {self.getpos()} closes <{top}> opened at {pos}')

    def _attrs(self, tag, attrs):
        d = dict(attrs)
        if d.get('id'):
            self.ids.append(d['id'])
        if tag in ('input','select','textarea') and d.get('id'):
            self.controls.append(d['id'])
        if tag == 'a' and d.get('href'):
            self.hrefs.append(d['href'])
        if tag in ('img','source') and d.get('src'):
            self.assets.append(d['src'])
        if tag == 'link' and d.get('rel') in ('stylesheet','icon','apple-touch-icon'):
            if d.get('href'):
                self.assets.append(d['href'])
        if tag == 'label' and d.get('for'):
            self.label_for.append(d['for'])
        # inline style url(...) refs
        st = d.get('style') or ''
        if 'url(' in st:
            import re
            for m in re.finditer(r'url\((["\']?)([^)"\']+)\1\)', st):
                self.assets.append(m.group(2))


def check(path):
    src = open(path, encoding='utf-8').read()
    v = V(); v.feed(src); v.close()
    probs = list(v.errors)

    if v.stack:
        probs.append('unclosed: ' + ', '.join(f'{t}@{p}' for t, p in v.stack))

    dups = sorted({i for i in v.ids if v.ids.count(i) > 1})
    if dups:
        probs.append('duplicate ids: ' + ', '.join(dups))

    missing = sorted({f for f in v.label_for if f not in v.controls})
    if missing:
        probs.append('label -> missing control: ' + ', '.join(missing))

    for h in v.hrefs:
        if h.startswith(('http://','https://','mailto:','tel:','//','data:')):
            continue
        if h.startswith('#'):
            if len(h) > 1 and h[1:] not in v.ids:
                probs.append('missing anchor: ' + h)
            continue
        target = h.split('#')[0].split('?')[0]
        if target and not os.path.exists(target):
            probs.append('broken link: ' + h)

    for a in v.assets:
        if a.startswith(('http://','https://','//','data:')):
            continue
        if not os.path.exists(a):
            probs.append('missing asset: ' + a)

    return sorted(set(probs))


if __name__ == '__main__':
    pages = sorted(p for p in glob.glob('*.html') if not p.startswith('_'))
    ok = True
    for p in pages:
        problems = check(p)
        if problems:
            ok = False
            print(f'{p:22} FAIL')
            for x in problems:
                print('     -', x)
        else:
            print(f'{p:22} PASS')
    print()
    print('OVERALL:', 'ALL PASS' if ok else 'ISSUES FOUND')
