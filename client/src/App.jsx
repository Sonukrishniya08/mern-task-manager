import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const features = [
    "Secure Authentication",
    "Task Management",
    "JWT Protection",
    "MongoDB Storage"
  ];

  return (
    <>
      <Navbar />

      <Hero
        title="Task Manager"
        subtitle="Manage your tasks efficiently"
      />

      <div className="feature-section">
        <h2>Features</h2>

        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
          >
            {feature}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;