class Canvas {

	public Element: HTMLCanvasElement;
	public Context: CanvasRenderingContext2D;

	constructor(element: HTMLCanvasElement = <HTMLCanvasElement> document.createElement('canvas')) {

		this.Element = element;
		this.Context = this.Element.getContext('2d');
		this.Context.fillStyle = '#000000';
		this.Context.save();
	}

	public GetDimensions(): Object {
		return {
			'Width': this.Element.width,
			'Height': this.Element.height
		};
	}

	public GetWidth(): number {
		return this.Element.width;
	}

	public GetHeight(): number {
		return this.Element.height;
	}

    public SetDimensions(dimension: Object): Canvas;
    public SetDimensions(width: number, height: number): Canvas;
    public SetDimensions(width: any, height: number = width): Canvas {
		if (typeof width == "object") {
			this.Element.width = width.Width;
			this.Element.height = width.Height;
		}
		else {
			this.Element.width = width;
			this.Element.height = height;
        }
        return this;
	}

    public SetWidth(width: number): Canvas {
        this.Element.width = width;
        return this;
	}

    public SetHeight(height: number): Canvas {
        this.Element.height = height;
        return this;
	}

    public SetAlpha(alpha: number): Canvas {
        this.Context.globalAlpha = alpha;
        return this;
	}

	public SetFillStyle(): Canvas;
    public SetFillStyle(r: string): Canvas;
    public SetFillStyle(r: string, a: number): Canvas;
    public SetFillStyle(r: number, g: number, b: number, a?: number): Canvas;
    public SetFillStyle(r?: any, g?: number, b?: number, a?: number): Canvas {
        this.Context.fillStyle = this.SetStyle.apply(this, arguments);
        return this;
	}

    public SetStrokeStyle(): Canvas;
    public SetStrokeStyle(r: string): Canvas;
    public SetStrokeStyle(r: string, a: number): Canvas;
    public SetStrokeStyle(r: number, g: number, b: number, a?: number): Canvas;
    public SetStrokeStyle(r?: any, g?: number, b?: number, a?: number): Canvas {
        this.Context.strokeStyle = this.SetStyle.apply(this, arguments);
        return this;
	}

    public SetShadowColor(): Canvas;
    public SetShadowColor(r: string): Canvas;
    public SetShadowColor(r: string, a: number): Canvas;
    public SetShadowColor(r: number, g: number, b: number, a?: number): Canvas;
    public SetShadowColor(r?: any, g?: number, b?: number, a?: number): Canvas {
        this.Context.shadowColor = this.SetStyle.apply(this, arguments);
        return this;
	}

	private SetStyle(): string;
	private SetStyle(r: string): string;
	private SetStyle(r: string, a: number): string;
	private SetStyle(r: string, g: number, b: number, a?: number): string;
	private SetStyle(r?: any, g?: number, b?: number, a?: number): string {
		var style = "#000000";

		if (typeof r === "undefined" &&
			typeof g === "undefined" &&
			typeof b === "undefined" &&
			typeof a === "undefined") {
			// If no parameters are passed reset to black
			style = '#000000';
		}
		else {
			if (typeof a === "undefined") {
				if (typeof g === "undefined" &&
					typeof b === "undefined" &&
					typeof a === "undefined") {
					// If just string like #000000 set as fillstyle
					if (r.length == 7) {
						style = r;
					}
					else { // support #aarrggbb
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
	}

    public SetFontStyle(style: string): Canvas {
        this.Context.font = style;
        return this;
	}

    public SetStrokeWidth(width: number): Canvas {
        this.Context.lineWidth = width;
        return this;
	}

    public SetShadow(offsetx: number, offsety: number, blur: number, color?: string): Canvas {
		this.SetShadowOffset(offsetx, offsety);
		this.SetShadowBlur(blur);
		if (typeof color !== "undefined") {
			this.SetShadowColor(color);
        }
        return this;
	}

    public SetShadowOffset(x: number, y: number): Canvas {
		this.SetShadowOffsetX(x);
        this.SetShadowOffsetY(y);

        return this;
	}
	
    public SetShadowOffsetX(x: number): Canvas {
        this.Context.shadowOffsetX = x;
        return this;
	}

    public SetShadowOffsetY(y: number): Canvas {
        this.Context.shadowOffsetY = y;
        return this;
	}

    public SetShadowBlur(blur: number): Canvas {
        this.Context.shadowBlur = blur;
        return this;
	}

    public SaveState(): Canvas {
        this.Context.save();
        return this;
	}

    public RestoreState(): Canvas {
        this.Context.restore();
        return this;
	}

    public Clear(): Canvas {
        this.Context.clearRect(0, 0, this.Element.width, this.Element.height);
        return this;
	}

    public DrawRect(x: number, y: number, width: number, height: number): Canvas {
        this.Context.fillRect(x | 0, y | 0, width | 0, height | 0);
        return this;
	}

    public DrawRectStroke(x: number, y: number, width: number, height: number): Canvas {
        this.Context.strokeRect(x | 0, y | 0, width | 0, height | 0);
        return this;
	}

    public DrawCircle(x: number, y: number, radius: number): Canvas {
		this.Context.beginPath();
		this.Context.arc(x | 0, y | 0, radius, 0, Math.PI * 2);
		this.Context.closePath();
        this.Context.fill();
        return this;
	}

    public DrawCircleStroke(x: number, y: number, radius: number): Canvas {
		this.Context.beginPath();
		this.Context.arc(x | 0, y | 0, radius, 0, Math.PI * 2);
		this.Context.closePath();
        this.Context.stroke();
        return this;
	}

    public DrawLine(x1: number, y1: number, x2: number, y2: number): Canvas {
		this.Context.beginPath();
		this.Context.moveTo(x1 | 0, y1 | 0);
		this.Context.lineTo(x2 | 0, y2 | 0);
        this.Context.stroke();
        return this;
	}


    public DrawCanvas(canvas: Canvas): Canvas;
    public DrawCanvas(canvas: Canvas, x: number, y: number): Canvas;
    public DrawCanvas(canvas: Canvas, x: number, y: number, width: number, height: number): Canvas;
    public DrawCanvas(canvas: Canvas, x: number, y: number, width: number, height: number, targetX: number, target: number, targetWidth: number, targetHeight: number): Canvas;
    public DrawCanvas(canvas: Canvas, x?: number, y?: number, width?: number, height?: number, targetX?: number, targetY?: number, targetWidth?: number, targetHeight?: number): Canvas {
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
	}

    public DrawImage(image: HTMLImageElement): Canvas;
    public DrawImage(image: HTMLImageElement, x: number, y: number): Canvas;
    public DrawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): Canvas;
    public DrawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number, targetX: number, targetY: number, targetWidth: number, targetHeight: number): Canvas;
    public DrawImage(image: HTMLImageElement, x?: number, y?: number, width?: number, height?: number, targetX?: number, targetY?: number, targetWidth?: number, targetHeight?: number): Canvas {
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
	}

    public DrawText(text: string): Canvas;
    public DrawText(text: string, x: number, y: number, maxWidth?: number): Canvas;
    public DrawText(text: string, x?: number, y?: number, maxWidth?: number): Canvas {
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
	}

    public DrawTextStroke(text: string): Canvas;
    public DrawTextStroke(text: string, x: number, y: number, maxWidth?: number): Canvas;
    public DrawTextStroke(text: string, x?: number, y?: number, maxWidth?: number): Canvas {
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
	}

    public DrawTextWithBorder(text: string, borderWidth: number): Canvas;
    public DrawTextWithBorder(text: string, borderWidth: number, x: number, y: number, maxWidth?: number): Canvas;
    public DrawTextWithBorder(text: string, borderWidth: number, x?: number, y?: number, maxWidth?: number): Canvas {
		this.SaveState();
		this.SetStrokeWidth(borderWidth * 2);
		this.DrawTextStroke(text, x | 0, y | 0, maxWidth);
		this.DrawText(text, x | 0, y | 0, maxWidth);
        this.RestoreState();
        return this;
	}

    public DrawTextWithShadow(text: string, shadowoffsetx: number, shadowoffsety: number, shadowblur: number, x?: number, y?: number, maxWidth?: number): Canvas {
		this.SaveState();
		this.SetShadow(shadowoffsetx, shadowoffsety, shadowblur);
		this.DrawText(text, x | 0, y | 0, maxWidth);
        this.RestoreState();
        return this;
	}

    public Scale(scale: number): Canvas;
    public Scale(x: number, y: number = x): Canvas {
        this.Context.scale(x, y);
        return this;
	}
	
}
