import { AfterViewInit, Component, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sing-pad',
  templateUrl: './sing-pad.component.html',
  styleUrls: ['./sing-pad.component.scss']
})
export class SingPadComponent implements AfterViewInit {
  @ViewChild('canvas')
  private _canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private paint!: boolean;

  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];

  @HostListener('document:mousedown', ['$event'])
  pressMouseEventHandler(event: MouseEvent) {
    this.pressEventHandler(event);
  }

  @HostListener('document:touchstart', ['$event'])
  pressTouchEventHandler(event: TouchEvent) {
    this.pressEventHandler(event);
  }

  @HostListener('document:mousemove', ['$event'])
  mouseDragEventHandler(event: MouseEvent) {
    this.dragEventHandler(event);
  }

  @HostListener('document:touchmove', ['$event'])
  touchDragEventHandler(event: TouchEvent) {
    this.dragEventHandler(event);
  }

  @HostListener('document:mouseup', ['$event'])
  mouseReleaseEventHandler(event: MouseEvent) {
    this.releaseEventHandler();
  }

  @HostListener('document:touchend', ['$event'])
  touchReleaseEventHandler(event: TouchEvent) {
    this.releaseEventHandler();
  }

  @HostListener('document:mouseout', ['$event'])
  cancelMouseEventHandler() {
    this.cancelEventHandler();
  }

  @HostListener('document:touchcancel', ['$event'])
  cancelTouchEventHandler() {
    this.cancelEventHandler();
  }

  ngAfterViewInit() {
    let context = (this._canvas.nativeElement.getContext('2d'))!;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#506fb3';
    context.lineWidth = 1;

    this.context = context;

    this.redraw();
  }

  constructor() {}

  clear(){
    this.clearCanvas();
  }

  private redraw() {
    let clickX = this.clickX;
    let context = this.context;
    let clickDrag = this.clickDrag;
    let clickY = this.clickY;

    for (let i = 0; i < clickX.length; ++i) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }

      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
    context.closePath();
  }

  private addClick(x: number, y: number, dragging: boolean) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this._canvas.nativeElement.width, this._canvas.nativeElement.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  private clearEventHandler = () => {
    this.clearCanvas();
  };

  private releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
  };

  private cancelEventHandler = () => {
    this.paint = false;
  };

  private pressEventHandler(e: MouseEvent | TouchEvent) {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;

    let canvasPosition = this._canvas.nativeElement.getBoundingClientRect();
    mouseX -= canvasPosition.left;
    mouseY -= canvasPosition.top;

    this.paint = true;
    this.addClick(mouseX, mouseY, false);
    this.redraw();
  }

  private dragEventHandler(e: MouseEvent | TouchEvent) {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;

    let canvasPosition = this._canvas.nativeElement.getBoundingClientRect();
    mouseX -= canvasPosition.left;
    mouseY -= canvasPosition.top;

    if (this.paint) {
      this.addClick(mouseX, mouseY, true);
      this.redraw();
    }
    //console.log(mouseX, mouseY, this.paint);
    e.preventDefault();
  }
}
