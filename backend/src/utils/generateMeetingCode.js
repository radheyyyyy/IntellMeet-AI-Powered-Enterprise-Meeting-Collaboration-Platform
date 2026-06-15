import { randomUUID } from "crypto";

const generateMeetingCode = () => {
  return randomUUID()
    .split("-")[0]
    .toUpperCase();
};

export default generateMeetingCode;