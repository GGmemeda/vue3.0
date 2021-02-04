import {resolve} from 'path';
import type {UserConfig, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {wrapperEnv} from './config/env';
import {loadEnv} from 'vite';
import {createVitePlugins} from './config/plugin';
import {createProxy} from "./config/proxyConfig/proxy";


function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir);
}

const root: string = process.cwd();
export default ({command, mode}: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, root);
    const configEnv: string  = process.env.NODE_ENV ||'development';
    const viteEnv = wrapperEnv(env);
    const {VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_LEGACY = false} = viteEnv;
    const isBuild = command === 'build';
    console.log(isBuild);
    const proxy:Object =isBuild?{}:{server:  {
            port: VITE_PORT,
            open: '/index',
            proxy: createProxy(configEnv),
            hmr: {
                overlay: true,
            },
        }};
    return {
        base: VITE_PUBLIC_PATH,
        alias: {
            '@': pathResolve('src'),
        },
        optimizeDeps: {
            include: [
                'axios',
            ],
        },
        ...proxy,
        build: {
            polyfillDynamicImport: VITE_LEGACY,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {},
                    javascriptEnabled: true,
                },
            },
        },
        define: {
          // 直接注入到window
          PROJECT_NAME:'地产之眼'
        },
        plugins: [
            vue(),
            ...createVitePlugins(viteEnv, isBuild),
        ]
    }
}
