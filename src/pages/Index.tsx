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
import { provinces, cities } from "../util/location";

interface Translation {
  English: string;
  Filipino: string;
  Cebuano: string;
  Waray: string;
  Hiligaynon: string;
}

const Index: React.FC = () => {
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [isGeolocationEnabled, toggleGeolocation] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    localStorage.getItem("province") ?? undefined,
  );
  const [selectedMunicipalityOrCity, setSelectedMunicipalityOrProvince] =
    useState<string | undefined>(localStorage.getItem("city") ?? undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") ?? "English",
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("isDarkMode") === "false" ? false : true,
  );
  const languageOptions: string[] = [
    "English",
    "Filipino",
    "Cebuano",
    "Waray",
    "Hiligaynon",
  ];
  const popularSearchesTranslations: Translation = {
    English: "Popular Searches",
    Filipino: "Mga Patok Ngayon",
    Cebuano: "Sikat Karon",
    Waray: "Mga Sikat Yana",
    Hiligaynon: "Mga Patok Subong",
  };
  const enterTextTranslations: Translation = {
    English: "Enter person",
    Filipino: "Mag-enter ng tao",
    Cebuano: "Mag-enter ng tao",
    Waray: "Mag-enter ng tao",
    Hiligaynon: "Mag-enter ng tao",
  };
  const viewTranslations: Translation = {
    English: "View",
    Filipino: "Tignan",
    Cebuano: "Tan-awon",
    Waray: "Tan-awa",
    Hiligaynon: "Gapangita",
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", !isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    // fetch top searches
    setTopSearches([
      "Quiboloy",
      "Abalos",
      "Sara Duterte",
      "Leni Robredo",
      "AKAP",
      "Vico Sotto",
      "Risa Hontiveros",
      "Pacquiao",
      "Rodrigo Duterte",
      "Joy Belmonte",
    ]);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    // redirect
    e.preventDefault();
    let searchQuery = `s=${search}`;

    if (!search) {
      // pop error that search is needed
      return;
    }

    if (!isGeolocationEnabled) {
      if (selectedProvince) {
        // append province
        const provinceName = provinces.filter(
          (p) => p.key === selectedProvince,
        )[0];
        searchQuery = searchQuery.concat(`&p=${provinceName.name}`);
      }

      if (selectedMunicipalityOrCity) {
        // append municipality
        const municipalityName = cities.filter(
          (c) =>
            c.name === selectedMunicipalityOrCity &&
            c.province === selectedProvince,
        )[0].name;
        searchQuery = searchQuery.concat(`&m=${municipalityName}`);
      }
    }

    searchQuery = searchQuery.concat(`&l=${selectedLanguage}`);

    window.location.href = `info?${searchQuery}`;
  };

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
        <div className="h-full flex flex-col justify-center items-center">
          <form
            onSubmit={submitSearch}
            className="flex justify-between items-start w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw] mb-5"
          >
            {/* Search box */}
            <div className="w-[68%] flex flex-col justify-start items-start">
              <input
                name="search"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-500 bg-opacity-40 rounded-2xl text-md py-3 indent-4 w-full"
                placeholder={enterTextTranslations[selectedLanguage]}
              />
              <div className="flex gap-4">
                {/* filters */}
                <IonSelect
                  className="text-xs border-b-2"
                  label={selectedProvince !== undefined ? "" : "Province"}
                  value={selectedProvince ?? undefined}
                  interface="popover"
                  onIonChange={(event) => {
                    setSelectedProvince(event.detail.value);
                    setSelectedMunicipalityOrProvince(undefined);
                    localStorage.setItem("province", event.detail.value);
                  }}
                >
                  {provinces.map((p) => (
                    <IonSelectOption key={p.key} value={p.key}>
                      {p.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <IonSelect
                  className="text-xs border-b-2"
                  label={selectedMunicipalityOrCity !== undefined ? "" : "City"}
                  onIonChange={(event) => {
                    setSelectedMunicipalityOrProvince(event.detail.value);
                    localStorage.setItem("city", event.detail.value);
                  }}
                  interface="popover"
                >
                  {setSelectedProvince === undefined ? (
                    <></>
                  ) : (
                    cities
                      .filter((c) => c.province === selectedProvince)
                      .map((c) => (
                        <IonSelectOption key={cities.indexOf(c)} value={c.city}>
                          {c.name}
                        </IonSelectOption>
                      ))
                  )}
                  {/* <IonSelectOption value="NCR" /> */}
                </IonSelect>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#A14DB6] text-white py-3 px-4 rounded-xl w-[30%] "
            >
              Search
            </button>
          </form>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw]">
            {/* Popular searches */}
            <h2 className="font-semibold mb-2">
              {popularSearchesTranslations[selectedLanguage]}
            </h2>
            <div>
              {/* iterate through list of popular searches */}
              {topSearches.map((s) => {
                return (
                  <div
                    key={topSearches.indexOf(s)}
                    className="border-b-2 border-[#A14DB6] flex justify-between items-center mb-2 py-1.5 px-3 rounded-t-lg"
                  >
                    <p>
                      {topSearches.indexOf(s) + 1}. {s}
                    </p>
                    <a href={`/info?s=${s}`} className="opacity-30 block">
                      {viewTranslations[selectedLanguage]}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Index;
