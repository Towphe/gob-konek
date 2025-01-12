import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { arrowDown, arrowUp } from "ionicons/icons";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/DarkMode";
import { Career } from "../models/Career";
import { Case } from "../models/Case";
import { Education } from "../models/Education";
import { Legislation } from "../models/Legislation";
import { PoliticalRelative } from "../models/PoliticalRelative";
import { Project } from "../models/Project";
import { Summary } from "../models/Summary";
import { Translation } from "../models/Translation";
import { useLocation } from "react-router";
import { CareerComponent } from "../components/CareerComponent";
import { PoliticalDynastyComponent } from "../components/PoliticalDynastyComponent";
import { LegislationComponent } from "../components/LegislationComponent";
import { ProjectComponent } from "../components/ProjectComponent";
import { CaseComponent } from "../components/CaseComponent";
import { EducationComponent } from "../components/EducationComponent";

const Comparison: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") ?? "English",
  );
  const [selectedView, setSelectedView] = useState<string>("person1");
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name1 = queryParams.get("name1");
  const name2 = queryParams.get("name2");
  const [summary1, setSummary1] = useState<Summary>();
  const [summary2, setSummary2] = useState<Summary>();
  const [selectedComparison, setSelectedComparison] = useState<
    string | undefined
  >(undefined);

  const [isComparisonOptionsToggled, toggleComparisonOptions] =
    useState<boolean>(false);

  const languageOptions: string[] = [
    "English",
    "Filipino",
    "Cebuano",
    "Waray",
    "Hiligaynon",
  ];

  const backTranslation: Translation = {
    English: "Go Back",
    Filipino: "Bumalik",
    Cebuano: "Bumalik",
    Hiligaynon: "Bumalik",
    Waray: "Bumalik",
  };

  interface comparisonParameter {
    summary1: Summary | undefined;
    summary2: Summary | undefined;
    criteria: string;
  }

  const ComparisonView: React.FC<comparisonParameter> = ({
    summary1,
    summary2,
    criteria,
  }) => {
    console.log("Hello");
    if (!summary1 || !summary2) {
      window.location.replace("/");
      return;
    }

    if (
      [
        "projects",
        "education",
        "legislations",
        "dynasties",
        "cases",
        "careers",
      ].indexOf(criteria.toLowerCase()) === -1
    ) {
      // not found
      // redirect/return
      return;
    }

    // match criteria

    return (
      <div className="flex flex-col justify-between items-start w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw]">
        <div>
          {/* Politician 1 */}
          {/* common name, given name */}
          <h2 className="text-2xl mb-2 font-semibold">{summary1.commonName}</h2>
          <div className="flex flex-col gap-3">
            {criteria !== "careers" ? (
              <></>
            ) : (
              summary1.careers.map((c) => (
                <CareerComponent
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "careers" ? (
              <></>
            ) : (
              summary1.dynasty.map((d) => (
                <PoliticalDynastyComponent
                  name={d.title}
                  relation={d.relation}
                  currentPosition={d.currentPosition}
                  link={d.link}
                />
              ))
            )}
            {criteria !== "legislations" ? (
              <></>
            ) : (
              summary1.legislations.map((l) => (
                <LegislationComponent
                  title={l.title}
                  status={l.status}
                  description={l.description}
                  dateFiled={l.dateFiled}
                  link={l.link}
                />
              ))
            )}
            {criteria !== "projects" ? (
              <></>
            ) : (
              summary1.projects.map((c) => (
                <ProjectComponent
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  status={c.status}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "cases" ? (
              <></>
            ) : (
              summary1.cases.map((c) => (
                <CaseComponent
                  title={c.title}
                  description={c.description}
                  dateFiled={c.dateFiled}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "education" ? (
              <></>
            ) : (
              summary1.education.map((e) => (
                <EducationComponent
                  attained={e.attained}
                  school={e.school}
                  yearCompleted={e.yearCompleted}
                  link={e.link}
                />
              ))
            )}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-8 mx-auto my-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
        <div>
          {/* Politician 2 */}
          {/* common name, given name */}
          <h2 className="text-2xl mb-2 font-semibold">{summary2.commonName}</h2>
          <div className="flex flex-col gap-3">
            {criteria !== "careers" ? (
              <></>
            ) : (
              summary2.careers.map((c) => (
                <CareerComponent
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "careers" ? (
              <></>
            ) : (
              summary2.dynasty.map((d) => (
                <PoliticalDynastyComponent
                  name={d.title}
                  relation={d.relation}
                  currentPosition={d.currentPosition}
                  link={d.link}
                />
              ))
            )}
            {criteria !== "legislations" ? (
              <></>
            ) : (
              summary2.legislations.map((l) => (
                <LegislationComponent
                  title={l.title}
                  status={l.status}
                  description={l.description}
                  dateFiled={l.dateFiled}
                  link={l.link}
                />
              ))
            )}
            {criteria !== "projects" ? (
              <></>
            ) : (
              summary2.projects.map((c) => (
                <ProjectComponent
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  status={c.status}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "cases" ? (
              <></>
            ) : (
              summary2.cases.map((c) => (
                <CaseComponent
                  title={c.title}
                  description={c.description}
                  dateFiled={c.dateFiled}
                  link={c.link}
                />
              ))
            )}
            {criteria !== "education" ? (
              <></>
            ) : (
              summary2.education.map((e) => (
                <EducationComponent
                  attained={e.attained}
                  school={e.school}
                  yearCompleted={e.yearCompleted}
                  link={e.link}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log([name1, name2]);

    setSummary1({
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
          link: "www.example.com",
        },
        {
          title: "City Councilor of San Isidro",
          duration: "2010 - 2016",
          description:
            "Developed policies and legislation aimed at improving local infrastructure and public services.",
          link: "www.example.com",
        },
      ],
      dynasty: [
        {
          name: "Maria dela Cruz",
          relation: "Mother",
          currentPosition: "Former Governor of San Isidro",
          link: "www.example.com",
        },
        {
          name: "Jose dela Cruz",
          relation: "Uncle",
          currentPosition: "Former Senator",
          link: "www.example.com",
        },
      ],
      legislations: [
        {
          title: "San Isidro Urban Development Act",
          status: "Passed",
          description:
            "Legislation aimed at enhancing urban infrastructure and housing projects in San Isidro.",
          dateFiled: new Date("2022-03-15"),
          link: "www.example.com",
        },
        {
          title: "Public Health Improvement Bill",
          status: "Pending",
          description:
            "A bill focused on increasing funding for healthcare facilities in the district.",
          dateFiled: new Date("2023-01-10"),
          link: "www.example.com",
        },
      ],
      education: [
        {
          attained: "Bachelor's Degree",
          school: "University of San Isidro",
          yearCompleted: "2005-04-15",
          link: "www.example.com",
        },
        {
          attained: "High School Diploma",
          school: "San Isidro High School",
          yearCompleted: "2001-05-30",
          link: "www.example.com",
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
          link: "www.example.com",
        },
        {
          title: "Youth Empowerment Program",
          duration: "2018 - 2020",
          description:
            "A program designed to provide skills training and leadership opportunities for the youth in the community.",
          status: "Completed",
          link: "www.example.com",
        },
      ],
    });

    setSummary2({
      commonName: "Juan Perez",
      legalName: "Juan Pedro Perez",
      description:
        "A prominent leader in local politics dedicated to community development and environmental sustainability.",
      careers: [
        {
          title: "Mayor of San Isidro",
          duration: "2016 - Present",
          description:
            "Elected to lead the city, focusing on economic growth and community initiatives.",
          link: "www.example.com",
        },
        {
          title: "City Councilor of San Isidro",
          duration: "2010 - 2016",
          description:
            "Developed policies and legislation aimed at improving local infrastructure and public services.",
          link: "www.example.com",
        },
      ],
      dynasty: [
        {
          name: "Maria dela Cruz",
          relation: "Mother",
          currentPosition: "Former Governor of San Isidro",
          link: "www.example.com",
        },
        {
          name: "Jose dela Cruz",
          relation: "Uncle",
          currentPosition: "Former Senator",
          link: "www.example.com",
        },
      ],
      legislations: [
        {
          title: "San Isidro Urban Development Act",
          status: "Passed",
          description:
            "Legislation aimed at enhancing urban infrastructure and housing projects in San Isidro.",
          dateFiled: new Date("2022-03-15"),
          link: "www.example.com",
        },
        {
          title: "Public Health Improvement Bill",
          status: "Pending",
          description:
            "A bill focused on increasing funding for healthcare facilities in the district.",
          dateFiled: new Date("2023-01-10"),
          link: "www.example.com",
        },
      ],
      education: [
        {
          attained: "Bachelor's Degree",
          school: "University of San Isidro",
          yearCompleted: "2005-04-15",
          link: "www.example.com",
        },
        {
          attained: "High School Diploma",
          school: "San Isidro High School",
          yearCompleted: "2001-05-30",
          link: "www.example.com",
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
          link: "www.example.com",
        },
        {
          title: "Youth Empowerment Program",
          duration: "2018 - 2020",
          description:
            "A program designed to provide skills training and leadership opportunities for the youth in the community.",
          status: "Completed",
          link: "www.example.com",
        },
      ],
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonToggle
            aria-label="Dark toggle"
            color="dark"
            onIonChange={() => setIsDarkMode(!isDarkMode)}
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
        <div
          className={`${selectedView === "compare" ? "hidden" : "block"} bg-blue-901 flex flex-col justify-center items-center text-sm py-10`}
        >
          <div
            className={`h-full w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-3`}
          >
            <a href="/" className={"text-blue-500 text-lg"}>
              {backTranslation[selectedLanguage]}
            </a>
          </div>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-4">
            {/* summary */}
            <h1 className="text-4xl mb-2">
              {(selectedView === "person1" ? summary1 : summary2)?.commonName}
            </h1>
            <p className="text-justify indent-4">
              {(selectedView === "person1" ? summary1 : summary2)?.description}
            </p>
          </div>

          <IonAccordionGroup className="w-[90vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] ">
            <IonAccordion value="career" className=" mb-4 rounded-xl">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Career</IonLabel>
              </IonItem>
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.careers.map((c) => (
                    <CareerComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      )?.careers.indexOf(c)}
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
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.dynasty.map((d) => (
                    <PoliticalDynastyComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      ).dynasty.indexOf(d)}
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
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.legislations.map((l) => (
                    <LegislationComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      ).legislations.indexOf(l)}
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
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.projects.map((p) => (
                    <ProjectComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      ).projects.indexOf(p)}
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
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.cases.map((c) => (
                    <CaseComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      ).cases.indexOf(c)}
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
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {(selectedView === "person1"
                    ? summary1
                    : summary2
                  )?.education.map((s) => (
                    <EducationComponent
                      key={(selectedView === "person1"
                        ? summary1
                        : summary2
                      ).education.indexOf(s)}
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
          {/* <IonLoading
            spinner="circular"
            isOpen={isLoading}
            showBackdrop={true}
          /> */}
        </div>

        <div
          className={`${selectedView === "compare" ? "block" : "hidden"} bg-blue-901 flex flex-col justify-center items-center text-sm py-10`}
        >
          {selectedComparison !== "careers" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="careers"
            />
          )}
          {selectedComparison !== "dynasties" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="dynasties"
            />
          )}
          {selectedComparison !== "cases" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="cases"
            />
          )}
          {selectedComparison !== "legislations" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="legislations"
            />
          )}
          {selectedComparison !== "education" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="education"
            />
          )}
          {selectedComparison !== "projects" ? (
            <></>
          ) : (
            <ComparisonView
              summary1={summary1}
              summary2={summary2}
              criteria="projects"
            />
          )}
        </div>
      </IonContent>
      <IonSelect
        interface="popover"
        onIonChange={(event) => {
          setSelectedComparison(event.detail.value);
        }}
        className={selectedView === "compare" ? "block" : "hidden"}
        placeholder="Select fields"
      >
        <IonSelectOption value="careers">Career</IonSelectOption>
        <IonSelectOption value="dynasties">Dynasty</IonSelectOption>
        <IonSelectOption value="legislations">Legislations</IonSelectOption>
        <IonSelectOption value="projects">Projects</IonSelectOption>
        <IonSelectOption value="cases">Cases</IonSelectOption>
        <IonSelectOption value="education">Education</IonSelectOption>
      </IonSelect>
      <IonSegment
        onIonChange={(e) => {
          console.log(e.detail.value);
          setSelectedView(e.detail.value);
        }}
        value={selectedView}
      >
        <IonSegmentButton value="person1">
          <IonLabel>Person 1</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="person2">
          <IonLabel>Person 2</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="compare">
          <IonLabel>Comparison</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonPage>
  );
};

export default Comparison;
