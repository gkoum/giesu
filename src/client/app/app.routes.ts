import { provideRouter } from '@angular/router';

import { AboutRoutes } from './graph-creation/index';
import {ConceptExplorerRoutes} from "./concept_explorer/index";
import {DashboardRoutes} from "./dashboard/dashboard.routes";

const routes = [
  ...DashboardRoutes,
  ...AboutRoutes,
  ...ConceptExplorerRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
