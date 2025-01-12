import { Legislation } from "../models/Legislation";
import { SourceComponent } from "./SourceComponent";

export const LegislationComponent: React.FC<Legislation> = ({
  title,
  status,
  description,
  dateFiled,
  link,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{status}</p>
      <p>{description}</p>
      <p>Filed on ${dateFiled.toString()}</p>
      <SourceComponent link={link} />
    </div>
  );
};
