import type { Project } from "./types";
import { predictionMarketTrader } from "./prediction-market-trader";
import { climachain } from "./climachain";

export * from "./types";

export const projects: Project[] = [predictionMarketTrader, climachain];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
