import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import useDarkMode from "../hooks/DarkMode";
import { Translation } from "../models/Translation";

const Compare: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") ?? "English",
  );
  const [person1, setPerson1] = useState<string | undefined>();
  const [person2, setPerson2] = useState<string | undefined>();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const languageOptions: string[] = [
    "English",
    "Filipino",
    "Cebuano",
    "Waray",
    "Hiligaynon",
  ];

  const submitSearch = (e: React.FormEvent) => {
    // redirect
    e.preventDefault();

    if (!person1 || !person2) {
      return;
    }

    let searchQuery = `name1=${person1}&name2=${person2}`;

    searchQuery = searchQuery.concat(`&l=${selectedLanguage}`);

    window.location.href = `comparison?${searchQuery}`;
  };

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
        <div className="w-full h-full flex flex-col justify-center items-center">
          <form
            onSubmit={submitSearch}
            className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] full flex flex-col justify-center items-center gap-1"
          >
            <div className="mb-5">
              <label>Person 1</label>
              <input
                onChange={(e) => setPerson1(e.target.value)}
                className="w-full indent-3 py-1 rounded-lg"
                type="text"
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            <div>
              <label>Person 2</label>
              <input
                onChange={(e) => setPerson2(e.target.value)}
                className="w-full indent-3 py-1 rounded-lg"
                type="text"
              />
            </div>
            <button
              className="bg-[#A14DB6] w-[50%] py-1 rounded-lg mt-5"
              type="submit"
            >
              Compare
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Compare;
