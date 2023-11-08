"use strict";
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
exports.id = "pages/api/stats";
exports.ids = ["pages/api/stats"];
exports.modules = {

/***/ "jose":
/*!***********************!*\
  !*** external "jose" ***!
  \***********************/
/***/ ((module) => {

module.exports = import("jose");;

/***/ }),

/***/ "(api)/./lib/db/hasura.js":
/*!**************************!*\
  !*** ./lib/db/hasura.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNewUser\": () => (/* binding */ createNewUser),\n/* harmony export */   \"findVideoIdByUser\": () => (/* binding */ findVideoIdByUser),\n/* harmony export */   \"getMyListVideos\": () => (/* binding */ getMyListVideos),\n/* harmony export */   \"getWatchedVideos\": () => (/* binding */ getWatchedVideos),\n/* harmony export */   \"insertStats\": () => (/* binding */ insertStats),\n/* harmony export */   \"isNewUser\": () => (/* binding */ isNewUser),\n/* harmony export */   \"updateStats\": () => (/* binding */ updateStats)\n/* harmony export */ });\nasync function insertStats(token, { favourited , userId , watched , videoId  }) {\n    const operationsDoc = `\n  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {\n    insert_stats_one(object: {\n      favourited: $favourited, \n      userId: $userId, \n      watched: $watched, \n      videoId: $videoId\n    }) {\n        favourited\n        userId\n    }\n  }\n`;\n    return await queryHasuraGQL(operationsDoc, \"insertStats\", {\n        favourited,\n        userId,\n        watched,\n        videoId\n    }, token);\n}\nasync function updateStats(token, { favourited , userId , watched , videoId  }) {\n    const operationsDoc = `\nmutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {\n  update_stats(\n    _set: {watched: $watched, favourited: $favourited}, \n    where: {\n      userId: {_eq: $userId}, \n      videoId: {_eq: $videoId}\n    }) {\n    returning {\n      favourited,\n      userId,\n      watched,\n      videoId\n    }\n  }\n}\n`;\n    return await queryHasuraGQL(operationsDoc, \"updateStats\", {\n        favourited,\n        userId,\n        watched,\n        videoId\n    }, token);\n}\nasync function findVideoIdByUser(token, userId, videoId) {\n    const operationsDoc = `\n  query findVideoIdByUserId($userId: String!, $videoId: String!) {\n    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {\n      id\n      userId\n      videoId\n      favourited\n      watched\n    }\n  }\n`;\n    const response = await queryHasuraGQL(operationsDoc, \"findVideoIdByUserId\", {\n        videoId,\n        userId\n    }, token);\n    return response?.data?.stats;\n}\nasync function createNewUser(token, metadata) {\n    const operationsDoc = `\n  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {\n    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {\n      returning {\n        email\n        id\n        issuer\n      }\n    }\n  }\n`;\n    const { issuer , email , publicAddress  } = metadata;\n    const response = await queryHasuraGQL(operationsDoc, \"createNewUser\", {\n        issuer,\n        email,\n        publicAddress\n    }, token);\n    return response;\n}\nasync function isNewUser(token, issuer) {\n    const operationsDoc = `\n  query isNewUser($issuer: String!) {\n    users(where: {issuer: {_eq: $issuer}}) {\n      id\n      email\n      issuer\n    }\n  }\n`;\n    const response = await queryHasuraGQL(operationsDoc, \"isNewUser\", {\n        issuer\n    }, token);\n    return response?.data?.users?.length === 0;\n}\nasync function queryHasuraGQL(operationsDoc, operationName, variables, token) {\n    const result = await fetch(\"https://trusting-jawfish-54.hasura.app/v1/graphql\", {\n        method: \"POST\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n            \"Content-type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            query: operationsDoc,\n            variables: variables,\n            operationName: operationName\n        })\n    });\n    return await result.json();\n}\nasync function getWatchedVideos(userId, token) {\n    const operationsDoc = `\n  query watchedVideos($userId: String!) {\n    stats(where: {\n      watched: {_eq: true}, \n      userId: {_eq: $userId},\n    }) {\n      videoId\n    }\n  }\n`;\n    const response = await queryHasuraGQL(operationsDoc, \"watchedVideos\", {\n        userId\n    }, token);\n    return response?.data?.stats;\n}\nasync function getMyListVideos(userId, token) {\n    const operationsDoc = `\n  query favouritedVideos($userId: String!) {\n    stats(where: {\n      userId: {_eq: $userId}, \n      favourited: {_eq: 1}\n    }) {\n      videoId\n    }\n  }\n`;\n    const response = await queryHasuraGQL(operationsDoc, \"favouritedVideos\", {\n        userId\n    }, token);\n    return response?.data?.stats;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0NBQzVCO0FBRU0sZUFBZUMsZ0JBQWdCLENBQUNqQyxNQUFNLEVBQUVGLEtBQUssRUFBRTtJQUNwRCxNQUFNSyxhQUFhLEdBQUcsQ0FBQzs7Ozs7Ozs7O0FBU3pCLENBQUM7SUFFQyxNQUFNSSxRQUFRLEdBQUcsTUFBTUgsY0FBYyxDQUNuQ0QsYUFBYSxFQUNiLGVBQWUsRUFDZjtRQUNFSCxNQUFNO0tBQ1AsRUFDREYsS0FBSyxDQUNOO0lBRUQsT0FBT1MsUUFBUSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssQ0FBQztDQUM5QjtBQUVNLGVBQWV5QixlQUFlLENBQUNsQyxNQUFNLEVBQUVGLEtBQUssRUFBRTtJQUNuRCxNQUFNSyxhQUFhLEdBQUcsQ0FBQzs7Ozs7Ozs7O0FBU3pCLENBQUM7SUFFQyxNQUFNSSxRQUFRLEdBQUcsTUFBTUgsY0FBYyxDQUNuQ0QsYUFBYSxFQUNiLGtCQUFrQixFQUNsQjtRQUNFSCxNQUFNO0tBQ1AsRUFDREYsS0FBSyxDQUNOO0lBRUQsT0FBT1MsUUFBUSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssQ0FBQztDQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2Rpc2NvdmVyLXZpZGVvcy1hdG9taWMvLi9saWIvZGIvaGFzdXJhLmpzP2FmMmMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc2VydFN0YXRzKFxuICB0b2tlbixcbiAgeyBmYXZvdXJpdGVkLCB1c2VySWQsIHdhdGNoZWQsIHZpZGVvSWQgfVxuKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnNEb2MgPSBgXG4gIG11dGF0aW9uIGluc2VydFN0YXRzKCRmYXZvdXJpdGVkOiBJbnQhLCAkdXNlcklkOiBTdHJpbmchLCAkd2F0Y2hlZDogQm9vbGVhbiEsICR2aWRlb0lkOiBTdHJpbmchKSB7XG4gICAgaW5zZXJ0X3N0YXRzX29uZShvYmplY3Q6IHtcbiAgICAgIGZhdm91cml0ZWQ6ICRmYXZvdXJpdGVkLCBcbiAgICAgIHVzZXJJZDogJHVzZXJJZCwgXG4gICAgICB3YXRjaGVkOiAkd2F0Y2hlZCwgXG4gICAgICB2aWRlb0lkOiAkdmlkZW9JZFxuICAgIH0pIHtcbiAgICAgICAgZmF2b3VyaXRlZFxuICAgICAgICB1c2VySWRcbiAgICB9XG4gIH1cbmA7XG5cbiAgcmV0dXJuIGF3YWl0IHF1ZXJ5SGFzdXJhR1FMKFxuICAgIG9wZXJhdGlvbnNEb2MsXG4gICAgXCJpbnNlcnRTdGF0c1wiLFxuICAgIHsgZmF2b3VyaXRlZCwgdXNlcklkLCB3YXRjaGVkLCB2aWRlb0lkIH0sXG4gICAgdG9rZW5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKFxuICB0b2tlbixcbiAgeyBmYXZvdXJpdGVkLCB1c2VySWQsIHdhdGNoZWQsIHZpZGVvSWQgfVxuKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnNEb2MgPSBgXG5tdXRhdGlvbiB1cGRhdGVTdGF0cygkZmF2b3VyaXRlZDogSW50ISwgJHVzZXJJZDogU3RyaW5nISwgJHdhdGNoZWQ6IEJvb2xlYW4hLCAkdmlkZW9JZDogU3RyaW5nISkge1xuICB1cGRhdGVfc3RhdHMoXG4gICAgX3NldDoge3dhdGNoZWQ6ICR3YXRjaGVkLCBmYXZvdXJpdGVkOiAkZmF2b3VyaXRlZH0sIFxuICAgIHdoZXJlOiB7XG4gICAgICB1c2VySWQ6IHtfZXE6ICR1c2VySWR9LCBcbiAgICAgIHZpZGVvSWQ6IHtfZXE6ICR2aWRlb0lkfVxuICAgIH0pIHtcbiAgICByZXR1cm5pbmcge1xuICAgICAgZmF2b3VyaXRlZCxcbiAgICAgIHVzZXJJZCxcbiAgICAgIHdhdGNoZWQsXG4gICAgICB2aWRlb0lkXG4gICAgfVxuICB9XG59XG5gO1xuXG4gIHJldHVybiBhd2FpdCBxdWVyeUhhc3VyYUdRTChcbiAgICBvcGVyYXRpb25zRG9jLFxuICAgIFwidXBkYXRlU3RhdHNcIixcbiAgICB7IGZhdm91cml0ZWQsIHVzZXJJZCwgd2F0Y2hlZCwgdmlkZW9JZCB9LFxuICAgIHRva2VuXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kVmlkZW9JZEJ5VXNlcih0b2tlbiwgdXNlcklkLCB2aWRlb0lkKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnNEb2MgPSBgXG4gIHF1ZXJ5IGZpbmRWaWRlb0lkQnlVc2VySWQoJHVzZXJJZDogU3RyaW5nISwgJHZpZGVvSWQ6IFN0cmluZyEpIHtcbiAgICBzdGF0cyh3aGVyZTogeyB1c2VySWQ6IHtfZXE6ICR1c2VySWR9LCB2aWRlb0lkOiB7X2VxOiAkdmlkZW9JZCB9fSkge1xuICAgICAgaWRcbiAgICAgIHVzZXJJZFxuICAgICAgdmlkZW9JZFxuICAgICAgZmF2b3VyaXRlZFxuICAgICAgd2F0Y2hlZFxuICAgIH1cbiAgfVxuYDtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SGFzdXJhR1FMKFxuICAgIG9wZXJhdGlvbnNEb2MsXG4gICAgXCJmaW5kVmlkZW9JZEJ5VXNlcklkXCIsXG4gICAge1xuICAgICAgdmlkZW9JZCxcbiAgICAgIHVzZXJJZCxcbiAgICB9LFxuICAgIHRva2VuXG4gICk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlPy5kYXRhPy5zdGF0cztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld1VzZXIodG9rZW4sIG1ldGFkYXRhKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnNEb2MgPSBgXG4gIG11dGF0aW9uIGNyZWF0ZU5ld1VzZXIoJGlzc3VlcjogU3RyaW5nISwgJGVtYWlsOiBTdHJpbmchLCAkcHVibGljQWRkcmVzczogU3RyaW5nISkge1xuICAgIGluc2VydF91c2VycyhvYmplY3RzOiB7ZW1haWw6ICRlbWFpbCwgaXNzdWVyOiAkaXNzdWVyLCBwdWJsaWNBZGRyZXNzOiAkcHVibGljQWRkcmVzc30pIHtcbiAgICAgIHJldHVybmluZyB7XG4gICAgICAgIGVtYWlsXG4gICAgICAgIGlkXG4gICAgICAgIGlzc3VlclxuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcblxuICBjb25zdCB7IGlzc3VlciwgZW1haWwsIHB1YmxpY0FkZHJlc3MgfSA9IG1ldGFkYXRhO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SGFzdXJhR1FMKFxuICAgIG9wZXJhdGlvbnNEb2MsXG4gICAgXCJjcmVhdGVOZXdVc2VyXCIsXG4gICAge1xuICAgICAgaXNzdWVyLFxuICAgICAgZW1haWwsXG4gICAgICBwdWJsaWNBZGRyZXNzLFxuICAgIH0sXG4gICAgdG9rZW5cbiAgKTtcblxuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc05ld1VzZXIodG9rZW4sIGlzc3Vlcikge1xuICBjb25zdCBvcGVyYXRpb25zRG9jID0gYFxuICBxdWVyeSBpc05ld1VzZXIoJGlzc3VlcjogU3RyaW5nISkge1xuICAgIHVzZXJzKHdoZXJlOiB7aXNzdWVyOiB7X2VxOiAkaXNzdWVyfX0pIHtcbiAgICAgIGlkXG4gICAgICBlbWFpbFxuICAgICAgaXNzdWVyXG4gICAgfVxuICB9XG5gO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcXVlcnlIYXN1cmFHUUwoXG4gICAgb3BlcmF0aW9uc0RvYyxcbiAgICBcImlzTmV3VXNlclwiLFxuICAgIHtcbiAgICAgIGlzc3VlcixcbiAgICB9LFxuICAgIHRva2VuXG4gICk7XG5cbiAgcmV0dXJuIHJlc3BvbnNlPy5kYXRhPy51c2Vycz8ubGVuZ3RoID09PSAwO1xufVxuXG5hc3luYyBmdW5jdGlvbiBxdWVyeUhhc3VyYUdRTChvcGVyYXRpb25zRG9jLCBvcGVyYXRpb25OYW1lLCB2YXJpYWJsZXMsIHRva2VuKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0hBU1VSQV9BRE1JTl9VUkwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBxdWVyeTogb3BlcmF0aW9uc0RvYyxcbiAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgb3BlcmF0aW9uTmFtZTogb3BlcmF0aW9uTmFtZSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgcmV0dXJuIGF3YWl0IHJlc3VsdC5qc29uKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXYXRjaGVkVmlkZW9zKHVzZXJJZCwgdG9rZW4pIHtcbiAgY29uc3Qgb3BlcmF0aW9uc0RvYyA9IGBcbiAgcXVlcnkgd2F0Y2hlZFZpZGVvcygkdXNlcklkOiBTdHJpbmchKSB7XG4gICAgc3RhdHMod2hlcmU6IHtcbiAgICAgIHdhdGNoZWQ6IHtfZXE6IHRydWV9LCBcbiAgICAgIHVzZXJJZDoge19lcTogJHVzZXJJZH0sXG4gICAgfSkge1xuICAgICAgdmlkZW9JZFxuICAgIH1cbiAgfVxuYDtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHF1ZXJ5SGFzdXJhR1FMKFxuICAgIG9wZXJhdGlvbnNEb2MsXG4gICAgXCJ3YXRjaGVkVmlkZW9zXCIsXG4gICAge1xuICAgICAgdXNlcklkLFxuICAgIH0sXG4gICAgdG9rZW5cbiAgKTtcblxuICByZXR1cm4gcmVzcG9uc2U/LmRhdGE/LnN0YXRzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TXlMaXN0VmlkZW9zKHVzZXJJZCwgdG9rZW4pIHtcbiAgY29uc3Qgb3BlcmF0aW9uc0RvYyA9IGBcbiAgcXVlcnkgZmF2b3VyaXRlZFZpZGVvcygkdXNlcklkOiBTdHJpbmchKSB7XG4gICAgc3RhdHMod2hlcmU6IHtcbiAgICAgIHVzZXJJZDoge19lcTogJHVzZXJJZH0sIFxuICAgICAgZmF2b3VyaXRlZDoge19lcTogMX1cbiAgICB9KSB7XG4gICAgICB2aWRlb0lkXG4gICAgfVxuICB9XG5gO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcXVlcnlIYXN1cmFHUUwoXG4gICAgb3BlcmF0aW9uc0RvYyxcbiAgICBcImZhdm91cml0ZWRWaWRlb3NcIixcbiAgICB7XG4gICAgICB1c2VySWQsXG4gICAgfSxcbiAgICB0b2tlblxuICApO1xuXG4gIHJldHVybiByZXNwb25zZT8uZGF0YT8uc3RhdHM7XG59XG4iXSwibmFtZXMiOlsiaW5zZXJ0U3RhdHMiLCJ0b2tlbiIsImZhdm91cml0ZWQiLCJ1c2VySWQiLCJ3YXRjaGVkIiwidmlkZW9JZCIsIm9wZXJhdGlvbnNEb2MiLCJxdWVyeUhhc3VyYUdRTCIsInVwZGF0ZVN0YXRzIiwiZmluZFZpZGVvSWRCeVVzZXIiLCJyZXNwb25zZSIsImRhdGEiLCJzdGF0cyIsImNyZWF0ZU5ld1VzZXIiLCJtZXRhZGF0YSIsImlzc3VlciIsImVtYWlsIiwicHVibGljQWRkcmVzcyIsImlzTmV3VXNlciIsInVzZXJzIiwibGVuZ3RoIiwib3BlcmF0aW9uTmFtZSIsInZhcmlhYmxlcyIsInJlc3VsdCIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0hBU1VSQV9BRE1JTl9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJqc29uIiwiZ2V0V2F0Y2hlZFZpZGVvcyIsImdldE15TGlzdFZpZGVvcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/db/hasura.js\n");

/***/ }),

/***/ "(api)/./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"verifyToken\": () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jose */ \"jose\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jose__WEBPACK_IMPORTED_MODULE_0__]);\njose__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nasync function verifyToken(token) {\n    try {\n        if (token) {\n            const verified = await (0,jose__WEBPACK_IMPORTED_MODULE_0__.jwtVerify)(token, new TextEncoder().encode(process.env.JWT_SECRET));\n            return verified.payload && verified.payload?.issuer;\n        }\n        return null;\n    } catch (err) {\n        console.error({\n            err\n        });\n        return null;\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvdXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFFMUIsZUFBZUMsV0FBVyxDQUFDQyxLQUFLLEVBQUU7SUFDdkMsSUFBSTtRQUNGLElBQUlBLEtBQUssRUFBRTtZQUNULE1BQU1DLFFBQVEsR0FBRyxNQUFNSCwrQ0FBUyxDQUM5QkUsS0FBSyxFQUNMLElBQUlFLFdBQVcsRUFBRSxDQUFDQyxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUMsQ0FDakQ7WUFDRCxPQUFPTCxRQUFRLENBQUNNLE9BQU8sSUFBSU4sUUFBUSxDQUFDTSxPQUFPLEVBQUVDLE1BQU0sQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2IsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7UUFDWkMsT0FBTyxDQUFDQyxLQUFLLENBQUM7WUFBRUYsR0FBRztTQUFFLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztLQUNiO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNjb3Zlci12aWRlb3MtYXRvbWljLy4vbGliL3V0aWxzLmpzPzhhMWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgand0VmVyaWZ5IH0gZnJvbSBcImpvc2VcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeVRva2VuKHRva2VuKSB7XG4gIHRyeSB7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0IGp3dFZlcmlmeShcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgKTtcbiAgICAgIHJldHVybiB2ZXJpZmllZC5wYXlsb2FkICYmIHZlcmlmaWVkLnBheWxvYWQ/Lmlzc3VlcjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoeyBlcnIgfSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJqd3RWZXJpZnkiLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwidmVyaWZpZWQiLCJUZXh0RW5jb2RlciIsImVuY29kZSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwicGF5bG9hZCIsImlzc3VlciIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/utils.js\n");

/***/ }),

/***/ "(api)/./pages/api/stats.js":
/*!****************************!*\
  !*** ./pages/api/stats.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ stats)\n/* harmony export */ });\n/* harmony import */ var _lib_db_hasura__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/db/hasura */ \"(api)/./lib/db/hasura.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ \"(api)/./lib/utils.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_utils__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_utils__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function stats(req, resp) {\n    try {\n        const token = req.cookies.token;\n        if (!token) {\n            resp.status(403).send({});\n        } else {\n            const inputParams = req.method === \"POST\" ? req.body : req.query;\n            const { videoId  } = inputParams;\n            if (videoId) {\n                const userId = await (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(token);\n                const findVideo = await (0,_lib_db_hasura__WEBPACK_IMPORTED_MODULE_0__.findVideoIdByUser)(token, userId, videoId);\n                const doesStatsExist = findVideo?.length > 0;\n                if (req.method === \"POST\") {\n                    const { favourited , watched =true  } = req.body;\n                    if (doesStatsExist) {\n                        // update it\n                        const response = await (0,_lib_db_hasura__WEBPACK_IMPORTED_MODULE_0__.updateStats)(token, {\n                            watched,\n                            userId,\n                            videoId,\n                            favourited\n                        });\n                        resp.send({\n                            data: response\n                        });\n                    } else {\n                        // add it\n                        const response1 = await (0,_lib_db_hasura__WEBPACK_IMPORTED_MODULE_0__.insertStats)(token, {\n                            watched,\n                            userId,\n                            videoId,\n                            favourited\n                        });\n                        resp.send({\n                            data: response1\n                        });\n                    }\n                } else {\n                    if (doesStatsExist) {\n                        resp.send(findVideo);\n                    } else {\n                        resp.status(404);\n                        resp.send({\n                            user: null,\n                            msg: \"Video not found\"\n                        });\n                    }\n                }\n            }\n        }\n    } catch (error) {\n        console.error(\"Error occurred /stats\", error);\n        resp.status(500).send({\n            done: false,\n            error: error?.message\n        });\n    }\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RhdHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSTZCO0FBQ2lCO0FBRS9CLGVBQWVJLEtBQUssQ0FBQ0MsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFDN0MsSUFBSTtRQUNGLE1BQU1DLEtBQUssR0FBR0YsR0FBRyxDQUFDRyxPQUFPLENBQUNELEtBQUs7UUFDL0IsSUFBSSxDQUFDQSxLQUFLLEVBQUU7WUFDVkQsSUFBSSxDQUFDRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQixNQUFNO1lBQ0wsTUFBTUMsV0FBVyxHQUFHTixHQUFHLENBQUNPLE1BQU0sS0FBSyxNQUFNLEdBQUdQLEdBQUcsQ0FBQ1EsSUFBSSxHQUFHUixHQUFHLENBQUNTLEtBQUs7WUFDaEUsTUFBTSxFQUFFQyxPQUFPLEdBQUUsR0FBR0osV0FBVztZQUMvQixJQUFJSSxPQUFPLEVBQUU7Z0JBQ1gsTUFBTUMsTUFBTSxHQUFHLE1BQU1iLHVEQUFXLENBQUNJLEtBQUssQ0FBQztnQkFDdkMsTUFBTVUsU0FBUyxHQUFHLE1BQU1qQixpRUFBaUIsQ0FBQ08sS0FBSyxFQUFFUyxNQUFNLEVBQUVELE9BQU8sQ0FBQztnQkFDakUsTUFBTUcsY0FBYyxHQUFHRCxTQUFTLEVBQUVFLE1BQU0sR0FBRyxDQUFDO2dCQUU1QyxJQUFJZCxHQUFHLENBQUNPLE1BQU0sS0FBSyxNQUFNLEVBQUU7b0JBQ3pCLE1BQU0sRUFBRVEsVUFBVSxHQUFFQyxPQUFPLEVBQUcsSUFBSSxHQUFFLEdBQUdoQixHQUFHLENBQUNRLElBQUk7b0JBQy9DLElBQUlLLGNBQWMsRUFBRTt3QkFDbEIsWUFBWTt3QkFDWixNQUFNSSxRQUFRLEdBQUcsTUFBTXJCLDJEQUFXLENBQUNNLEtBQUssRUFBRTs0QkFDeENjLE9BQU87NEJBQ1BMLE1BQU07NEJBQ05ELE9BQU87NEJBQ1BLLFVBQVU7eUJBQ1gsQ0FBQzt3QkFDRmQsSUFBSSxDQUFDSSxJQUFJLENBQUM7NEJBQUVhLElBQUksRUFBRUQsUUFBUTt5QkFBRSxDQUFDLENBQUM7cUJBQy9CLE1BQU07d0JBQ0wsU0FBUzt3QkFDVCxNQUFNQSxTQUFRLEdBQUcsTUFBTXBCLDJEQUFXLENBQUNLLEtBQUssRUFBRTs0QkFDeENjLE9BQU87NEJBQ1BMLE1BQU07NEJBQ05ELE9BQU87NEJBQ1BLLFVBQVU7eUJBQ1gsQ0FBQzt3QkFDRmQsSUFBSSxDQUFDSSxJQUFJLENBQUM7NEJBQUVhLElBQUksRUFBRUQsU0FBUTt5QkFBRSxDQUFDLENBQUM7cUJBQy9CO2lCQUNGLE1BQU07b0JBQ0wsSUFBSUosY0FBYyxFQUFFO3dCQUNsQlosSUFBSSxDQUFDSSxJQUFJLENBQUNPLFNBQVMsQ0FBQyxDQUFDO3FCQUN0QixNQUFNO3dCQUNMWCxJQUFJLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakJILElBQUksQ0FBQ0ksSUFBSSxDQUFDOzRCQUFFYyxJQUFJLEVBQUUsSUFBSTs0QkFBRUMsR0FBRyxFQUFFLGlCQUFpQjt5QkFBRSxDQUFDLENBQUM7cUJBQ25EO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUMsT0FBT0MsS0FBSyxFQUFFO1FBQ2RDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLHVCQUF1QixFQUFFQSxLQUFLLENBQUMsQ0FBQztRQUM5Q3BCLElBQUksQ0FBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRWtCLElBQUksRUFBRSxLQUFLO1lBQUVGLEtBQUssRUFBRUEsS0FBSyxFQUFFRyxPQUFPO1NBQUUsQ0FBQyxDQUFDO0tBQy9EO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNjb3Zlci12aWRlb3MtYXRvbWljLy4vcGFnZXMvYXBpL3N0YXRzLmpzPzg0ZmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZmluZFZpZGVvSWRCeVVzZXIsXG4gIHVwZGF0ZVN0YXRzLFxuICBpbnNlcnRTdGF0cyxcbn0gZnJvbSBcIi4uLy4uL2xpYi9kYi9oYXN1cmFcIjtcbmltcG9ydCB7IHZlcmlmeVRva2VuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzdGF0cyhyZXEsIHJlc3ApIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5jb29raWVzLnRva2VuO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJlc3Auc3RhdHVzKDQwMykuc2VuZCh7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlucHV0UGFyYW1zID0gcmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIgPyByZXEuYm9keSA6IHJlcS5xdWVyeTtcbiAgICAgIGNvbnN0IHsgdmlkZW9JZCB9ID0gaW5wdXRQYXJhbXM7XG4gICAgICBpZiAodmlkZW9JZCkge1xuICAgICAgICBjb25zdCB1c2VySWQgPSBhd2FpdCB2ZXJpZnlUb2tlbih0b2tlbik7XG4gICAgICAgIGNvbnN0IGZpbmRWaWRlbyA9IGF3YWl0IGZpbmRWaWRlb0lkQnlVc2VyKHRva2VuLCB1c2VySWQsIHZpZGVvSWQpO1xuICAgICAgICBjb25zdCBkb2VzU3RhdHNFeGlzdCA9IGZpbmRWaWRlbz8ubGVuZ3RoID4gMDtcblxuICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICBjb25zdCB7IGZhdm91cml0ZWQsIHdhdGNoZWQgPSB0cnVlIH0gPSByZXEuYm9keTtcbiAgICAgICAgICBpZiAoZG9lc1N0YXRzRXhpc3QpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBpdFxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVTdGF0cyh0b2tlbiwge1xuICAgICAgICAgICAgICB3YXRjaGVkLFxuICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgIHZpZGVvSWQsXG4gICAgICAgICAgICAgIGZhdm91cml0ZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3Auc2VuZCh7IGRhdGE6IHJlc3BvbnNlIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBhZGQgaXRcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaW5zZXJ0U3RhdHModG9rZW4sIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZCxcbiAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICB2aWRlb0lkLFxuICAgICAgICAgICAgICBmYXZvdXJpdGVkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNwLnNlbmQoeyBkYXRhOiByZXNwb25zZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGRvZXNTdGF0c0V4aXN0KSB7XG4gICAgICAgICAgICByZXNwLnNlbmQoZmluZFZpZGVvKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcC5zdGF0dXMoNDA0KTtcbiAgICAgICAgICAgIHJlc3Auc2VuZCh7IHVzZXI6IG51bGwsIG1zZzogXCJWaWRlbyBub3QgZm91bmRcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIG9jY3VycmVkIC9zdGF0c1wiLCBlcnJvcik7XG4gICAgcmVzcC5zdGF0dXMoNTAwKS5zZW5kKHsgZG9uZTogZmFsc2UsIGVycm9yOiBlcnJvcj8ubWVzc2FnZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImZpbmRWaWRlb0lkQnlVc2VyIiwidXBkYXRlU3RhdHMiLCJpbnNlcnRTdGF0cyIsInZlcmlmeVRva2VuIiwic3RhdHMiLCJyZXEiLCJyZXNwIiwidG9rZW4iLCJjb29raWVzIiwic3RhdHVzIiwic2VuZCIsImlucHV0UGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInF1ZXJ5IiwidmlkZW9JZCIsInVzZXJJZCIsImZpbmRWaWRlbyIsImRvZXNTdGF0c0V4aXN0IiwibGVuZ3RoIiwiZmF2b3VyaXRlZCIsIndhdGNoZWQiLCJyZXNwb25zZSIsImRhdGEiLCJ1c2VyIiwibXNnIiwiZXJyb3IiLCJjb25zb2xlIiwiZG9uZSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/stats.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/stats.js"));
module.exports = __webpack_exports__;

})();