class CanvasRenderer {
    constructor(w,h) {
        const canvas = document.createElement("canvas");
        this.w = w;
        this.h = h;
        canvas.width = w;
        canvas.height = h;
        this.view = canvas;
        this.ctx = canvas.getContext("2d");
    }

    render(container, clear = true) {
        const {ctx} = this;
        function renderRec(container) {
            //Render container children
            container.children.forEach(child => {
                if (child.visible == false) {
                    return;
                }
                ctx.save();
                //Draw the leaf node
                if (child.pos) {
                  //  ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y))
                }

                //Check what to draw
                //console.log(child.texture.image);
                //console.log(child.pos.x);
                if (child.text) {
                    const {font, fill, align} = child.style;
                    if (font) ctx.font = font;
                    if (fill) ctx.fillStyle = fill;
                    if (align) ctx.textAlign = align;
                    ctx.fillText(child.text, child.pos.x, child.pos.y);
                } else if (child.texture) {
                    ctx.drawImage(child.texture.image, child.pos.x, child.pos.y);
                }

                if (child.children) {
                    renderRec(child);
                }
                ctx.restore();
                
            });

        }

        //Clear the screen
        if (clear) {
            ctx.clearRect(0, 0, this.w, this.h);
        }
        
        renderRec(container);

    }
}

export default CanvasRenderer;