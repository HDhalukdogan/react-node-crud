import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sample from "../../features/sample/Sample";
import SampleDetails from "../../features/sample/SampleDetails";
import SampleCreate from "../../features/sample/SampleCreate";
import SampleEdit from "../../features/sample/SampleEdit";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Sample />} />
          <Route path='/details/:id' exact element={<SampleDetails />} />
          <Route path='/create' exact element={<SampleCreate />} />
          <Route path='/edit/:id' exact element={<SampleEdit />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
