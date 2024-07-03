export type FormType = {
  handleSubmit: () => void;
  children: React.ReactNode;
};

export type FormButtonsType = {
  label: string;
  disabled?: boolean;
  onClose: () => void;
};
