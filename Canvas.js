var Canvas = (function () {
    function Canvas(element) {
        if (element === void 0) { element = document.createElement('canvas'); }
        this.Element = element;
        this.Context = this.Element.getContext('2d');
        this.Context.fillStyle = '#000000';
        this.Context.save();
    }
    Canvas.prototype.GetDimensions = function () {
        return {
            'Width': this.Element.width,
            'Height': this.Element.height
        };
    };
    Canvas.prototype.GetWidth = function () {
        return this.Element.width;
    };
    Canvas.prototype.GetHeight = function () {
        return this.Element.height;
    };
    Canvas.prototype.SetDimensions = function (width, height) {
        if (height === void 0) { height = width; }
        if (typeof width == "object") {
            this.Element.width = width.Width;
            this.Element.height = width.Height;
        }
        else {
            this.Element.width = width;
            this.Element.height = height;
        }
        return this;
    };
    Canvas.prototype.SetWidth = function (width) {
        this.Element.width = width;
        return this;
    };
    Canvas.prototype.SetHeight = function (height) {
        this.Element.height = height;
        return this;
    };
    Canvas.prototype.SetAlpha = function (alpha) {
        this.Context.globalAlpha = alpha;
        return this;
    };
    Canvas.prototype.SetFillStyle = function (r, g, b, a) {
        this.Context.fillStyle = this.SetStyle.apply(this, arguments);
        return this;
    };
    Canvas.prototype.SetStrokeStyle = function (r, g, b, a) {
        this.Context.strokeStyle = this.SetStyle.apply(this, arguments);
        return this;
    };
    Canvas.prototype.SetShadowColor = function (r, g, b, a) {
        this.Context.shadowColor = this.SetStyle.apply(this, arguments);
        return this;
    };
    Canvas.prototype.SetStyle = function (r, g, b, a) {
        var style = "#000000";
        if (typeof r === "undefined" && typeof g === "undefined" && typeof b === "undefined" && typeof a === "undefined") {
            // If no parameters are passed reset to black
            style = '#000000';
        }
        else {
            if (typeof a === "undefined") {
                if (typeof g === "undefined" && typeof b === "undefined" && typeof a === "undefined") {
                    // If just string like #000000 set as fillstyle
                    if (r.length == 7) {
                        style = r;
                    }
                    else {
                        style = ['rgba(', parseInt(r[3] + r[4], 16).toString(), ',', parseInt(r[5] + r[6], 16).toString(), ',', parseInt(r[7] + r[8], 16).toString(), ',', parseInt(r[1] + r[2], 16).toString(), ')'].join('');
                    }
                }
                else {
                    if (typeof b === "undefined" && typeof g !== "undefined") {
                        // this should be a hex + alpha as number
                        style = ['rgba(', parseInt(r[1] + r[2], 16).toString(), ',', parseInt(r[3] + r[4], 16).toString(), ',', parseInt(r[5] + r[6], 16).toString(), ',', g.toString(), ')'].join('');
                    }
                    else {
                        // If no alpha is passed, set to fillstyle rgb
                        style = ['rgb(', r.toString(), ',', g.toString(), ',', b.toString(), ')'].join('');
                    }
                }
            }
            else {
                // Set fillstyle to rgba
                style = ['rgba(', r.toString(), ',', g.toString(), ',', b.toString(), ',', a.toString(), ')'].join('');
            }
        }
        return style;
    };
    Canvas.prototype.SetFontStyle = function (style) {
        this.Context.font = style;
        return this;
    };
    Canvas.prototype.SetStrokeWidth = function (width) {
        this.Context.lineWidth = width;
        return this;
    };
    Canvas.prototype.SetShadow = function (offsetx, offsety, blur, color) {
        this.SetShadowOffset(offsetx, offsety);
        this.SetShadowBlur(blur);
        if (typeof color !== "undefined") {
            this.SetShadowColor(color);
        }
        return this;
    };
    Canvas.prototype.SetShadowOffset = function (x, y) {
        this.SetShadowOffsetX(x);
        this.SetShadowOffsetY(y);
        return this;
    };
    Canvas.prototype.SetShadowOffsetX = function (x) {
        this.Context.shadowOffsetX = x;
        return this;
    };
    Canvas.prototype.SetShadowOffsetY = function (y) {
        this.Context.shadowOffsetY = y;
        return this;
    };
    Canvas.prototype.SetShadowBlur = function (blur) {
        this.Context.shadowBlur = blur;
        return this;
    };
    Canvas.prototype.SaveState = function () {
        this.Context.save();
        return this;
    };
    Canvas.prototype.RestoreState = function () {
        this.Context.restore();
        return this;
    };
    Canvas.prototype.Clear = function () {
        this.Context.clearRect(0, 0, this.Element.width, this.Element.height);
        return this;
    };
    Canvas.prototype.DrawRect = function (x, y, width, height) {
        this.Context.fillRect(x | 0, y | 0, width | 0, height | 0);
        return this;
    };
    Canvas.prototype.DrawRectStroke = function (x, y, width, height) {
        this.Context.strokeRect(x | 0, y | 0, width | 0, height | 0);
        return this;
    };
    Canvas.prototype.DrawCircle = function (x, y, radius) {
        this.Context.beginPath();
        this.Context.arc(x | 0, y | 0, radius, 0, Math.PI * 2);
        this.Context.closePath();
        this.Context.fill();
        return this;
    };
    Canvas.prototype.DrawCircleStroke = function (x, y, radius) {
        this.Context.beginPath();
        this.Context.arc(x | 0, y | 0, radius, 0, Math.PI * 2);
        this.Context.closePath();
        this.Context.stroke();
        return this;
    };
    Canvas.prototype.DrawLine = function (x1, y1, x2, y2) {
        this.Context.beginPath();
        this.Context.moveTo(x1 | 0, y1 | 0);
        this.Context.lineTo(x2 | 0, y2 | 0);
        this.Context.stroke();
        return this;
    };
    Canvas.prototype.DrawCanvas = function (canvas, x, y, width, height, targetX, targetY, targetWidth, targetHeight) {
        if (typeof x == 'undefined') {
            this.Context.drawImage(canvas.Element, 0, 0);
        }
        else if (typeof width == 'undefined') {
            this.Context.drawImage(canvas.Element, x | 0, y | 0);
        }
        else if (typeof targetX == 'undefined') {
            this.Context.drawImage(canvas.Element, x | 0, y | 0, width | 0, height | 0);
        }
        else {
            this.Context.drawImage(canvas.Element, x | 0, y | 0, width | 0, height | 0, targetX | 0, targetY | 0, targetWidth | 0, targetHeight | 0);
        }
        return this;
    };
    Canvas.prototype.DrawImage = function (image, x, y, width, height, targetX, targetY, targetWidth, targetHeight) {
        if (typeof x == 'undefined') {
            this.Context.drawImage(image, 0, 0);
        }
        else if (typeof width == 'undefined') {
            this.Context.drawImage(image, x | 0, y | 0);
        }
        else if (typeof targetX == 'undefined') {
            this.Context.drawImage(image, x | 0, y | 0, width | 0, height | 0);
        }
        else {
            this.Context.drawImage(image, x | 0, y | 0, width | 0, height | 0, targetX | 0, targetY | 0, targetWidth | 0, targetHeight | 0);
        }
        return this;
    };
    Canvas.prototype.DrawText = function (text, x, y, maxWidth) {
        if (typeof x === 'undefined') {
            this.Context.fillText(text, 0, 0);
        }
        else if (typeof maxWidth == 'undefined') {
            this.Context.fillText(text, x | 0, y | 0);
        }
        else {
            this.Context.fillText(text, x | 0, y | 0, maxWidth);
        }
        return this;
    };
    Canvas.prototype.DrawTextStroke = function (text, x, y, maxWidth) {
        if (typeof x === 'undefined') {
            this.Context.strokeText(text, 0, 0);
        }
        else if (typeof maxWidth == 'undefined') {
            this.Context.strokeText(text, x | 0, y | 0);
        }
        else {
            this.Context.strokeText(text, x | 0, y | 0, maxWidth);
        }
        return this;
    };
    Canvas.prototype.DrawTextWithBorder = function (text, borderWidth, x, y, maxWidth) {
        this.SaveState();
        this.SetStrokeWidth(borderWidth * 2);
        this.DrawTextStroke(text, x | 0, y | 0, maxWidth);
        this.DrawText(text, x | 0, y | 0, maxWidth);
        this.RestoreState();
        return this;
    };
    Canvas.prototype.DrawTextWithShadow = function (text, shadowoffsetx, shadowoffsety, shadowblur, x, y, maxWidth) {
        this.SaveState();
        this.SetShadow(shadowoffsetx, shadowoffsety, shadowblur);
        this.DrawText(text, x | 0, y | 0, maxWidth);
        this.RestoreState();
        return this;
    };
    Canvas.prototype.Scale = function (x, y) {
        if (y === void 0) { y = x; }
        this.Context.scale(x, y);
        return this;
    };
    return Canvas;
})();
