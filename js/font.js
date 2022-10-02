export class LeonSansFont {
    _leon;
    _ctx;
    _sw;
    _sh;
    
    pixelRatio = 2;

    constructor(canvas, str, color, size, weight, width, height) {
        this._ctx = canvas.getContext("2d");

        this._sw = width;
        this._sh = height;

        canvas.width = this._sw * this.pixelRatio;
        canvas.height = this._sh * this.pixelRatio;
        canvas.style.width = this._sw + 'px';
        canvas.style.height = this._sh + 'px';
        this._ctx.scale(this.pixelRatio, this.pixelRatio);
    
        this._leon = new LeonSans({
            text: str,
            color,
            size,
            weight
        });

        this.draw();
        // requestAnimationFrame(this.animate.bind(this));
    }

    // animate(t) {
    //     requestAnimationFrame(this.animate.bind(this));
    
    //     this._ctx.clearRect(0, 0, this._sw, this._sh);
    
    //     this.draw();
    // }
    
    draw() {
        const x = (this._sw - this._leon.rect.w) / 2;
        const y = (this._sh - this._leon.rect.h) / 2;
        this._leon.position(x, y);
    
        this._leon.draw(this._ctx);
    }
}
