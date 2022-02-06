import { toast } from "react-toastify";
//HANDLE NOTIFICATIONS
const notify = (t, message) => {
  toast(message, { type: t });
};
export default notify;
