import { describe, expect, it } from "vitest";
import { expressRoutes, metroStations, routesBetween } from "../shared/transit-data";
import { mergeTransitRoutes } from "./routers";
import { staticAynaRoutes } from "../shared/ayna-static";

describe("metro route matching", () => {
  it("contains all requested metro stations", () => {
    const names = metroStations.map(station => station.name);
    expect(names).toContain("Elmlər Akademiyası");
    expect(names).toContain("28 May");
    expect(names).toContain("Koroğlu");
    expect(names).toContain("Gənclik");
  });

  it("returns M1 for Elmlər Akademiyası to 28 May", () => {
    const routes = routesBetween("Elmlər Akademiyası", "28 May", expressRoutes);
    expect(routes.map(route => route.number)).toContain("M1");
  });

  it("returns M2 and M3 for Nizami to 28 May", () => {
    const routes = routesBetween("Nizami", "28 May", expressRoutes);
    expect(routes.map(route => route.number)).toEqual(expect.arrayContaining(["M2", "M3"]));
  });

  it("loads real AYNA route records into the static fallback", () => {
    expect(staticAynaRoutes.length).toBeGreaterThan(100);
    const routeOne = staticAynaRoutes.find(route => route.number === "1");
    expect(routeOne?.stations).toEqual(expect.arrayContaining(["28 May", "Nizami"]));
  });

  it("returns AYNA bus routes between metro stations", () => {
    const result = mergeTransitRoutes("Sahil", "Nəriman Nərimanov", staticAynaRoutes, false);
    expect(result.routes.some(route => route.number === "5" && route.source === "AYNA MaaS")).toBe(true);
  });

  it("keeps express fallback routes when AYNA API is unavailable", () => {
    const result = mergeTransitRoutes("Elmlər Akademiyası", "Gənclik", [], false);
    expect(result.live).toBe(false);
    expect(result.source).toBe("Statik fallback + Ekspres");
    expect(result.routes.map(route => route.number)).toContain("M6");
  });

  it("does not return a route for identical stations", () => {
    expect(routesBetween("Nizami", "Nizami", expressRoutes)).toEqual([]);
  });
});
