import { Videos } from "./Videos";
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { Radio } from "./Radio";
import { NotFound } from "./NotFound";
import { Admin } from "./Admin";
import { Login } from "./Login";

function App() {
  const [player, setPlayer] = useState(false);

  return (
    <div className="bg-zinc-900">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/video" element={<Videos player={player} setPlayer={setPlayer}/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/radio" element={<Radio/>}/>

        {/* fallback page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className={player ? 'hidden' : 'inline'}>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
