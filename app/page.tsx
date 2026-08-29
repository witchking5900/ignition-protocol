import { SimulationProvider } from '@/context/SimulationContext';
import DefenseDashboard from '@/components/DefenseDashboard';

export default function Home() {
  return (
    <main>
      <SimulationProvider>
        <DefenseDashboard />
      </SimulationProvider>
    </main>
  );
}