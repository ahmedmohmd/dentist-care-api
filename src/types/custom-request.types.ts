import { UpdateAdmin } from "./admins.types";
import { UpdateModerator } from "./moderators.types";
import { UpdatePatient } from "./patients.types";

interface CustomAdminRequest extends Request {
  user?: any;
}
interface CustomRequest extends Request {
  user?: any;
}
interface CustomModeratorRequest extends Request {
  user?: UpdateModerator;
}
interface CustomPatientRequest extends Request {
  user?: UpdatePatient;
}

export { CustomRequest };
