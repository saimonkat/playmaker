export default function () {
    customElements.define(
        "pie-chart",
        class extends HTMLElement {
            connectedCallback() {
                setTimeout(() => this.svg(this.attachShadow({mode: "open"})));
            }

            svg(t, e = (this.getAttribute("stroke") || "#3c3,#c33,#33c,#cc3,#c3c,#3cc").split(","), i = ~~this.getAttribute("pull"), s = 0, r = 0) {
                t.innerHTML = `<style>:host{display:inline-block}svg{width:100%}</style><svg part="svg" viewBox="0,0,${1e3 + i},${1e3 + i}">${this.innerHTML}</svg>`;
                [...t.querySelectorAll("slice")].map((t, u) => {
                    let l,
                        o = document.createElementNS("http://www.w3.org/2000/svg", "g"),
                        a = document.createElementNS("http://www.w3.org/2000/svg", "text"),
                        n = t.getAttribute("size") || "",
                        h = ~~n.replace("%", ""),
                        g = ~~t.getAttribute("stroke-width") || ~~this.getAttribute("stroke-width") || 500 + i / 2 - i,
                        p = s;
                    o.path = (
                        s = 0,
                        u = g,
                        a = t.getAttribute("stroke") || (l ? "" : e.shift()),
                        n = h,
                        b = p,
                        A = (500 + i / 2) / 2 - i / 2 + s - ("stroke-width" == this.getAttribute("fill") ? (500 - i / 2 - u) / 2 : 0),
                        c = document.createElementNS("http://www.w3.org/2000/svg", "path")
                    ) => (
                        c.setAttribute("part", "path"),
                            c.setAttribute("stroke", a),
                            c.setAttribute("stroke-width", u),
                            c.setAttribute("pathLength", r),
                            c.setAttribute("stroke-dasharray", n + " " + (r - n)),
                            c.setAttribute("d", `m${500 + i / 2},${500 + i / 2}m0,${-A}a2,2,0,000,${2 * A}a2,2,0,000-${2 * A}`),
                            c.setAttribute("fill", "none"),
                            (c.getPoint = (t = 0, e) => (e ? o.path(e).getPoint(t) : c.getPointAtLength(c.getTotalLength() - (c.getTotalLength() / r) * (t + (b + n / 2))))),
                            c
                    );
                    h == n ? r || [...this.querySelectorAll("slice")].map((t) => (r += ~~t.getAttribute("size"))) : (r = ~~this.getAttribute("size") || 100);
                    h || ((h = r - s), (n = h + "%"));
                    l = o.path(~~t.getAttribute("radius"));
                    o.points = [
                        [0, 0],
                        [h / -2, g / -2],
                        [h / -2, g / 2],
                        [h / 2, g / -2],
                        [h / 2, g / 2],
                        [0, g / -2],
                        [0, g / 2],
                        [0, ~~t.getAttribute("pulltext") || ~~this.getAttribute("pulltext") || 0],
                        [0, Math.abs(~~t.getAttribute("pull") || i)],
                    ].map(([t, e]) => l.getPoint(t, e));
                    o.setAttribute("part", "slice" + u);
                    o.setAttribute("size", n);
                    o.setAttribute("label", (a.innerHTML = this.querySelector("style") ? (t.innerHTML ? t.innerHTML.replace("$size", n) : n) : ""));
                    l.setAttribute("stroke-dashoffset", "top" == this.getAttribute("offset") ? h - r : (s += h));
                    [...t.attributes].map((t) => l.setAttribute(t.name, t.value));
                    a.setAttribute("part", "text");
                    a.setAttribute("x", t.getAttribute("x") || ("top" == this.getAttribute("offset") ? "50%" : o.points[7].x));
                    a.setAttribute("y", t.getAttribute("y") || ("top" == this.getAttribute("offset") ? "50%" : o.points[7].y));
                    o.append(l, a);
                    t.replaceWith(o);
                    t.hasAttribute("pull") && o.setAttribute("transform", `translate(${o.points[8].x - o.points[0].x} ${o.points[8].y - o.points[0].y})`);
                });
            }
        }
    );
}