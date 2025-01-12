import { Education } from "../models/Education";
import { SourceComponent } from "./SourceComponent";

export const EducationComponent: React.FC<Education> = ({
  attained,
  school,
  yearCompleted,
  link,
}) => {
  return (
    <div>
      <h3>{attained}</h3>
      <p className="opacity-50">{school}</p>
      <p>Completed {yearCompleted}</p>
      <SourceComponent link={link} />
    </div>
  );
};
