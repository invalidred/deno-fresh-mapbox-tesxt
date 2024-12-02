import { useEffect } from "preact/hooks";

type Props = {
  location?: string;
  errors?: string;
  mapboxApiToken: string;
};

export default function LocationMap(props: Props) {
  const initializeGeocoder = async () => {
    const { MapboxGeocoder } = await import("@mapbox/search-js-web");

    const geocoderElement = new MapboxGeocoder();
    geocoderElement.options = {
      language: "en",
      country: "ca",
    };

    geocoderElement.theme = {};
    geocoderElement.accessToken = props.mapboxApiToken;

    // Append the geocoder element to the DOM
    const container = document.querySelector("#geo-code-map");
    if (container) {
      container.appendChild(geocoderElement as unknown as Node);
    }

    return geocoderElement;
  };

  useEffect(() => {
    const initialize = async () => {
      await initializeGeocoder().catch((error) => {
        console.error("Failed to initialize Mapbox:", error);
      });
    };
    initialize();
  }, []);

  return <div id="geo-code-map"></div>;
}
