import * as React from 'react';
import * as d3 from 'd3';

export const Stuff : React.SFC<{}> = () => {
  const ref = React.useRef();

  React.useEffect(() => {
    const arcPathGenerator = d3.arc()
          .cornerRadius(0);
    const arcPath = arcPathGenerator({
      innerRadius: 25,
      outerRadius: 40,
      startAngle: 0,
      endAngle: 3.14
    });
    const elem = d3.select(ref.current);
    elem.append("path")
      .attr("fill", "cornflowerblue")
      .attr("d", arcPath)
      .attr("style", "transform: translate(50%, 50%)");
  }, []);

  return (
    <svg ref={ref}
    />);

};
