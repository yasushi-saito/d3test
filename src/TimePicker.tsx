import * as React from 'react';

interface Props {
  max: number;
}

function drawTick(ctx: CanvasRenderingContext2D, x: number, y: number, tickLen, lineWidth: number) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + tickLen);
  ctx.stroke();
}

export const TimePicker : React.SFC<Props> = (props) => {
  const ref = React.useRef<HTMLCanvasElement>();
  const onClick = (ev) => {
    console.log(`CLICK: ${ev.nativeEvent.offsetX} ${ev.nativeEvent.offsetY}`)
  }
  React.useEffect(() => {
    const canvas = ref.current; /* as HTMLCanvasElement;*/
    if (!canvas) return;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    console.log(`WIDTH: ${canvasWidth}:${canvas.width} x ${canvasHeight}:${canvas.height}`);
    if (canvas.width != canvasWidth) {
      canvas.width=canvasWidth;
    }
    if (canvas.height != canvasHeight) {
      canvas.width=canvasWidth;
    }
    const ctx = canvas.getContext("2d");
    console.log(`FONT: ${ctx.font}`);

    const nMinorTicksPerMajorTick = 5;
    const nMajorTicks = 10;
    const majorTickLen = 10;
    const minorTickLen = 5;

    const xPadding = 10;
    const fontName = '18px serif';
    const axisLength = canvasWidth - xPadding*2;
    const axisY = 50;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(xPadding, axisY);
    ctx.lineTo(canvasWidth-xPadding, axisY);
    ctx.stroke();

    const majorSpacing = axisLength / nMajorTicks;
    const minorSpacing = axisLength / (nMajorTicks*nMinorTicksPerMajorTick);

    for (let i = 0; i <= nMajorTicks; i++) {
      const x = xPadding + (i * majorSpacing);
      drawTick(ctx, x, axisY, majorTickLen, 1);

      for (let j=0; j < nMinorTicksPerMajorTick; j++) {
        const xm = x + (j * minorSpacing);
        drawTick(ctx, xm, axisY, minorTickLen, 1);
      }

      ctx.font = fontName;
      ctx.textAlign = 'center';
      ctx.fillText(Math.floor(props.max * i / nMajorTicks).toString(), x, axisY + 20);
    }

    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "blue";
    ctx.fillRect(xPadding,axisY-20,100,20);
  }, [ref.current]);

                            return (<canvas onClick={onClick} ref={ref} width="400" height="100" style={{width:"100%", height:"10%"}}/>);
};
