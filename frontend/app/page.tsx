"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Helper to generate random style for floating logos
function getRandomLogoStyle(side: "left" | "right") {
  const size = Math.floor(Math.random() * 80) + 40; // 40-120px
  const top = Math.floor(Math.random() * 80) + 10; // 10-90vh
  const rotate = Math.floor(Math.random() * 60) - 30; // -30 to +30 deg
  const style: React.CSSProperties = {
    position: "absolute",
    top: `${top}vh`,
    [side]: `-${size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    opacity: 0.08,
    transform: `rotate(${rotate}deg)`
  };
  return style;
}

export default function Home() {
  const router = useRouter();
  // Generate 4 floating logos per side
  const leftLogos = Array.from({ length: 4 }, (_, i) => (
    <div key={"left-" + i} style={getRandomLogoStyle("left")}
      className="hidden lg:block pointer-events-none select-none z-0">
      <Image src="/logo4.png" alt="Decorative Logo" width={100} height={100} style={{ width: "100%", height: "auto" }} />
    </div>
  ));
  const rightLogos = Array.from({ length: 4 }, (_, i) => (
    <div key={"right-" + i} style={getRandomLogoStyle("right")}
      className="hidden lg:block pointer-events-none select-none z-0">
      <Image src="/logo4.png" alt="Decorative Logo" width={100} height={100} style={{ width: "100%", height: "auto" }} />
    </div>
  ));

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Floating decorative logos */}
      {leftLogos}
      {rightLogos}
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-16 relative z-10">
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">AI-Powered</span> <span className="text-blue-600">Chiller Optimization</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            SmartChill helps you save energy and money by predicting chiller load and plant efficiency. Make your plant smarter, greener, and more cost-effective.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition"
            onClick={() => router.push("/predict")}
          >
            Try Prediction
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/logo3.png" alt="SmartChill Logo" width={280} height={280} />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg>
          <h3 className="font-bold text-xl mb-2 text-blue-700">Save Energy</h3>
          <p className="text-gray-600 text-center">Reduce your energy bills with AI-driven chiller optimization and actionable insights.</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          <h3 className="font-bold text-xl mb-2 text-blue-700">Predict Efficiency</h3>
          <p className="text-gray-600 text-center">Get real-time predictions for chiller load and plant efficiency to optimize operations.</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m0-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v9" /></svg>
          <h3 className="font-bold text-xl mb-2 text-blue-700">Easy Integration</h3>
          <p className="text-gray-600 text-center">Seamlessly integrate SmartChill into your existing plant with minimal setup.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">1</div>
            <p className="text-gray-200 text-center">Enter your plant data</p>
          </div>
          <div className="h-12 w-1 bg-blue-200 md:h-1 md:w-12 md:rotate-0 rotate-90" />
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">2</div>
            <p className="text-gray-200 text-center">Get instant AI predictions</p>
          </div>
          <div className="h-12 w-1 bg-blue-200 md:h-1 md:w-12 md:rotate-0 rotate-90" />
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">3</div>
            <p className="text-gray-200 text-center">Save money & energy</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Ready to optimize your plant?</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition"
          onClick={() => router.push("/predict")}
        >
          Start Prediction
        </button>
      </section>
    </div>
  );
}
