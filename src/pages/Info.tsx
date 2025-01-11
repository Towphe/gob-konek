import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Translation {
  English: string;
  Filipino: string;
  Cebuano: string;
  Waray: string;
  Hiligaynon: string;
}

interface Career {
  title: string;
  duration: string;
  description: string;
  link: string;
}

interface PoliticalRelative {
  name: string;
  relation: string;
  currentPosition: string;
  link: string;
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
  link: string;
}

// HS diploma, vocational, bachelor's degree, etc.
interface Education {
  attained: string;
  school: string;
  yearCompleted: string;
  link: string;
}

interface Project {
  title: string;
  duration: string;
  description: string;
  status: string;
  link: string;
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

interface LinkWrapper {
  link: string;
}

const backTranslation: Translation = {
  English: "Go Back",
  Filipino: "Mag-search Ulit",
  Cebuano: "Mag-search Liwat",
  Waray: "Mag-search Utro",
  Hiligaynon: "Mag-search Liwat",
};

const SourceComponent: React.FC<LinkWrapper> = ({ link }) => {
  return (
    <p>
      <a
        onClick={() => window.location.replace(link)}
        className="flex items-end gap-1.5"
      >
        <span className="block h-4">Source</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </a>
    </p>
  );
};

const CareerComponent: React.FC<Career> = ({
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

const PoliticalDynastyComponent: React.FC<PoliticalRelative> = ({
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

const LegislationComponent: React.FC<Legislation> = ({
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
      <SourceComponent link={link} />
    </div>
  );
};

const ProjectComponent: React.FC<Project> = ({
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

const EducationComponent: React.FC<Education> = ({
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

const Info: React.FC = () => {
  const [summary, setSummary] = useState<Summary | undefined>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("isDarkMode") === "false" ? false : true,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") ?? "English",
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("s");
  const province = queryParams.get("p");
  const city = queryParams.get("m");
  const language = queryParams.get("l");
  const languageOptions: string[] = [
    "English",
    "Filipino",
    "Cebuano",
    "Waray",
    "Hiligaynon",
  ];
  const apiUrl: string = "https://lean-tech-api.vercel.app/retrieve/summary";

  useEffect(() => {
    document.body.setAttribute("data-theme", !isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    console.log([name, province, city, language]);

    if (!province) {
      fetch(apiUrl.concat(`?name=${name}`), {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    // retrieve from API
    // setSummary({
    //   commonName: "Juan dela Cruz",
    //   legalName: "Juan Carlos dela Cruz",
    //   description:
    //     "A prominent leader in local politics dedicated to community development and environmental sustainability.",
    //   careers: [
    //     {
    //       title: "Mayor of San Isidro",
    //       duration: "2016 - Present",
    //       description:
    //         "Elected to lead the city, focusing on economic growth and community initiatives.",
    //       link: "www.example.com",
    //     },
    //     {
    //       title: "City Councilor of San Isidro",
    //       duration: "2010 - 2016",
    //       description:
    //         "Developed policies and legislation aimed at improving local infrastructure and public services.",
    //       link: "www.example.com",
    //     },
    //   ],
    //   dynasty: [
    //     {
    //       name: "Maria dela Cruz",
    //       relation: "Mother",
    //       currentPosition: "Former Governor of San Isidro",
    //       link: "www.example.com",
    //     },
    //     {
    //       name: "Jose dela Cruz",
    //       relation: "Uncle",
    //       currentPosition: "Former Senator",
    //       link: "www.example.com",
    //     },
    //   ],
    //   legislations: [
    //     {
    //       title: "San Isidro Urban Development Act",
    //       status: "Passed",
    //       description:
    //         "Legislation aimed at enhancing urban infrastructure and housing projects in San Isidro.",
    //       dateFiled: new Date("2022-03-15"),
    //       link: "www.example.com",
    //     },
    //     {
    //       title: "Public Health Improvement Bill",
    //       status: "Pending",
    //       description:
    //         "A bill focused on increasing funding for healthcare facilities in the district.",
    //       dateFiled: new Date("2023-01-10"),
    //       link: "www.example.com",
    //     },
    //   ],
    //   education: [
    //     {
    //       attained: "Bachelor's Degree",
    //       school: "University of San Isidro",
    //       yearCompleted: "2005-04-15",
    //       link: "www.example.com",
    //     },
    //     {
    //       attained: "High School Diploma",
    //       school: "San Isidro High School",
    //       yearCompleted: "2001-05-30",
    //       link: "www.example.com",
    //     },
    //   ],
    //   cases: [
    //     {
    //       title: "Corruption Allegations",

    //       description:
    //         "Investigation into alleged misuse of public funds during the mayoral campaign.",

    //       dateFiled: "2022-05-01",

    //       link: "https://example.com/cases/corruption-allegations",
    //     },

    //     {
    //       title: "Environmental Violation Case",

    //       description:
    //         "Case filed against the city for failing to comply with environmental regulations.",

    //       dateFiled: "2023-02-20",

    //       link: "https://example.com/cases/environmental-violation",
    //     },
    //   ],
    //   projects: [
    //     {
    //       title: "Community Clean-Up Initiative",
    //       duration: "2021 - Present",
    //       description:
    //         "A project aimed at improving cleanliness and environmental awareness in San Isidro.",
    //       status: "Ongoing",
    //       link: "www.example.com",
    //     },
    //     {
    //       title: "Youth Empowerment Program",
    //       duration: "2018 - 2020",
    //       description:
    //         "A program designed to provide skills training and leadership opportunities for the youth in the community.",
    //       status: "Completed",
    //       link: "www.example.com",
    //     },
    //   ],
    // });
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      localStorage.setItem("isDarkMode", "false");
    } else {
      localStorage.setItem("isDarkMode", "true");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          className={isDarkMode === true ? "bg-[#F2F2F2]" : "bg-[#333333]"}
        >
          <IonToggle
            aria-label="Dark toggle"
            color="dark"
            onIonChange={() => toggleDarkMode()}
            checked={!isDarkMode}
            slot="start"
            className="toggle-small"
          />
          <IonTitle>gob.konek</IonTitle>
          <IonSelect
            slot="end"
            onIonChange={(event) => {
              setSelectedLanguage(event.detail.value);
              localStorage.setItem("language", event.detail.value);
            }}
            value={selectedLanguage}
            className="text-xs"
            interface="popover"
          >
            {languageOptions.map((l) => (
              <IonSelectOption key={l} value={l}>
                {l}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="flex flex-col justify-center items-center text-sm py-10">
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-3">
            <a href="/" className="text-blue-500 text-lg">
              {backTranslation[selectedLanguage]}
            </a>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/* summary */}
            <h1 className="text-4xl mb-2">{summary?.commonName}</h1>
            <p className="text-justify indent-4">{summary?.description}</p>
          </div>

          <IonAccordionGroup className="w-[90vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] ">
            <IonAccordion
              value="career"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Career</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.careers.map((c) => (
                    <CareerComponent
                      key={summary?.careers.indexOf(c)}
                      title={c.title}
                      duration={c.duration}
                      description={c.description}
                      link={c.link}
                    />
                  ))}
                </div>
              </div>
            </IonAccordion>
            <IonAccordion
              value="dynasty"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Relatives in Politics</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.dynasty.map((d) => (
                    <PoliticalDynastyComponent
                      key={summary.dynasty.indexOf(d)}
                      name={d.name}
                      relation={d.relation}
                      currentPosition={d.currentPosition}
                      link={d.link}
                    />
                  ))}
                </div>
              </div>
            </IonAccordion>
            <IonAccordion
              value="legislation"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Legislations</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.legislations.map((l) => (
                    <LegislationComponent
                      key={summary.legislations.indexOf(l)}
                      title={l.title}
                      status={l.status}
                      description={l.description}
                      dateFiled={l.dateFiled}
                      link={l.link}
                    />
                  ))}
                </div>
              </div>
            </IonAccordion>
            <IonAccordion
              value="projects"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Projects</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.projects.map((p) => (
                    <ProjectComponent
                      key={summary.projects.indexOf(p)}
                      title={p.title}
                      status={p.status}
                      description={p.description}
                      duration={p.duration}
                      link={p.link}
                    />
                  ))}
                </div>
              </div>
            </IonAccordion>
            <IonAccordion
              value="cases"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Cases</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
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
            </IonAccordion>
            <IonAccordion
              value="education"
              className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl"
            >
              <IonItem slot="header">
                <IonLabel>Education</IonLabel>
              </IonItem>
              <div className="w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.education.map((s) => (
                    <EducationComponent
                      key={summary.education.indexOf(s)}
                      attained={s.attained}
                      yearCompleted={s.yearCompleted}
                      school={s.school}
                      link={s.link}
                    />
                  ))}
                </div>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
          <div className=" mb-4 bg-gray-700 bg-opacity-30 rounded-xl">
            {/*  */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Info;
