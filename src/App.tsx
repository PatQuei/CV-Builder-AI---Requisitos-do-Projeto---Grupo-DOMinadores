import FormSection from "./components/Layout/FormSection";
import PreviewSection from "./components/Layout/PreviewSection";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl">
        <FormSection />
        <PreviewSection />
      </div>
    </div>
  );
}

export default App;
