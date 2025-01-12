import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Career } from "../models/Career";
import { Case } from "../models/Case";
import { Education } from "../models/Education";
import { Legislation } from "../models/Legislation";
import { PoliticalRelative } from "../models/PoliticalRelative";
import { Project } from "../models/Project";
import { Summary } from "../models/Summary";
import { CareerComponent } from "../components/CareerComponent";
import { PoliticalDynastyComponent } from "../components/PoliticalDynastyComponent";
import { LegislationComponent } from "../components/LegislationComponent";
import { ProjectComponent } from "../components/ProjectComponent";
import { CaseComponent } from "../components/CaseComponent";
import { EducationComponent } from "../components/EducationComponent";
import { Translation } from "../models/Translation";

const Info: React.FC = () => {
  const [summary, setSummary] = useState<Summary>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("isDarkMode") === "false" ? false : true,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") ?? "English",
  );
  const [isLoading, toggleLoading] = useState<boolean>(true);
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
  const backTranslation: Translation = {
    English: "Go Back",
    Filipino: "Bumalik",
    Cebuano: "Bumalik",
    Hiligaynon: "Bumalik",
    Waray: "Bumalik",
  };

  useIonViewWillEnter(() => {
    let searchQuery = `?name=${name}`;

    if (province) {
      searchQuery = searchQuery.concat(`&province=${province}`);

      if (city) {
        searchQuery = searchQuery.concat(`&municipality=${city}`);
      }
    }

    // console.log("Here");
    fetch(apiUrl.concat(searchQuery), {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": 69420,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSummary({
          commonName: data.data.commonName,
          legalName: data.data.legalName,
          description: data.data.description.desc,
          careers: data.data.careers.careers,
          cases: data.data.cases.cases,
          legislations: data.data.legislations.legislations,
          projects: data.data.projects.projects,
          education: data.data.education.education,
        });
        console.log(data);
      })
      .catch((err) => {
        // redirect back to main page
        window.location.replace("/");
      });
  });

  const apiUrl: string =
    "https://2580-203-190-81-229.ngrok-free.app/retrieve/summary";

  // useEffect(() => {
  //   toggleLoading(!isLoading);
  // }, []);

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
        <div
          className={`bg-blue-901 flex flex-col justify-center items-center text-sm py-10`}
        >
          <div
            className={
              "w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-3"
            }
          >
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
            <IonAccordion value="career" className=" mb-4 rounded-xl">
              <IonItem slot="header" className="accordion-header">
                <IonLabel>Career</IonLabel>
              </IonItem>
              <div className="bg-white text-black w-full py-4" slot="content">
                <div className="flex flex-col gap-3 px-3">
                  {summary?.careers === undefined ? (
                    <p>No career found.</p>
                  ) : (
                    summary?.careers.map((c) => (
                      <CareerComponent
                        key={summary?.careers.indexOf(c)}
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
                  {summary?.dynasty === undefined ? (
                    <p>No relatives in politics found.</p>
                  ) : (
                    summary?.dynasty.map((d) => (
                      <PoliticalDynastyComponent
                        key={summary.dynasty.indexOf(d)}
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
                  {summary?.legislations === undefined ||
                  summary?.legislations.length === 0 ? (
                    <p>No found legislation.</p>
                  ) : (
                    summary?.legislations.map((l) => (
                      <LegislationComponent
                        key={summary.legislations.indexOf(l)}
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
                  {summary?.projects === undefined ||
                  summary?.projects.length === 0 ? (
                    <p>No found projects.</p>
                  ) : (
                    summary?.projects.map((p) => (
                      <ProjectComponent
                        key={summary.projects.indexOf(p)}
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
                  {summary?.cases === undefined ||
                  summary?.cases.length === 0 ? (
                    <p>No found cases.</p>
                  ) : (
                    summary?.cases.map((c) => (
                      <CaseComponent
                        key={summary.cases.indexOf(c)}
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
                  {summary?.education === undefined ||
                  summary?.education.length === 0 ? (
                    <p>No found education.</p>
                  ) : (
                    summary?.education.map((s) => (
                      <EducationComponent
                        key={summary.education.indexOf(s)}
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
      </IonContent>
    </IonPage>
  );
};

export default Info;
