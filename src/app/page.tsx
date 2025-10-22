import MyCalendar from "@/app/components/Calendar";
import Header from "./components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
   
      <Header />
    

        {/* Calendar */}
        <MyCalendar />
      </div>
    </main>
  );
}
  