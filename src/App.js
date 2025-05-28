import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function RadioStationApp() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    fetch("https://de1.api.radio-browser.info/json/stations/topclick/100")
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "all" || station.tags.toLowerCase().includes(genre.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Globale Radiostationen</h1>
      <div className="max-w-4xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Input
          placeholder="Suche nach Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-1 sm:col-span-2"
        />
        <Select onValueChange={setGenre} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filter nach Musikrichtung" />
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

      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredStations.map((station) => (
          <Card key={station.stationuuid} className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <img
              src={station.favicon || "/radio-placeholder.png"}
              alt={station.name}
              className="w-full h-32 object-contain bg-gray-100"
              onError={(e) => (e.target.src = "/radio-placeholder.png")}
            />
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg mb-1">{station.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{station.country}</p>
              <audio controls className="w-full">
                <source src={station.url_resolved} type="audio/mpeg" />
                Dein Browser unterstützt kein Audio-Streaming.
              </audio>
              <p className="text-xs text-gray-500 mt-2">Genres: {station.tags}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
