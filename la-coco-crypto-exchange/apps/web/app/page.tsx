import ExchangeCard from "@/components/ExchangeCard";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-400">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <ExchangeCard />
      </main>
    </div>
  );
}
