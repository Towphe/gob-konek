import { Project } from "../models/Project";
import { SourceComponent } from "./SourceComponent";

export const ProjectComponent: React.FC<Project> = ({
  title,
  duration,
  description,
  status,
  link,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{status}</p>
      <p>{description}</p>
      <p>{duration}</p>
      <SourceComponent link={link} />
    </div>
  );
};
