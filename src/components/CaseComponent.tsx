import { Case } from "../models/Case";
import { SourceComponent } from "./SourceComponent";

export const CaseComponent: React.FC<Case> = ({
  title,
  description,
  dateFiled,
  link,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{description}</p>
      <p>Filed on ${dateFiled.toString()}</p>
      <SourceComponent link={link} />
    </div>
  );
};
