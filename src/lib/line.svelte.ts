import type { NodeOpts } from "./types"

const style_to_str = (styles: Record<string, string | number>) => {
    return Object.entries(styles).map(([key, value]) => {
        const snake_key = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        if (typeof value === "number") {
            return `${snake_key}: ${value}px`
        }
        return `${snake_key}: ${value}`
    }).join(";")
}

export class Line {
    src: NodeOpts
    dst: NodeOpts
    label: string
    dot_size: number
    color: string
    inset: number
    line_width: number
    label_align: string

    #src_rect: DOMRect | null = null
    #dst_rect: DOMRect | null = null

    constructor(src: NodeOpts,
                dst: NodeOpts,
                label: string,
                color: string = "blue",
                dot_size: number = 10,
                line_width: number = 2) {
        this.src = src
        this.dst = dst
        this.label = label || ""
        this.dot_size = dot_size
        this.color = color
        this.inset = 0
        this.line_width = line_width
        this.label_align = "center"
    }

    get src_rect() {
        if (!this.#src_rect) {
            const dot = this._find_dot(this.src)
            this.#src_rect = dot?.getBoundingClientRect() ?? null
        }
        return this.#src_rect
    }

    get dst_rect() {
        if (!this.#dst_rect) {
            const dot = this._find_dot(this.dst)
            this.#dst_rect = dot?.getBoundingClientRect() ?? null
        }
        return this.#dst_rect
    }

    get dot_radius() {
        const outline_width = 2
        const outline_offset = 2
        return this.inset + this.dot_size / 2 + outline_width + outline_offset
    }

    _find_dot(opts: NodeOpts) {
        let dot = null
        if (opts.node) dot = opts.node
        if (opts.selector) dot = document.querySelector(opts.selector)
        // dot.style.outline = "3px dotted rebeccapurple"
        return dot
    }

    _dot_styles(opts: NodeOpts) {
        const rect = this._find_dot(opts)?.getBoundingClientRect()
        return {
            left: this.inset + (rect?.left ?? 0),
            top: this.inset + (rect?.top ?? 0),
            width: this.dot_size,
            height: this.dot_size,
            backgroundColor: this.color,
            // opacity: "0.9",
            borderRadius: "50%",
            outline: `2px solid ${this.color}`,
            outlineOffset: "2px",
            position: "absolute",
            zIndex: "1000",
        }
    }

    get reverse() {
        const src_rect = this._find_dot(this.src)?.getBoundingClientRect()
        const dst_rect = this._find_dot(this.dst)?.getBoundingClientRect()
        return (src_rect?.top ?? 0) > (dst_rect?.top ?? 0)
    }

    _line_styles() {
        let src_rect = this.src_rect
        let dst_rect = this.dst_rect

        if (this.reverse) {
            [src_rect, dst_rect] = [dst_rect, src_rect]
        }

        const center_dot = (n: number) => n + this.dot_radius
        const _x1 = src_rect?.left ?? 0
        const _y1 = src_rect?.top ?? 0
        const _x2 = dst_rect?.left ?? 0
        const _y2 = dst_rect?.top ?? 0

        const x1 = this.inset + this.dot_size/2 + _x1
        const y1 = this.inset + this.dot_size/2 + _y1
        const x2 = this.inset + this.dot_size/2 + _x2
        const y2 = this.inset + this.dot_size/2 + _y2

        console.log({x1, y1, x2, y2})

        const pythag = (x: number, y: number) => Math.sqrt(x*x + y*y)
        const distance = pythag(Math.abs(x2 - x1), Math.abs(y2 - y1))

        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
        console.log('angle', angle)

        return {
            left: x1,
            top: y1,
            width: distance,
            height: this.line_width, 
            backgroundColor: this.color,
            position: "absolute",
            zIndex: "1000",
            transform: `rotate(${angle}deg)`,
            transformOrigin: "top left",
            textAlign: this.label_align,
        }
    }   

    src_styles() { return style_to_str(this._dot_styles(this.src)) }
    dst_styles() { return style_to_str(this._dot_styles(this.dst)) }
    line_styles() { return style_to_str(this._line_styles()) }
}