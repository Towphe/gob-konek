import { Career } from "../models/Career";
import { SourceComponent } from "./SourceComponent";

export const CareerComponent: React.FC<Career> = ({
  title,
  duration,
  description,
  link,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{duration}</p>
      <p>{description}</p>
      <SourceComponent link={link} />
    </div>
  );
};
