import * as React from "react";
import ButtonRecommendedColor from "./ButtonRecommendedColor";
import { dataColorsButtons } from "./data";

interface IRecomendedColorsProps {}

const RecomendedColors: React.FunctionComponent<IRecomendedColorsProps> = (props) => {
  const {} = props;
  return (
    <div className="tile">
      {dataColorsButtons.map((item, index) => (
        <div className="form-group" key={index}>
          <h6 className="text-lg mb-1">{item.name}</h6>
          {item.colors.map((color, idx) => (
            <ButtonRecommendedColor key={idx} {...color} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecomendedColors;
