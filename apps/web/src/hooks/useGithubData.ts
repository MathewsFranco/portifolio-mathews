import { useEffect, useState } from "react";
import { getGithubOverview } from "@/lib/github";
import type { GithubOverview } from "@/lib/github.types";

const initialData: GithubOverview = {
  stats: {
    publicRepos: 0,
    recentCommits: 0,
    pullRequests: 0,
    totalStars: 0,
  },
  recentCommits: [],
  recentPrs: [],
  repos: [],
  contributions: { weeks: [], monthLabels: [] },
  rateLimited: false,
};

export interface UseGithubDataResult {
  data: GithubOverview;
  loading: boolean;
  error: boolean;
}

export function useGithubData(): UseGithubDataResult {
  const [data, setData] = useState<GithubOverview>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await getGithubOverview();
        if (!cancelled) {
          setData(response);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
