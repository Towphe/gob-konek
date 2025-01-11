import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { provinces, cities } from "../util/location";

const Index: React.FC = () => {
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [isGeolocationEnabled, toggleGeolocation] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<
    string | undefined
  >();
  const [selectedMunicipalityOrCity, setSelectedMunicipalityOrProvince] =
    useState<string | undefined>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const languageOptions: string[] = ["English", "Filipino", "Cebuano"];

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>gob.konek</IonTitle>
          <IonSelect
            slot="end"
            value={selectedLanguage}
            className="text-xs"
            interface="popover"
          >
            {languageOptions.map((l) => (
              <IonSelectOption value={l}>{l}</IonSelectOption>
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
                placeholder="Enter text"
              />
              <div className="flex gap-6">
                {/* filters */}
                <IonSelect
                  className="text-xs"
                  label={selectedProvince !== undefined ? "" : "Province"}
                  interface="popover"
                  onIonChange={(event) => {
                    setSelectedProvince(event.detail.value);
                  }}
                >
                  {provinces.map((p) => (
                    <IonSelectOption value={p.key}>{p.name}</IonSelectOption>
                  ))}
                </IonSelect>
                <IonSelect
                  className="text-xs"
                  label={selectedMunicipalityOrCity !== undefined ? "" : "City"}
                  onIonChange={(event) => {
                    setSelectedMunicipalityOrProvince(event.detail.value);
                  }}
                  interface="popover"
                >
                  {setSelectedProvince === undefined ? (
                    <></>
                  ) : (
                    cities
                      .filter((c) => c.province === selectedProvince)
                      .map((c) => (
                        <IonSelectOption value={c.city}>
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
              className="bg-blue-500 py-3 px-4 rounded-xl w-[30%] "
            >
              Search
            </button>
          </form>
          <div className="w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[20vw]">
            {/* Popular searches */}
            <h2 className="font-semibold mb-2">Popular Searches</h2>
            <div>
              {/* iterate through list of popular searches */}
              {topSearches.map((s) => {
                return (
                  <div className="bg-gray-500 bg-opacity-40 flex justify-between items-center mb-2 py-1.5 px-3 rounded-lg">
                    <p>
                      {topSearches.indexOf(s) + 1}. {s}
                    </p>
                    <a href={`/info?s=${s}`} className="opacity-30 block">
                      View
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
