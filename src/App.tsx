import { Sidebar } from './components/Sidebar';
import { CanvasEditor } from './components/CanvasEditor';

function App() {
  return (
    <div className="flex w-full h-screen bg-[#09090b] overflow-hidden font-sans relative selection:bg-purple-500/30">
      {/* Dynamic Animated Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full mix-blend-screen blur-[140px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/20 rounded-full mix-blend-screen blur-[140px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full mix-blend-screen blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>
      
      {/* Floating Workspace Layout */}
      <div className="relative z-10 flex w-full h-full p-6 gap-6">
        <Sidebar />
        <CanvasEditor />
      </div>
    </div>
  );
}

export default App;
