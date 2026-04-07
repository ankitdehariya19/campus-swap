import "./App.css";
import { ProductListing } from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/10 overflow-x-hidden">
      <ProductListing />
    </div>
  );
}

export default App;
