import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Menuv2 from "./components/Menu/Menuv2";
import PrivacyPolicy from "./components/PPTOS/PrivacyPolicy";
import TOS from "./components/PPTOS/TOS";
import RandyResizev2 from "./components/RANDDY/RandyResizev2";
import FullWidthWithCam from "./components/Templates/FullWidthWithCam/FullWidthWithCam";
import HorizontalSplitEditor from "./components/Templates/HorizontalSplitTemplate/HorizontalSplitEditor";
import DragDrop from "./components/Templates/K3 Template/DragDrop";
import FullHeightTemplate from "./components/TemplatesV2/FullHeight/FullHeightTemplate";
import K3Template from "./components/TemplatesV2/K3Template/K3Template";
import { Provider } from "./contexts/Context";

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menuv2 />} />
        <Route path="/upload" element={<DragDrop />} />
        <Route path="/fps-template" element={<K3Template />} />
        {/* <Route path='/fps-template' element={<Editor />} /> */}
        <Route path="/50-50-template" element={<HorizontalSplitEditor />} />
        <Route path="/full-template" element={<FullHeightTemplate />} />
        <Route path="/full-width-cam-template" element={<FullWidthWithCam />} />
        <Route path="/dirtyburger" element={<RandyResizev2 />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TOS />} />
      </Routes>
    </Provider>
  );
}

export default App;
