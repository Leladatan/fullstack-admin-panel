import { ScaleLoader } from "react-spinners";
import "@/components/ui/loader/loader.scss";

const Loader = () => {
  return (
    <div className={"loader"}>
      <ScaleLoader color={"#0086c9"} />
    </div>
  );
};

export default Loader;
