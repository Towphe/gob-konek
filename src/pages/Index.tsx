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

const Index: React.FC = () => {
  const [topSearches, setTopSearches] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [selectedProvince, setSelectedProvince] = useState<
    string | undefined
  >();
  const [isGeolocationEnabled, toggleGeolocation] = useState<boolean>(false);
  const [selectedMunicipalityOrCity, setSelectedMunicipalityOrProvince] =
    useState<string | undefined>();

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
        searchQuery = searchQuery.concat(`&p=${selectedProvince}`);
      }

      if (selectedMunicipalityOrCity) {
        // append municipality
        searchQuery = searchQuery.concat(`&m=${selectedMunicipalityOrCity}`);
      }
    }

    window.location.href = `info?${searchQuery}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>gob.konek</IonTitle>
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
                <IonSelect className="" label="Province" interface="popover">
                  <IonSelectOption value="NCR" />
                </IonSelect>
                <IonSelect label="Municipality" interface="popover">
                  <IonSelectOption value="NCR" />
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
