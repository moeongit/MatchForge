/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/[...path]/route";
exports.ids = ["app/api/[...path]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/[...path]/route.js":
/*!************************************!*\
  !*** ./app/api/[...path]/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\nconst dynamic = \"force-dynamic\";\nconst API_BASE = process.env.MATCHFORGE_API_BASE || \"http://localhost:8080\";\nasync function forward(request, context) {\n    const params = await context.params;\n    const path = (params.path || []).join(\"/\");\n    const target = new URL(`${API_BASE}/${path}`);\n    target.search = new URL(request.url).search;\n    const headers = new Headers(request.headers);\n    headers.delete(\"host\");\n    const init = {\n        method: request.method,\n        headers\n    };\n    if (request.method !== \"GET\" && request.method !== \"HEAD\") {\n        init.body = await request.text();\n    }\n    const controller = new AbortController();\n    const timeout = setTimeout(()=>controller.abort(), 8000);\n    let response;\n    try {\n        response = await fetch(target, {\n            ...init,\n            cache: \"no-store\",\n            signal: controller.signal\n        });\n    } catch  {\n        return Response.json({\n            error: \"MatchForge API is unreachable. Start backend on http://localhost:8080.\"\n        }, {\n            status: 503\n        });\n    } finally{\n        clearTimeout(timeout);\n    }\n    const responseHeaders = new Headers(response.headers);\n    responseHeaders.delete(\"content-encoding\");\n    responseHeaders.delete(\"content-length\");\n    return new Response(response.body, {\n        status: response.status,\n        headers: responseHeaders\n    });\n}\nasync function GET(request, context) {\n    return forward(request, context);\n}\nasync function POST(request, context) {\n    return forward(request, context);\n}\nasync function PUT(request, context) {\n    return forward(request, context);\n}\nasync function DELETE(request, context) {\n    return forward(request, context);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL1suLi5wYXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFPLE1BQU1BLFVBQVUsZ0JBQWdCO0FBRXZDLE1BQU1DLFdBQVdDLFFBQVFDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUk7QUFFcEQsZUFBZUMsUUFBUUMsT0FBTyxFQUFFQyxPQUFPO0lBQ3JDLE1BQU1DLFNBQVMsTUFBTUQsUUFBUUMsTUFBTTtJQUNuQyxNQUFNQyxPQUFPLENBQUNELE9BQU9DLElBQUksSUFBSSxFQUFFLEVBQUVDLElBQUksQ0FBQztJQUN0QyxNQUFNQyxTQUFTLElBQUlDLElBQUksR0FBR1gsU0FBUyxDQUFDLEVBQUVRLE1BQU07SUFDNUNFLE9BQU9FLE1BQU0sR0FBRyxJQUFJRCxJQUFJTixRQUFRUSxHQUFHLEVBQUVELE1BQU07SUFFM0MsTUFBTUUsVUFBVSxJQUFJQyxRQUFRVixRQUFRUyxPQUFPO0lBQzNDQSxRQUFRRSxNQUFNLENBQUM7SUFFZixNQUFNQyxPQUFPO1FBQ1hDLFFBQVFiLFFBQVFhLE1BQU07UUFDdEJKO0lBQ0Y7SUFFQSxJQUFJVCxRQUFRYSxNQUFNLEtBQUssU0FBU2IsUUFBUWEsTUFBTSxLQUFLLFFBQVE7UUFDekRELEtBQUtFLElBQUksR0FBRyxNQUFNZCxRQUFRZSxJQUFJO0lBQ2hDO0lBRUEsTUFBTUMsYUFBYSxJQUFJQztJQUN2QixNQUFNQyxVQUFVQyxXQUFXLElBQU1ILFdBQVdJLEtBQUssSUFBSTtJQUNyRCxJQUFJQztJQUNKLElBQUk7UUFDRkEsV0FBVyxNQUFNQyxNQUFNakIsUUFBUTtZQUM3QixHQUFHTyxJQUFJO1lBQ1BXLE9BQU87WUFDUEMsUUFBUVIsV0FBV1EsTUFBTTtRQUMzQjtJQUNGLEVBQUUsT0FBTTtRQUNOLE9BQU9DLFNBQVNDLElBQUksQ0FDbEI7WUFDRUMsT0FBTztRQUNULEdBQ0E7WUFBRUMsUUFBUTtRQUFJO0lBRWxCLFNBQVU7UUFDUkMsYUFBYVg7SUFDZjtJQUNBLE1BQU1ZLGtCQUFrQixJQUFJcEIsUUFBUVcsU0FBU1osT0FBTztJQUNwRHFCLGdCQUFnQm5CLE1BQU0sQ0FBQztJQUN2Qm1CLGdCQUFnQm5CLE1BQU0sQ0FBQztJQUV2QixPQUFPLElBQUljLFNBQVNKLFNBQVNQLElBQUksRUFBRTtRQUNqQ2MsUUFBUVAsU0FBU08sTUFBTTtRQUN2Qm5CLFNBQVNxQjtJQUNYO0FBQ0Y7QUFFTyxlQUFlQyxJQUFJL0IsT0FBTyxFQUFFQyxPQUFPO0lBQ3hDLE9BQU9GLFFBQVFDLFNBQVNDO0FBQzFCO0FBRU8sZUFBZStCLEtBQUtoQyxPQUFPLEVBQUVDLE9BQU87SUFDekMsT0FBT0YsUUFBUUMsU0FBU0M7QUFDMUI7QUFFTyxlQUFlZ0MsSUFBSWpDLE9BQU8sRUFBRUMsT0FBTztJQUN4QyxPQUFPRixRQUFRQyxTQUFTQztBQUMxQjtBQUVPLGVBQWVpQyxPQUFPbEMsT0FBTyxFQUFFQyxPQUFPO0lBQzNDLE9BQU9GLFFBQVFDLFNBQVNDO0FBQzFCIiwic291cmNlcyI6WyJDOlxcTWF0Y2hGb3JnZVxcZnJvbnRlbmRcXGFwcFxcYXBpXFxbLi4ucGF0aF1cXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkeW5hbWljID0gXCJmb3JjZS1keW5hbWljXCI7XHJcblxyXG5jb25zdCBBUElfQkFTRSA9IHByb2Nlc3MuZW52Lk1BVENIRk9SR0VfQVBJX0JBU0UgfHwgXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZvcndhcmQocmVxdWVzdCwgY29udGV4dCkge1xyXG4gIGNvbnN0IHBhcmFtcyA9IGF3YWl0IGNvbnRleHQucGFyYW1zO1xyXG4gIGNvbnN0IHBhdGggPSAocGFyYW1zLnBhdGggfHwgW10pLmpvaW4oXCIvXCIpO1xyXG4gIGNvbnN0IHRhcmdldCA9IG5ldyBVUkwoYCR7QVBJX0JBU0V9LyR7cGF0aH1gKTtcclxuICB0YXJnZXQuc2VhcmNoID0gbmV3IFVSTChyZXF1ZXN0LnVybCkuc2VhcmNoO1xyXG5cclxuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKTtcclxuICBoZWFkZXJzLmRlbGV0ZShcImhvc3RcIik7XHJcblxyXG4gIGNvbnN0IGluaXQgPSB7XHJcbiAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxyXG4gICAgaGVhZGVyc1xyXG4gIH07XHJcblxyXG4gIGlmIChyZXF1ZXN0Lm1ldGhvZCAhPT0gXCJHRVRcIiAmJiByZXF1ZXN0Lm1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcclxuICAgIGluaXQuYm9keSA9IGF3YWl0IHJlcXVlc3QudGV4dCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDgwMDApO1xyXG4gIGxldCByZXNwb25zZTtcclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0YXJnZXQsIHtcclxuICAgICAgLi4uaW5pdCxcclxuICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIixcclxuICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbihcclxuICAgICAge1xyXG4gICAgICAgIGVycm9yOiBcIk1hdGNoRm9yZ2UgQVBJIGlzIHVucmVhY2hhYmxlLiBTdGFydCBiYWNrZW5kIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC5cIlxyXG4gICAgICB9LFxyXG4gICAgICB7IHN0YXR1czogNTAzIH1cclxuICAgICk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICB9XHJcbiAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gbmV3IEhlYWRlcnMocmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgcmVzcG9uc2VIZWFkZXJzLmRlbGV0ZShcImNvbnRlbnQtZW5jb2RpbmdcIik7XHJcbiAgcmVzcG9uc2VIZWFkZXJzLmRlbGV0ZShcImNvbnRlbnQtbGVuZ3RoXCIpO1xyXG5cclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKHJlc3BvbnNlLmJvZHksIHtcclxuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCwgY29udGV4dCkge1xyXG4gIHJldHVybiBmb3J3YXJkKHJlcXVlc3QsIGNvbnRleHQpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0LCBjb250ZXh0KSB7XHJcbiAgcmV0dXJuIGZvcndhcmQocmVxdWVzdCwgY29udGV4dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdCwgY29udGV4dCkge1xyXG4gIHJldHVybiBmb3J3YXJkKHJlcXVlc3QsIGNvbnRleHQpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcXVlc3QsIGNvbnRleHQpIHtcclxuICByZXR1cm4gZm9yd2FyZChyZXF1ZXN0LCBjb250ZXh0KTtcclxufVxyXG4iXSwibmFtZXMiOlsiZHluYW1pYyIsIkFQSV9CQVNFIiwicHJvY2VzcyIsImVudiIsIk1BVENIRk9SR0VfQVBJX0JBU0UiLCJmb3J3YXJkIiwicmVxdWVzdCIsImNvbnRleHQiLCJwYXJhbXMiLCJwYXRoIiwiam9pbiIsInRhcmdldCIsIlVSTCIsInNlYXJjaCIsInVybCIsImhlYWRlcnMiLCJIZWFkZXJzIiwiZGVsZXRlIiwiaW5pdCIsIm1ldGhvZCIsImJvZHkiLCJ0ZXh0IiwiY29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYWJvcnQiLCJyZXNwb25zZSIsImZldGNoIiwiY2FjaGUiLCJzaWduYWwiLCJSZXNwb25zZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImNsZWFyVGltZW91dCIsInJlc3BvbnNlSGVhZGVycyIsIkdFVCIsIlBPU1QiLCJQVVQiLCJERUxFVEUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/[...path]/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5B...path%5D%2Froute&page=%2Fapi%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5B...path%5D%2Froute.js&appDir=C%3A%5CMatchForge%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CMatchForge%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5B...path%5D%2Froute&page=%2Fapi%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5B...path%5D%2Froute.js&appDir=C%3A%5CMatchForge%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CMatchForge%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_MatchForge_frontend_app_api_path_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/[...path]/route.js */ \"(rsc)/./app/api/[...path]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/[...path]/route\",\n        pathname: \"/api/[...path]\",\n        filename: \"route\",\n        bundlePath: \"app/api/[...path]/route\"\n    },\n    resolvedPagePath: \"C:\\\\MatchForge\\\\frontend\\\\app\\\\api\\\\[...path]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_MatchForge_frontend_app_api_path_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkYlNUIuLi5wYXRoJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkYlNUIuLi5wYXRoJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGJTVCLi4ucGF0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDTWF0Y2hGb3JnZSU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDTWF0Y2hGb3JnZSU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNPO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxNYXRjaEZvcmdlXFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcWy4uLnBhdGhdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9bLi4ucGF0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9bLi4ucGF0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL1suLi5wYXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXE1hdGNoRm9yZ2VcXFxcZnJvbnRlbmRcXFxcYXBwXFxcXGFwaVxcXFxbLi4ucGF0aF1cXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5B...path%5D%2Froute&page=%2Fapi%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5B...path%5D%2Froute.js&appDir=C%3A%5CMatchForge%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CMatchForge%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5B...path%5D%2Froute&page=%2Fapi%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5B...path%5D%2Froute.js&appDir=C%3A%5CMatchForge%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CMatchForge%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();