import { toast } from "react-toastify";

export const notify = (t, message) => {
  toast(message, { type: t });
};
