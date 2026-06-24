import { Sidebar } from './components/Sidebar';
import { CanvasEditor } from './components/CanvasEditor';

function App() {
  return (
    <div className="flex w-full h-screen bg-zinc-950 overflow-hidden font-sans relative selection:bg-blue-500/30">
      {/* Decorative Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full mix-blend-screen blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-rose-600/10 rounded-full mix-blend-screen blur-[120px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full mix-blend-screen blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 flex w-full h-full">
        <Sidebar />
        <CanvasEditor />
      </div>
    </div>
  );
}

export default App;
