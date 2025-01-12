import { Career } from "./Career";
import { Case } from "./Case";
import { Education } from "./Education";
import { Legislation } from "./Legislation";
import { PoliticalRelative } from "./PoliticalRelative";
import { Project } from "./Project";

export interface Summary {
  commonName: string;
  legalName: string;
  description: string;
  careers: Career[];
  cases: Case[];
  dynasty: PoliticalRelative[];
  legislations: Legislation[];
  education: Education[];
  projects: Project[];
}
