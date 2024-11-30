/**
 * *****************************************************************************
 *
 * 客户端路由配置
 *
 * routes configurations
 *
 * *****************************************************************************
 */

// import lazy from "./components/lazy.mts";
// import * as layout from "./components/layout/index.mts";
import { 
  HomePage,
  Game,
  Test,
  NotFound,
} from "./apps/index.mts";

// 根据服务端提供的配置
export const routes = [
  { path: [ "/", "/home", "/home/*"],
    component: HomePage,
    exact: true
  },
  { path: "/test",
    component: Test,
  },
  { path: "/erps/games",
    component: Game,
    exact: true
  },
  { path: "*", component: NotFound },
];
