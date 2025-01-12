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
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowDown, arrowUp, search } from "ionicons/icons";
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
import { LanguageGoogleEquivalent } from "../models/GLanguage";

const ComparisonView: React.FC<comparisonParameter> = ({
  summary1,
  summary2,
  criteria,
}) => {
  const apiUrl: string = "https://2580-203-190-81-229.ngrok-free.app/compare";

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
          ) : summary1.careers === undefined ||
            summary1.careers.length === 0 ? (
            <p>No careers found.</p>
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
          {criteria !== "dynasty" ? (
            <></>
          ) : summary1.dynasty === undefined ||
            summary1.dynasty.length === 0 ? (
            <p>No relatives in politics found.</p>
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
          ) : summary1.legislations === undefined ||
            summary1.legislations.length === 0 ? (
            <p>No legislation found.</p>
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
          ) : summary1.projects === undefined ||
            summary1.projects.legnth === 0 ? (
            <p>No projects found</p>
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
          ) : summary1.cases === undefined || summary1.cases.length === 0 ? (
            <p>No cases found</p>
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
          ) : summary1.education === undefined ||
            summary1.education.length === 0 ? (
            <p>No education found</p>
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
          ) : summary2.careers === undefined ||
            summary2.careers.length === 0 ? (
            <p>No careers found.</p>
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
          {criteria !== "dynasty" ? (
            <></>
          ) : summary2.dynasty === undefined ||
            summary2.dynasty.length === 0 ? (
            <p>No relatives in politics found.</p>
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
          ) : summary2.legislations === undefined ||
            summary2.legislations.length === 0 ? (
            <p>No legislation found.</p>
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
          ) : summary2.projects === undefined ||
            summary2.projects.legnth === 0 ? (
            <p>No projects found</p>
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
          ) : summary2.cases === undefined || summary2.cases.length === 0 ? (
            <p>No cases found</p>
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
          ) : summary2.education === undefined ||
            summary2.education.length === 0 ? (
            <p>No education found</p>
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

  const languageMapping: LanguageGoogleEquivalent = {
    English: "EN",
    Filipino: "FIL",
    Cebuano: "CEB",
    Hiligaynon: "HIL",
  };

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

  useIonViewWillEnter(() => {
    const apiUrl = "https://lean-tech-api.vercel.app";
    let searchQuery = `compare?name1=${name1}&name2=${name2}`;

    // console.log("Here");
    fetch(apiUrl.concat(searchQuery), {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": 69420,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (selectedLanguage === English) {
          setSummary1({
            commonName: data.data[0].commonName,
            legalName: data.data[0].legalName,
            description: data.data[0].description.desc,
            careers: data.data[0].careers.careers,
            cases: data.data[0].cases.cases,
            legislations: data.data[0].legislations.legislations,
            projects: data.data[0].projects.projects,
            education: data.data[0].education.education,
          });
          setSummary2({
            commonName: data.data[1].commonName,
            legalName: data.data[1].legalName,
            description: data.data[1].description.desc,
            careers: data.data[1].careers.careers,
            cases: data.data[1].cases.cases,
            legislations: data.data[1].legislations.legislations,
            projects: data.data[1].projects.projects,
            education: data.data[1].education.education,
          });
          return;
        }

        fetch(`${apiUrl}/translate`, {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": 69420,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            to_translate: data.data[0],
            target_language: languageMapping[selectedLanguage],
          }),
        })
          .then((res) => res.json())
          .then((d) => {
            setSummary1({
              commonName: d.data[0].commonName,
              legalName: d.data[0].legalName,
              description: d.data[0].description.desc,
              careers: d.data[0].careers.careers,
              cases: d.data[0].cases.cases,
              legislations: d.data[0].legislations.legislations,
              projects: d.data[0].projects.projects,
              education: d.data[0].education.education,
            });
          });

        fetch(`${apiUrl}/translate`, {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": 69420,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            to_translate: data.data[1],
            target_language: languageMapping[selectedLanguage],
          }),
        })
          .then((res) => res.json())
          .then((d) => {
            setSummary2({
              commonName: d.data[1].commonName,
              legalName: d.data[1].legalName,
              description: d.data[1].description.desc,
              careers: d.data[1].careers.careers,
              cases: d.data[1].cases.cases,
              legislations: d.data[1].legislations.legislations,
              projects: d.data[1].projects.projects,
              education: d.data[1].education.education,
            });
          })
          .catch((err) => window.location.replace("/"));
      })
      .catch((err) => {
        // redirect back to main page
        console.log(err);
        // window.location.replace("/");
      });
  });

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
                  {(selectedView === "person1" ? summary1 : summary2)
                    ?.careers === undefined ||
                  (selectedView === "person1" ? summary1 : summary2)?.careers
                    .length === 0 ? (
                    <p>No career found</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
                  {(selectedView === "person1" ? summary1 : summary2)
                    ?.dynasty === undefined ||
                  (selectedView === "person1" ? summary1 : summary2)?.dynasty
                    .length === 0 ? (
                    <p>No relative in politics</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
                  {(selectedView === "person1" ? summary1 : summary2)
                    ?.legislations === undefined ||
                  (selectedView === "person1" ? summary1 : summary2)
                    ?.legislations.length === 0 ? (
                    <p>No legislation found</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
                  {(selectedView === "person1" ? summary1 : summary2)
                    ?.projects === undefined ||
                  (selectedView === "person1" ? summary1 : summary2)?.projects
                    .length === 0 ? (
                    <p>No projects found</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
                  {(selectedView === "person1" ? summary1 : summary2)?.cases ===
                    undefined ||
                  (selectedView === "person1" ? summary1 : summary2)?.cases
                    .length === 0 ? (
                    <p>No cases found</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
                  {(selectedView === "person1" ? summary1 : summary2)
                    ?.education === undefined ||
                  (selectedView === "person1" ? summary1 : summary2)?.education
                    .length === 0 ? (
                    <p>No education found</p>
                  ) : (
                    (selectedView === "person1"
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
                    ))
                  )}
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
