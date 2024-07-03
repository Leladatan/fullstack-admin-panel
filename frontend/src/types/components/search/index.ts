import { Dispatch, SetStateAction } from "react";

export type SearchType = {
  name: string;
  value: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
};
