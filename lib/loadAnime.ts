export type AnimeApi = {
  animate: (targets: any, params: any) => any;
  createTimeline: (params?: any) => any;
  stagger: (val: number | string | [number | string, number | string], params?: any) => any;
  eases: any;
};

export async function loadAnime(): Promise<AnimeApi> {
  // Use ESM entry which exposes named exports in v4
  const mod: any = await import("animejs");
  const api: AnimeApi = {
    animate: mod.animate,
    createTimeline: mod.createTimeline,
    stagger: mod.stagger,
    eases: mod.eases,
  };
  return api;
}


