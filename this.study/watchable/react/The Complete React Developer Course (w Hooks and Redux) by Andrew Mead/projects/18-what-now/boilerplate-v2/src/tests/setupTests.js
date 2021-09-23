import DotEnv from "dotenv";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

DotEnv.config({ path: ".env.test" });
Enzyme.configure({ adapter: new Adapter() });
