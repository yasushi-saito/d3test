import * as React from 'react';

interface SelectMarkerProps {
  maxValue: number; // The max valid value. The min value is always 0.
  value: number;  // The value corresponding to mouse click.
  minX: number; // min X coord of the bar
  minY: number; // min Y coord of the bar
  barWidth: number; // width of the bar
  barHeight: number; // height of the bar
}

// A thin bar shown at the point of mouse click.
const SelectMarker : React.SFC<SelectMarkerProps> = (props) => {
  const cX = props.minX + props.barWidth * (props.value / props.maxValue)
  const markerWidth = 3;

  return (<rect x={cX - markerWidth/2} y={props.minY} width={markerWidth} height={props.barHeight} fillOpacity={0.5}
          fill="#943126"/>);
}


interface XAxisProps {
  y: number; // Y coord of the axis
  minX: number; // min X coord of the axis
  width: number; // axis length
  maxValue: number; // the max tick value. The min value is always 0.
}

// Draw the X axis and the tick marks.
const XAxis : React.SFC<XAxisProps> = (props) => {
  const nMajorTicks = 10;
  const nMinorTicksPerMajorTick = 5;
  const majorTickLen = 12;
  const minorTickLen = 6;

  const majorSpacing = props.width / nMajorTicks;
  const minorSpacing = props.width / (nMajorTicks*nMinorTicksPerMajorTick);
  const c: React.ReactNode[] = [];
  for (let i = 0; i <= nMajorTicks; i++) {
    const x = props.minX + i * majorSpacing;
    c.push(<line key={i} x1={x} x2={x} y1={props.y} y2={props.y-majorTickLen} stroke="black" strokeWidth="2"/>);
    const val = props.maxValue * i/nMajorTicks;
    c.push(<text key={`t${i}`} x={x} y={props.y-majorTickLen-3} textAnchor="middle">{val}</text>);
    for (let j = 1; j < nMinorTicksPerMajorTick; j++) {
      const xj = x + j * minorSpacing;
      c.push(<line key={`${i}-${j}`} x1={xj} x2={xj} y1={props.y} y2={props.y-minorTickLen} stroke="black" strokeWidth="2"/>);
    }
  }
  return (<g>
    <line x1={props.minX} x2={props.minX + props.width}
          y1={props.y} y2={props.y} stroke="black" strokeWidth="4"/>
    {c}
          </g>);
}

interface Props {
  currentValue: number;
  maxValue: number;
}

export const TimePicker : React.SFC<Props> = (props) => {
  interface Size {
    height: number;
    width: number;
  };

  const ref = React.useRef<SVGSVGElement>();
  const [canvasSize, setCanvasSize] = React.useState<Size>({height:0,width:0});
  const [select, setSelect] = React.useState<number|null>(null);

  let timer;
  const debounce = (fn: ()=>void) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, 100);
  };

  const minX=10;
  const minY=5;
  let barWidth = Math.max(canvasSize.width - minX*2, 0);
  let barHeight = Math.max(canvasSize.height - minY*2, 0);

  const onClick = (ev) => {
    const cx = ev.nativeEvent.offsetX;
    let val = props.maxValue * (cx - minX) / barWidth;
    if (val < 0) val = 0;
    if (val > props.currentValue) val = props.currentValue;
    setSelect(val);
  }
  const handleResize = () => {
    const canvas = ref.current;
    if (!canvas) return;
    if (canvas.clientWidth != canvasSize.width ||
      canvas.clientHeight != canvasSize.height) {
      debounce(() => {
        setCanvasSize({width: canvas.clientWidth,
                       height: canvas.clientHeight})
      });
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    const canvas = ref.current;
    if (!canvas) return;
    const bbox = canvas.getBoundingClientRect();
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    }
  }, []);


  return (<svg ref={ref} onClick={onClick} width="100%" height="60px" preserveAspectRatio="none">
    <XAxis minX={minX} y={canvasSize.height-15} width={barWidth} maxValue={props.maxValue}/>
    {select !== null ? <SelectMarker
     minX={minX}
     minY={minY}
     maxValue={props.maxValue}
     barHeight={barHeight}
     barWidth={barWidth}
     value={select}/> : null}
    <rect x={minX} y={minY} height={barHeight} fillOpacity={0.2}
          width={barWidth * (props.currentValue/props.maxValue)} fill="#754576"/>
          </svg>);
};
