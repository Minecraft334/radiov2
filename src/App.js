import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// UI Komponenten
function Input(props) {
  return (
    <input
      {...props}
      className={
        "border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 transition p-3 rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:text-white " +
        (props.className || "")
      }
    />
  );
}

function Card({ children, className }) {
  return (
    <div className={"bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg overflow-hidden " + (className || "")}>{children}</div>
  );
}

function CardContent({ children, className }) {
  return <div className={"p-4 " + (className || "")}>{children}</div>;
}

function Button(props) {
  return (
    <button
      {...props}
      className={
        "bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition " +
        (props.className || "")
      }
    />
  );
}

function Select({ children, onValueChange, defaultValue }) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onValueChange(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 p-3 rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:text-white w-full focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400"
    >
      {children}
    </select>
  );
}

function SelectTrigger({ children }) {
  return children;
}

function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}

function SelectContent({ children }) {
  return children;
}

function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export default function RadioStationApp() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://de1.api.radio-browser.info/json/stations/topclick/100")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "all" || station.tags.toLowerCase().includes(genre.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6 transition-colors">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center w-full text-gray-900 dark:text-white drop-shadow-sm">
          Globale Radiostationen
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 text-gray-700 dark:text-yellow-400 hover:scale-110 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Input
          placeholder="🔍 Suche nach Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-1 sm:col-span-2"
        />
        <Select onValueChange={setGenre} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="🎵 Filter nach Musikrichtung" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="jazz">Jazz</SelectItem>
            <SelectItem value="classical">Klassik</SelectItem>
            <SelectItem value="electronic">Elektronisch</SelectItem>
            <SelectItem value="hiphop">Hip-Hop</SelectItem>
            <SelectItem value="news">Nachrichten</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredStations.map((station) => (
          <Card key={station.stationuuid}>
            <img
              src={station.favicon || "/radio-placeholder.png"}
              alt={station.name}
              className="w-full h-32 object-contain bg-gray-50 dark:bg-gray-800 border-b"
              onError={(e) => (e.target.src = "/radio-placeholder.png")}
            />
            <CardContent>
              <h2 className="font-semibold text-xl mb-1 text-gray-900 dark:text-white">{station.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{station.country}</p>
              <audio controls className="w-full">
                <source src={station.url_resolved} type="audio/mpeg" />
                Dein Browser unterstützt kein Audio-Streaming.
              </audio>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">🎧 Genres: {station.tags}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-12 block mx-auto">
        ⬆️ Nach oben
      </Button>
    </div>
  );
}
