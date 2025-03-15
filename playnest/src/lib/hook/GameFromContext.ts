import { GameFormContext } from "@/components/context/multistep-form-context";
import { useContext } from "react";

export const useNewUserFormContext = () => {
  const context = useContext(GameFormContext);
  if (!context) {
    throw new Error(
      "useNewPropertyFormContext must be used within a NewUserFormContextProvider",
    );
  }

  return context;
};
