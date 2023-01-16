import { createContext, useState, useEffect, useContext } from "react";

type ContextProps = {
  randomUsers: any;
  setRandomUsers: React.Dispatch<React.SetStateAction<any>>;
  fetchUsersFromAPI: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<ContextProps>({
  randomUsers: [],
  setRandomUsers: () => {},
  fetchUsersFromAPI: function (): void {},
});

const Provider = ({ children }: ProviderProps) => {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    fetchUsersFromAPI();
  }, []);

  const fetchUsersFromAPI = () => {
    const requestURL = "https://randomuser.me/api/?nat=us&results=50";

    const requestOptions: RequestInit = {
      method: "GET",
    };

    fetch(requestURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const responseResults = result.results;
          setRandomUsers(responseResults);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const exposedContext: ContextProps = {
    randomUsers,
    setRandomUsers,
    fetchUsersFromAPI,
  };

  return <Context.Provider value={exposedContext}>{children}</Context.Provider>;
};

export const useClassroom = () => useContext(Context);

export default Provider;
