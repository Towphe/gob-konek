import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

interface Career {
  title: string;
  duration: string;
  description: string;
}

interface PoliticalRelative {
  name: string;
  relation: string;
  currentPosition: string;
}

interface Case {
  title: string;
  description: string;
  dateFiled: string;
  link: string;
}

interface Legislation {
  title: string;
  status: string;
  description: string;
  dateFiled: Date;
}

// HS diploma, vocational, bachelor's degree, etc.
interface Education {
  attained: string;
  school: string;
  yearCompleted: string;
}

interface Project {
  title: string;
  duration: string;
  description: string;
  status: string;
}

interface Summary {
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

const CareerComponent: React.FC<Career> = ({
  title,
  duration,
  description,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{duration}</p>
      <p>{description}</p>
    </div>
  );
};

const PoliticalDynastyComponent: React.FC<PoliticalRelative> = ({
  name,
  relation,
  currentPosition,
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <p className="opacity-50">{relation}</p>
      <p>{currentPosition}</p>
    </div>
  );
};

const LegislationComponent: React.FC<Legislation> = ({
  title,
  status,
  description,
  dateFiled,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{status}</p>
      <p>{description}</p>
      <p>Filed on ${dateFiled.toString()}</p>
    </div>
  );
};

const CaseComponent: React.FC<Case> = ({
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
      <p>Source: ${link}</p>
    </div>
  );
};

const ProjectComponent: React.FC<Project> = ({
  title,
  duration,
  description,
  status,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-50">{status}</p>
      <p>{description}</p>
      <p>{duration}</p>
    </div>
  );
};

const EducationComponent: React.FC<Education> = ({
  attained,
  school,
  yearCompleted,
}) => {
  return (
    <div>
      <h3>{attained}</h3>
      <p className="opacity-50">{school}</p>
      <p>Completed {yearCompleted}</p>
    </div>
  );
};

const Info: React.FC = () => {
  const [summary, setSummary] = useState<Summary | undefined>();

  useEffect(() => {
    setSummary({
      commonName: "Juan dela Cruz",
      legalName: "Juan Carlos dela Cruz",
      description:
        "A prominent leader in local politics dedicated to community development and environmental sustainability.",
      careers: [
        {
          title: "Mayor of San Isidro",
          duration: "2016 - Present",
          description:
            "Elected to lead the city, focusing on economic growth and community initiatives.",
        },
        {
          title: "City Councilor of San Isidro",
          duration: "2010 - 2016",
          description:
            "Developed policies and legislation aimed at improving local infrastructure and public services.",
        },
      ],
      dynasty: [
        {
          name: "Maria dela Cruz",
          relation: "Mother",
          currentPosition: "Former Governor of San Isidro",
        },
        {
          name: "Jose dela Cruz",
          relation: "Uncle",
          currentPosition: "Former Senator",
        },
      ],
      legislations: [
        {
          title: "San Isidro Urban Development Act",
          status: "Passed",
          description:
            "Legislation aimed at enhancing urban infrastructure and housing projects in San Isidro.",
          dateFiled: new Date("2022-03-15"),
        },
        {
          title: "Public Health Improvement Bill",
          status: "Pending",
          description:
            "A bill focused on increasing funding for healthcare facilities in the district.",
          dateFiled: new Date("2023-01-10"),
        },
      ],
      education: [
        {
          attained: "Bachelor's Degree",
          school: "University of San Isidro",
          yearCompleted: "2005-04-15",
        },
        {
          attained: "High School Diploma",
          school: "San Isidro High School",
          yearCompleted: "2001-05-30",
        },
      ],
      cases: [
        {
          title: "Corruption Allegations",

          description:
            "Investigation into alleged misuse of public funds during the mayoral campaign.",

          dateFiled: "2022-05-01",

          link: "https://example.com/cases/corruption-allegations",
        },

        {
          title: "Environmental Violation Case",

          description:
            "Case filed against the city for failing to comply with environmental regulations.",

          dateFiled: "2023-02-20",

          link: "https://example.com/cases/environmental-violation",
        },
      ],
      projects: [
        {
          title: "Community Clean-Up Initiative",
          duration: "2021 - Present",
          description:
            "A project aimed at improving cleanliness and environmental awareness in San Isidro.",
          status: "Ongoing",
        },
        {
          title: "Youth Empowerment Program",
          duration: "2018 - 2020",
          description:
            "A program designed to provide skills training and leadership opportunities for the youth in the community.",
          status: "Completed",
        },
      ],
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>gob.konek</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="flex flex-col justify-center items-center text-sm py-10">
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-3">
            <a href="/" className="text-blue-500 text-lg">
              Go Back
            </a>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/* summary */}
            <h1 className="text-4xl mb-2">{summary?.commonName}</h1>
            <p className="text-justify indent-4">{summary?.description}</p>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/* Careers */}
            <h2 className="font-bold mb-1">Career</h2>
            <div className="flex flex-col gap-3">
              {summary?.careers.map((c) => (
                <CareerComponent
                  key={summary?.careers.indexOf(c)}
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                />
              ))}
            </div>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            <h2 className="font-bold mb-1">Relatives in Politics</h2>
            <div className="flex flex-col gap-3">
              {summary?.dynasty.map((d) => (
                <PoliticalDynastyComponent
                  key={summary.dynasty.indexOf(d)}
                  name={d.name}
                  relation={d.relation}
                  currentPosition={d.currentPosition}
                />
              ))}
            </div>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/*  */}
            <h2 className="font-bold mb-1">Legislations</h2>
            <div className="flex flex-col gap-3">
              {summary?.legislations.map((l) => (
                <LegislationComponent
                  key={summary.legislations.indexOf(l)}
                  title={l.title}
                  status={l.status}
                  description={l.description}
                  dateFiled={l.dateFiled}
                />
              ))}
            </div>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/*  */}
            <h2 className="font-bold mb-1">Projects</h2>
            <div className="flex flex-col gap-3">
              {summary?.projects.map((p) => (
                <ProjectComponent
                  key={summary.projects.indexOf(p)}
                  title={p.title}
                  status={p.status}
                  description={p.description}
                  duration={p.duration}
                />
              ))}
            </div>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/*  */}
            <h2 className="font-bold mb-1">Projects</h2>
            <div className="flex flex-col gap-3">
              {summary?.cases.map((c) => (
                <CaseComponent
                  key={summary.cases.indexOf(c)}
                  title={c.title}
                  dateFiled={c.dateFiled}
                  description={c.description}
                  link={c.link}
                />
              ))}
            </div>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/*  */}
            <h2 className="font-bold mb-1">Projects</h2>
            <div className="flex flex-col gap-3">
              {summary?.education.map((s) => (
                <EducationComponent
                  key={summary.education.indexOf(s)}
                  attained={s.attained}
                  yearCompleted={s.yearCompleted}
                  school={s.school}
                />
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Info;
