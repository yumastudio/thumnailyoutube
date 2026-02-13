import { Sidebar } from './components/Sidebar';
import { CanvasEditor } from './components/CanvasEditor';

function App() {
  return (
    <div className="flex w-full h-screen bg-black overflow-hidden font-sans">
      <Sidebar />
      <CanvasEditor />
    </div>
  );
}

export default App;
