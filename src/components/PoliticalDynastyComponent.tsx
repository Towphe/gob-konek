import { PoliticalRelative } from "../models/PoliticalRelative";
import { SourceComponent } from "./SourceComponent";

export const PoliticalDynastyComponent: React.FC<PoliticalRelative> = ({
  name,
  relation,
  currentPosition,
  link,
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <p className="opacity-50">{relation}</p>
      <p>{currentPosition}</p>
      <SourceComponent link={link} />
    </div>
  );
};
