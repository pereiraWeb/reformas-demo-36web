/**
 * Sector demos are rendered from `src/config/localDemos/`.
 * Repairs is `/reparaciones/[city]`. Psychology is `/psicologia/[city]`.
 * Add a municipality in `src/config/localDemos/cities.ts`; the page, the
 * `noindex` tag and the sitemap exclusion already cover it.
 */
export { CITY_CONFIG, configuredCitySlugs, getCityConfig } from '../localDemos/cities';
export { buildReparacionesDemo, reparacionesContactHref } from '../localDemos/reparaciones';
export { buildPsicologiaDemo, psicologiaContactHref } from '../localDemos/psicologia';
export type { SectorDemoConfig } from './types';
