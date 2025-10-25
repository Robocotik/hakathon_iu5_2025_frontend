import { GlassContainer } from './components/GlassContainer';
import {Header} from './components/Header';
import { FormLayout } from './components/GlassContainer/GlassContainer.layout';


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 pb-40">
      {" "}
      <Header />
      <FormLayout />
    </main>
  );
}