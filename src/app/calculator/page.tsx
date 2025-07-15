import { MainLayout } from "@/components/layout/MainLayout";
import { CalculatorIntro } from "@/components/calculator/CalculatorIntro";
import { CountrySelection } from "@/components/calculator/CountrySelection";

export default function CalculatorPage() {
  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl mx-auto">
        <CalculatorIntro />
        <CountrySelection />
      </div>
    </MainLayout>
  );
}
