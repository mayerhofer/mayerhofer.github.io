// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gEwwu":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0bcb44a518dbc454";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"1SICI":[function(require,module,exports) {
// Main JS file
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _rcomponent = require("./framework/RComponent");
var _entity = require("./servers/entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
// components
var _financeForm = require("./busCompts/financeForm");
var _financeFormDefault = parcelHelpers.interopDefault(_financeForm);
var _genericTableJs = require("./busCompts/genericTable.js");
var _genericTableJsDefault = parcelHelpers.interopDefault(_genericTableJs);
var _liabilityForm = require("./busCompts/liabilityForm");
var _liabilityFormDefault = parcelHelpers.interopDefault(_liabilityForm);
var _liabilityReport = require("./busCompts/liabilityReport");
var _liabilityReportDefault = parcelHelpers.interopDefault(_liabilityReport);
var _toastJs = require("./components/toast.js");
var _toastJsDefault = parcelHelpers.interopDefault(_toastJs);
var _divJs = require("./html/div.js");
var _divJsDefault = parcelHelpers.interopDefault(_divJs);
var _stackTraceJs = require("./html/stackTrace.js");
var _stackTraceJsDefault = parcelHelpers.interopDefault(_stackTraceJs);
var _dateFieldJs = require("./html/dateField.js");
var _dateFieldJsDefault = parcelHelpers.interopDefault(_dateFieldJs);
var _buttonJs = require("./html/button.js");
var _buttonJsDefault = parcelHelpers.interopDefault(_buttonJs);
var _imageJs = require("./html/image.js");
var _imageJsDefault = parcelHelpers.interopDefault(_imageJs);
window.application = (0, _rcomponent.application);
// Page - Components - End Liability Report 
/////////////////////////////////////////////
// Page - Business Components - End Generic Data Table
/////////////////////////////////////////////
class FileForm extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
    }
    handleInputFileChange(e) {
        console.log(e);
        var file = e.files[0];
        Tesseract.recognize(file, "cat", {
            logger: (m)=>console.log(m)
        }).then(({ data: { text } })=>{
            const re = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[.\/\-](0?[1-9]|1[012])[.\/\-](\d{4}|\d{2})/);
            const datesFound = text.match(re);
            if (datesFound) console.log("Date: " + datesFound[0]);
            console.log(text);
        });
    }
    render() {
        this.registerHandler("myTesseractFile", (e)=>this.handleInputFileChange.bind(this)(e));
        return this.fill("tesseractForm", {
            id: "myTesseractFile" /*this.id*/ 
        });
    }
}
// ///////////////////////////////////////////
// Page - Components - BlogPage
class BlogPage extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
    }
    render() {
        let posts = this.props.posts.map((post)=>this.fill("blogPost", post));
        return this.fill("blogContainer", {
            children: posts
        });
    }
}
/////////////////////////////////////////////
// Page - Components - LogInForm
class LogInForm extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        this.state = {
            countryUrl: "",
            entityUrl: ""
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    handleCountryUrlUpdate(e) {
        try {
            if (localStorage) {
                localStorage.setItem("countryUrl", e.value);
                this.setState({
                    countryUrl: e.value
                });
            } else {
                alert(" no local storage ");
                window.myStorage = Object.assign({}, {
                    countryUrl: e.value
                }, window.myStorage);
            }
            alert("country updated: " + e.value);
        } catch (ex) {
            alert(ex.message);
        }
    }
    handleEntityUrlUpdate(e) {
        try {
            if (localStorage) {
                localStorage.setItem("entityUrl", e.value);
                this.setState({
                    entityUrl: e.value
                });
            } else {
                alert(" no local storage ");
                window.myStorage = Object.assign({}, {
                    entityUrl: e.value
                }, window.myStorage);
            }
            alert("entity update: " + e.value);
        } catch (ex) {
            alert(ex.message);
        }
    }
    handleLogIn(e) {
        e.preventDefault();
        localStorage.setItem("countryUrl", this.state.countryUrl);
        localStorage.setItem("entityUrl", this.state.entityUrl);
    }
    render() {
        this.registerHandler(this.id + "CountryChange", this.handleCountryUrlUpdate.bind(this));
        this.registerHandler(this.id + "EntityChange", this.handleEntityUrlUpdate.bind(this));
        this.registerHandler(this.id + "Submit", this.handleLogIn.bind(this));
        return this.fill("LogInForm", {
            id: this.id
        });
    }
}
// ///////////////////////////////////////////
// Page - Components - Wish List Form
class WishListForm extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        if (typeof this.props.element === "object") this.isEditMode = true;
        else if (Array.isArray(this.props.data)) this.isEditMode = false;
        else throw "Missing prop cashflow array or cashflow element";
        this.state = {
            nextElementId: this.isEditMode ? this.props.element.elementId : this.props.data.length > 0 ? this.props.data.map((d)=>d.elementId).filter((id)=>id > 0).sort((a, b)=>a - b).pop() + 1 : 1,
            date: this.isEditMode ? new Date(props.element.date) : new Date(),
            what: this.isEditMode ? props.element.what : "",
            labels: this.isEditMode ? [
                props.element.label
            ] : [
                ""
            ],
            validationState: {
                what: {
                    validDef: {
                        required: true,
                        restricted: false
                    }
                },
                labels: {
                    validDef: {
                        required: true,
                        restricted: true,
                        options: props.labelOptions
                    }
                }
            }
        };
    }
    handleUpdateDate(e) {
        this.setState({
            date: new Date(e.value)
        });
    }
    handleWhatChange(what) {
        this.setState({
            what
        });
    }
    handleLabelChange(e) {
        this.setState({
            labels: [
                e.value
            ]
        });
    }
    handleSave() {
        const dt = this.state.date;
        const id = this.state.nextElementId;
        const element = {
            date: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
            what: this.state.what,
            label: this.state.labels.length > 0 ? this.state.labels[0] : "",
            elementId: id
        };
        const saveObj = this.isEditMode ? Object.assign({}, this.props.element, element) : element;
        //log('info', {message: 'Saving cashflow', stackTrace: element.provider });
        const api = new (0, _entityDefault.default)("wish");
        api.save(saveObj);
    }
    render() {
        // Util Functions
        const buildTb = (props)=>this.buildRComponent(props, (p)=>new TextField(p));
        const buildProps = (label)=>{
            return {
                id: this.id + label,
                label,
                value: this.state[label.toLowerCase()],
                validDef: this.state.validationState[label.toLowerCase()].validDef,
                update: this[`handle${label}Change`].bind(this)
            };
        };
        const labelImgArray = labelImages.map((label)=>this.fill("labelField", {
                id: this.id + "Labels",
                checked: Array.isArray(this.state.labels) && this.state.labels.indexOf(label.label) >= 0 ? "checked" : "",
                ...label
            }));
        const labelProps = {
            id: this.id + "Labels",
            content: labelImgArray.slice(0, 7).join("") + '</ul><ul class="direction">' + labelImgArray.slice(7).join("")
        };
        const dateValue = this.state.date.toISOString().split("T")[0];
        const date = (0, _dateFieldJsDefault.default)(this.id + "Date", "Date", dateValue, this.handleUpdateDate.bind(this));
        const labels = this.fill("labelsField", labelProps);
        const whatProps = buildProps("What");
        const save = (0, _buttonJsDefault.default)("form-button", (0, _imageJsDefault.default)("save"), this.id + "Save", this.handleSave.bind(this));
        const actionButtons = (0, _divJsDefault.default)("buttons", save, this.id + "ActionButtons");
        this.registerHandler(this.id + "Labels", this.handleLabelChange.bind(this));
        return (0, _divJsDefault.default)("page", actionButtons + date + buildTb(whatProps) + labels, this.id);
    }
}
// Page - Components - End Wish List Form
/////////////////////////////////////////////
/////////////////////////////////////////////
// Page - Components - Modal
/*{ADDED_CODE}*/ /////////////////////////////////////////////
// Page - Menu Loaders
const commonFormatters = {
    date: (row)=>{
        let obj = new Date(row.date);
        let day = obj.getDate();
        let month = obj.getMonth();
        let strDay = day < 10 ? "0" + day.toString() : day.toString();
        let strMonth = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ][month];
        return (0, _divJsDefault.default)("form-date", `${strDay}/${strMonth}`);
    },
    amount: (row)=>{
        const isIncome = row.provider && row.direction || row.cashflowId && !row.liability;
        let content = "";
        if (typeof row.amount === "number") content = row.amount.toFixed(2);
        else content = "--";
        return (0, _divJsDefault.default)("cashflowAmount" + (isIncome ? " income" : " expense"), content);
    }
};
window.app = {};
window.app.loadBlog = function() {
    const postApi = new (0, _entityDefault.default)("post");
    postApi.get().then((posts)=>{
        (0, _rcomponent.RComponent).buildRoot({
            id: "blog",
            posts
        }, (p)=>new BlogPage(p));
    });
};
window.app.loadFinance = function() {
    // Register root node
    const props = {
        id: "cfMainTable",
        entity: "cashflow",
        filter: {
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        },
        idEditComponent: "fincForm",
        buildEditComponent: (p)=>new (0, _financeFormDefault.default)(p),
        formatter: {
            ...commonFormatters,
            provider: (row)=>{
                const str = row.provider;
                let content = "";
                if (typeof str === "string") content = str.length > 17 ? str.substring(0, 15) + "..." : str;
                else content = "error: invalid provider";
                return (0, _divJsDefault.default)("cashflowProvider", content);
            }
        }
    };
    (0, _rcomponent.RComponent).buildRoot(props, (p)=>new (0, _genericTableJsDefault.default)(p));
};
window.app.loadErrors = function() {
    // Register root node
    (0, _rcomponent.RComponent).buildRoot({
        id: "logMainTable",
        entity: "errorLog",
        formatter: {
            time: (row)=>{
                const addZero = (num)=>num < 10 ? "0" + num.toString() : num.toString();
                const obj = new Date(row.time);
                const minutes = addZero(obj.getMinutes());
                const hour = addZero(obj.getHours());
                const day = addZero(obj.getDate());
                const month = addZero(obj.getMonth() + 1);
                return (0, _divJsDefault.default)("form-date" + (row.type === "error" ? " expense" : "income"), `${day}/${month}<BR />${hour}:${minutes}`);
            },
            message: (row)=>{
                return (0, _divJsDefault.default)("longtext", `<span>${row.message}</span>`);
            },
            stackTrace: (row)=>{
                return (0, _stackTraceJsDefault.default)(row._id, row.stackTrace.replace(new RegExp("\n    ", "g"), "<BR />"));
            }
        }
    }, (p)=>new (0, _genericTableJsDefault.default)(p));
};
window.app.loadLiability = function() {
    const handleSelect = (element, removeHandler)=>{
        if (typeof element !== "object") return;
        if (typeof removeHandler !== "function") return;
        const api = new (0, _entityDefault.default)("liability");
        element.payed = true;
        element.updated = new Date().getTime();
        api.save(element).then((res)=>{
            removeHandler(element.elementId);
            new (0, _toastJsDefault.default)({
                id: "Toast" + element.elementId,
                type: "info",
                header: "Payed liability",
                text: `CF id: ${element.cashflowId}, amount: ${element.amount}`
            }).render();
        });
    };
    const repProps = {
        id: "liabilityReport"
    };
    const cfApi = new (0, _entityDefault.default)("cashflow");
    cfApi.get({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }).then((res)=>{
        (0, _rcomponent.RComponent).buildRoot({
            id: "liabilityTable",
            entity: "liability",
            handleSelect,
            idEditComponent: "liabilityForm",
            buildEditComponent: (p)=>new (0, _liabilityFormDefault.default)(p),
            formatter: {
                ...commonFormatters,
                provider: (row)=>{
                    //console.log(res)
                    const found = res.find((cf)=>cf.elementId === row.cashflowId);
                    const str = found ? found.provider : "";
                    let content = "";
                    if (typeof str === "string") content = str.length > 17 ? str.substring(0, 15) + "..." : str;
                    else content = "error: invalid provider";
                    return (0, _divJsDefault.default)("cashflowProvider", content);
                }
            },
            header: (p)=>new (0, _liabilityReportDefault.default)(Object.assign({}, p, repProps))
        }, (p)=>new (0, _genericTableJsDefault.default)(p));
    });
};
window.app.loadFinanceReport = function() {
    (0, _rcomponent.RComponent).buildRoot({
        id: "finReport",
        entity: "report",
        formatter: {
            category: (row)=>{
                return (0, _divJsDefault.default)("cashflowProvider", row.category);
            },
            sum1: (row)=>{
                return (0, _divJsDefault.default)("cashflowAmount", row.sum1);
            },
            sum2: (row)=>{
                return (0, _divJsDefault.default)("cashflowAmount", row.sum2);
            },
            sum3: (row)=>{
                return (0, _divJsDefault.default)("cashflowAmount", row.sum3);
            }
        }
    }, (p)=>new (0, _genericTableJsDefault.default)(p));
};
window.app.login = function() {
    // Register root node
    const handleEdit = (data, element)=>{
        (0, _rcomponent.RComponent).buildRoot({
            id: "wishListForm",
            data,
            element
        }, (p)=>new WishListForm(p));
    };
    (0, _rcomponent.RComponent).buildRoot({
        id: "loginForm"
    }, (p)=>new LogInForm(p));
};
window.app.loadWishlist = function() {
    // Register root node
    const handleEdit = (data, element)=>{
        (0, _rcomponent.RComponent).buildRoot({
            id: "wishListForm",
            data,
            element
        }, (p)=>new WishListForm(p));
    };
    (0, _rcomponent.RComponent).buildRoot({
        id: "wishListTable",
        entity: "wish",
        handleEdit,
        formatter: {
            date: commonFormatters.date,
            what: (row)=>{
                return (0, _divJsDefault.default)("cashflowProvider", row.what);
            }
        }
    }, (p)=>new (0, _genericTableJsDefault.default)(p));
};
window.app.loadTesseract = function() {
    (0, _rcomponent.RComponent).buildRoot({
        id: "tesseractForm",
        entity: "tesseract",
        formatter: commonFormatters
    }, (p)=>new FileForm(p));
};
const handleTesseractSubmitFile = function() {
    alert("handling tesseract file");
    let img = document.getElementById("myTesseractFile").files[0];
    //let fullPath = document.getElementById("myTesseractFile").val();
    console.log(img.mozFullPath);
    Tesseract.recognize(img, "cat", {
        logger: (m)=>console.log(m)
    }).then(({ data: { text } })=>{
        console.log(text);
    });
    return false;
};

},{"./framework/RComponent":"iu3rT","./servers/entity":"kW8fe","./busCompts/financeForm":"390bl","./busCompts/genericTable.js":"hHmw3","./busCompts/liabilityForm":"aAgzo","./busCompts/liabilityReport":"bi7Wn","./components/toast.js":"clg1H","./html/div.js":"ie98x","./html/stackTrace.js":"4kl7s","./html/dateField.js":"l1qYn","./html/button.js":"jjZkH","./html/image.js":"d0VA3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iu3rT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "application", ()=>application);
// End Framework - Virtual DOM
// Framework - React Like Components (BASE Component Class)
parcelHelpers.export(exports, "RComponent", ()=>RComponent);
var _templates = require("../templates");
const application = {
    state: {},
    registeredComponents: {},
    handlers: {},
    virtualDom: undefined,
    callHandler: function(event, id) {
        let handler = application.handlers[id];
        if (typeof handler === "function") handler(event);
    }
};
// End Global
// Framework
// Framework - Virtual DOM
// Function "Secret Sauce" to replace page elements instead of asking browser to rewrite the page.
// It transform render HTML text into HTMLElements for a call to child replace.
// Avoids overuse of the innerHTML property and/or the need to re-render siblings.
const parseHtmlToElement = function(id, str) {
    let start = str.substring(str.indexOf("<") + 1);
    let tag = start.substring(0, start.indexOf(" "));
    let element = window.document.createElement(tag);
    let endInx = Math.min(start.indexOf(">"), start.indexOf("/>") < 0 ? start.indexOf(">") : start.indexOf("/>"));
    let propsStartInx = start.indexOf(" ") + 1;
    let childrenEnd = str.lastIndexOf(`</${tag}>`);
    let childrenStart = str.indexOf(">") + 1;
    // Mandatory uppon updating (re-rendering)
    element.setAttribute("id", id);
    // Read main tag properties
    if (propsStartInx < endInx) {
        // TODO: Fix a bug -> some property values could have spaces inside them breaking the parsed result
        // For now I removed empty space from params in handler call from Button, but please fix the split below.
        let props = start.substring(propsStartInx, endInx).split(" ").reduce((previous, kvp)=>{
            let propName = kvp.substring(0, kvp.indexOf("="));
            let propValue = kvp.substring(kvp.indexOf("=") + 1);
            let result = {};
            result[propName] = propValue;
            return Object.assign(previous, result);
        }, {});
        let keys = Object.keys(props);
        keys.forEach((key)=>{
            if (key === "class") element.className = props[key].split('"')[1];
            else if (key && key != "id") element.setAttribute(key, props[key].split('"')[1]);
        });
    }
    // Read children if any
    if (childrenEnd > 0 && childrenStart < childrenEnd) element.innerHTML = str.substring(childrenStart, childrenEnd);
    return element;
};
class TreeNode {
    constructor(value, ancestral){
        if (typeof value !== "object" || !(value instanceof RComponent)) throw 'Argument "value" must be an instance of a class that extends RComponent.';
        if (value.id === "app" && ancestral) throw 'Argument "ancestral" must be null/undefined when node is the root element.';
        if (value.id !== "app" && !(ancestral instanceof TreeNode)) throw 'Argument "ancestral" must be instance of TreeNode/Component. Element id: ' + value.props.id;
        this.value = value;
        // Any components being rendered by the value component. All should be TreeNode instances.
        this.descendants = [];
        // Component that renders the value component. Should be TreeNode instance.
        this.ancestral = ancestral; // Can be null if value is Root Component.
        // Property to store virtual DOM.
        this.virtualDom = "";
    }
    static initialized() {
        let root = application.registeredComponents["app"];
        if (!root) // Build And Register Root
        root = application.registeredComponents["app"] = new TreeNode(new App({
            id: "app"
        }));
        return root;
    }
    static getRegistered(id) {
        return application.registeredComponents[id] ?? false;
    }
    addDescendant(node) {
        if (node instanceof TreeNode) this.descendants.push(node);
        else throw 'Argument "node" (descendant) must be of type TreeNode.';
    }
    releaseDescendants() {
        let item = this.descendants.pop();
        while(item){
            item.value.unmount();
            item = this.descendants.pop();
        }
    }
    hasDescendant() {
        return this.descendants.length > 0;
    }
    findDescendant(id) {
        let found = null;
        if (Array.isArray(this.descendants)) {
            for(let i = 0; i < this.descendants.length; i++)if (this.descendants[i].value.id.startsWith(id, 0)) {
                found = this.descendants[i];
                break;
            }
        }
        return found;
    }
    register() {
        if (this.ancestral) this.ancestral.addDescendant(this);
        if (typeof this.value.props.id === "string" && this.value.props.id.trim().length > 0) {
            // TODO: This can still generate repeated ids, change this solution for IDs.
            this.value.id = this.value.props.id + "_" + (Math.random() * 100000).toFixed();
            application.registeredComponents[this.value.id] = this;
        } else throw "Invalid RComponent: property id is missing or invalid.";
    }
    unregister() {
        if (typeof this.value.id === "string" && this.value.id.trim().length > 0) {
            if (application.registeredComponents[this.value.id]) delete application.registeredComponents[this.value.id];
        } else throw "Invalid RComponent: property id is missing or invalid.";
    }
}
class RComponent {
    constructor(props){
        this.props = props;
    }
    static compare(prevState, nextState) {
        if (prevState === nextState) return true;
        else if (typeof prevState !== typeof nextState || Array.isArray(nextState) !== Array.isArray(prevState)) return false;
        else if (Array.isArray(nextState)) {
            if (nextState.length !== prevState.length) return false;
            else if (nextState.length <= 0) return true;
            for(let i = 0; i < nextState.length; i++){
                if (!RComponent.compare(prevState[i], nextState[i])) return false;
            }
        } else if (typeof nextState === "object" && nextState instanceof Date && prevState instanceof Date) return nextState.getTime() === prevState.getTime();
        else if (typeof nextState === "object") {
            const keys = Object.keys(nextState);
            for(let i = 0; i < keys.length; i++){
                if (!RComponent.compare(prevState[keys[i]], nextState[keys[i]])) return false;
            }
        } else if (prevState !== nextState) return false;
        return true;
    }
    static build(treeParent, props, buildFunc) {
        if (typeof treeParent !== "object" || !(treeParent instanceof TreeNode)) throw 'Method "build", argument "treeParent" missing. Id: ' + (props ? props.id : "");
        if (typeof props !== "object") throw 'Method "build", argument "props" missing. ParentId: ' + (treeParent ? treeParent.value.id : "");
        if (typeof buildFunc !== "function") throw 'Method "build", argument "buildFunc" missing. Id: ' + props.id;
        // Find current node to add future child/descendant component in Tree.
        const found = treeParent.findDescendant(props.id);
        if (found) {
            // Always update new props
            const oldProps = found.value.props;
            let newState;
            // If rule exist or if there a real difference, re-render.
            if (!RComponent.compare(oldProps, props)) {
                if (found.value.getDerivedState) newState = found.value.getDerivedState(props);
                else newState = found.value.state;
                // Check client rule for if should re-render
                if (typeof found.value.shouldComponentUpdate !== "function" || found.value.shouldComponentUpdate(props, newState)) {
                    found.value.state = newState;
                    found.value.props = props;
                    found.virtualDom = found.value.render();
                } else {
                    found.value.state = newState;
                    found.value.props = props;
                }
            }
            // return previously rendered from Tree.
            return found.virtualDom;
        } else {
            // New instance: build and mount component.
            const comp = buildFunc(props);
            const rendered = comp.mount(treeParent);
            // After mounting, return rendered HTML.
            return rendered;
        }
    }
    static buildRoot(props, buildFunc) {
        const tNode = TreeNode.initialized();
        const htmlRoot = window.document.getElementById("app");
        if (tNode.hasDescendant()) {
            let leafToFall = tNode.descendants.pop();
            leafToFall.value.unmount();
        }
        htmlRoot.innerHTML = RComponent.build(tNode, props, buildFunc);
    }
    buildRComponent(props, buildFunc) {
        const tNode = TreeNode.getRegistered(this.id);
        return RComponent.build(tNode, props, buildFunc);
    }
    setState(nextState) {
        // Unmounted components must not update, re-render or have any page interaction.
        if (this.unmounted) return;
        if (nextState == null || typeof nextState === "undefined") return;
        if (!RComponent.compare(this.state, nextState)) {
            let newState;
            if (typeof nextState === "object") newState = Object.assign({}, this.state, nextState);
            else if (typeof nextState === "function") newState = nextState(this.state, this.props);
            else throw "Argumento (nextState) invalido.";
            if (typeof this.shouldComponentUpdate !== "function" || this.shouldComponentUpdate(this.props, newState)) {
                console.log("New state for", this.id, newState);
                this.state = newState;
                // Trigger re-render
                this.update();
            } else {
                console.log("New state for", this.id, newState);
                this.state = newState;
            }
        }
    }
    mount(ancestral) {
        // Register component in Tree.
        let node = null;
        if (this.id || !(node = TreeNode.getRegistered(this.id))) {
            this.id = this.props.id;
            node = new TreeNode(this, ancestral);
            node.register();
        }
        // Trigger component lifecycle method if implemented.
        if (typeof this.componentDidMount === "function") this.componentDidMount();
        // Render through Virtual DOM
        node.virtualDom = this.render();
        return node.virtualDom;
    }
    update() {
        const child = window.document.getElementById(this.id);
        if (typeof child === "object" && child instanceof HTMLElement) {
            const htmlParent = child.parentElement;
            if (htmlParent) {
                //tNode.releaseDescendants();
                var node = TreeNode.getRegistered(this.id);
                node.virtualDom = this.render();
                const newNode = parseHtmlToElement(this.id, node.virtualDom);
                htmlParent.replaceChild(newNode, child);
            } else throw `Parent html element not found for child (${this.id}).`;
        } else throw `Child to be replaced upon update is not a HTMLElement. Child id (${this.id}).`;
    }
    unmount() {
        // Mark unmounted to disable component activites
        this.unmounted = true;
        // Trigger component lifecycle method
        if (typeof this.componentWillUnmount !== "function" || this.componentWillUnmount()) {
            const tNode = TreeNode.getRegistered(this.id);
            if (tNode instanceof TreeNode) {
                tNode.releaseDescendants();
                tNode.unregister();
            } else throw "Found an item not a TreeNode in Tree";
        }
    }
    registerHandler(id, callback) {
        application.handlers[id] = callback;
    }
    fill(itemTemplate, data) {
        let temp = (0, _templates.components)[itemTemplate] ?? itemTemplate;
        let inx = temp.indexOf("{");
        while(inx >= 0){
            let end = temp.indexOf("}");
            let prop = temp.substring(inx + 1, end);
            temp = temp.replace("{" + prop + "}", data[prop.substring(prop.indexOf(".") + 1)]);
            inx = temp.indexOf("{");
        }
        return temp;
    }
}
class App extends RComponent {
    constructor(props){
        super(props);
        // App should not mount, nor render.
        // Id should stay as 'app'.
        // Class was made in order to reuse UPDATE and BUILDRCOMPONENT methods.
        this.id = "app";
    }
}

},{"../templates":"18mfC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"18mfC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "currencies", ()=>currencies);
parcelHelpers.export(exports, "images64", ()=>images64);
parcelHelpers.export(exports, "labelImages", ()=>labelImages);
parcelHelpers.export(exports, "components", ()=>components);
const currencies = {
    "EUR": "&euro;",
    "USD": "&dollar;",
    "GBP": "&pound;",
    "PLN": "Z&#322;",
    "BRL": "R&dollar;",
    "CZK": "K&#269;"
};
const images64 = {
    back: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO2WvUoDQRSFv5ewUBOxtIiVKfUBBA0+R0zis9gpBgtLe3/eJCv2inZu7ExQFm4giDN75u5GUuTAKXaZ4eP+zJ2BlZZQW0AfeAQy4NOc2b8e0KwTuAlcAhPgu8RT4BbYrgo9AcYC8LdzoOOFnlkEqdD56AeeSKcVoPNwOfKGM72xtG8o4OsaoTNfKUemrHvfgD1gPwE8sUwG1RegLVvbToz6NAZ+EKEt+04B38XAz4FN78CurdkBXh11zmLgPLCpqKmqUO3zRYMPPOAnMdUvjlSPlrK5egs8Tt0YuCkOkHakln/5q2yAFBo66lfmC8SLP9TdHn8A64g6FF8cyrV4rEJnGtTwEChmv0sdZ9qL9B5RUWvAuXWmEuVNSk0VNexqu7cpNDaPbDh0lSOzEv+tH+YHlQGe3ZAGAAAAAElFTkSuQmCC",
    copy: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEOElEQVR4nO2b30/TQBzAeeKBP8A/kZhsia/6AIP4IKStDz4oU1wDBjZn+BEiLypD0iUGIWiiMXuQgcxBTAwDJox1HWe+pZul64+79q53GC65hN22tp/PXb/9flvW13fTblqklh5MD8hJdUhOqCU5qepKUkUMe1VOqmOpVL6/T4Qm3Z6+pSQyW4yhezpIEAJeTma+wgFNDM92D+5tuRmpaxUdbR4YPR3GF7VKdyVwh1cS6hc4mPRwFtVKc1QE+MHD+6u7ze5+hIJvVuYjC/CCL+61uvAb+wZfAZIHfFQBuPAwxk2A5AMfRQAJPDcBUgB8WAGk8FwESBjwYQSEgY9dgIQJTyogLHysAtKD6YFOkvN0JIeOfOBJBESBj1WAnFSHOklOEPzOh7x5UI/u5pjCxysgoZZIU9QXU+ue8GvlMzT3ags9Hp5HD+9MIeFrBpmgsIGZn55eR2++N1zhC6UTlL6/iK5VzaBQyu0B/snoZYx4nprpHpxeKxP3dv0AocaR2eFvt3HoP79tR68ZFAoCAH5idMHcTmZk5krNwAq+0yPHCiWiADd4+9UiLLyBAQ+f4Sqg4AEfRkAYeHifm4CCDzypgLDw3AQUAuBxBLQbtVDnvP0zXAQUMOD9BeyY8NAuPGYVZ+aht45/xCuggAnvJ6B9foSuNP2MGB62AfCocRifgLXyWTfJUUdnsGsGt+Vvzjy0Zp0Y3vjzyxJXj+8yqFV0M73tJDm4NcPEvVnvgBdi5k34C+NSwEUbIf2UvQDNKmwgtydNUddevqMW7XtOHasxFaDZqjqSwgZm/n1+BTV+b1OB7wQ8c9nDzMexAjRHSUsrtw8N3zi0Tp1TKwacsosBmks9TyO3jwzf6a1zdrWA5nEzI67cPhCeZTGk+dzJiSu3J4GnKkALuI2FK2B2/F8pjNuz8qLv93PKEnsBmwH38HAF5GTyO0JZab77/ay8IIaAosezOhGWPXMBRZ9ndSLBMxFQDHhWJxI8dQFFjGd1IsFTFVDEfFYXBB/mKkAS9JjmAasAH/CkJmjmw1wFhBCwas38s7HXaHJ8+Qo8jNkF8F72TARsOKK92+xDFwmeyVVACRAgEjwTAZPjyz2nALy2Cwhz9/YSvkYVnomAzYAgGDTzWWkpchAkCYaxC9ADZh4Km/9eQJvzsrfvj4aAKmxg5eM+lgCeAc9tf5EFyEl1jGRZigRPRUAqle+3JFTDCOAJT0UAbnMTwBueqwBDAHhuAoz6gVn1wa0seNLbOtkz4SEHcF66aIzZ4Tv75SbAcERfs7VbCDWOXeMEjTG3GecmQHfs2IQ/P6EGe20EZOUFa8kedw8YXjuXcdgxWGmw1O3L3dyvY4yLgBangCdEEGwJBM/pKnAoDHzcAqqwI/j3VBbwzkIKp+9+/hTfz+tkwpoh1p7IPGAuIEVYM8TUxfqJ7U3rE7f9BUbNG9wNajm6AAAAAElFTkSuQmCC",
    delete: `iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAADEUlEQVR4nO3dz25MUQDH8S/pTmtFtP5EeBMrZFCPgSextaOx8gb+xXNYSAhBQm2RspBWajFDaNI5ba5zzkx/309yFs2oc8+9395757bJgCRJkiRJSnGo9wYMdBq4DoyAc5Ovjwz8P78DH4F3wBPg4eRrzZDjwB1gE9iuPH4CD4CVJitT0Qj4Sv0Dv3N8ncytjm4BW7Q/+L/H1mQb1MEl+h78vy8JVyqvVTus0Oe0v9v4AixXXbH+sUb/g75z3K26Yv1xmjZ3+/sdm8Cpiutu4nDvDdiD68BC4d+8Aa4Ci4yfbQwZi4zv9p8X5lwAVve9Gu3bM6b/JL4GlirMe4RxBNPmflphXu3wiukHoeYd+agw98uKc2tig+kHYeij32mWCnNvVJy7iXn4XcB24fXaa+g9f1XzcBOoigwgnAGE+x/Xr9I1UsNUvcfwDBDOAMIZQDgDCGcA4QwgnAGEa/Ec+0A/S9+DmV6/Z4BwBhDOAMIZQDgDCGcA4QwgXOnv7WfB0PfRvb9/pnkGCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMIZQDgDCGcA4QwgnAGEM4BwBhDOAMLNw+cGDv1cvt7fP9M8A4QzgHAGEK5FABuF15cabEMvRwuvl/ZNdS0C+FR4/UKDbeiltLb1JlvR2VPGn8C923hB+SdlHh1lvLZpa3/cbesausX0nfA7gmscjMvBErBK+eBvAzc7beMfLd7jngLeMx/PHFraAs5SvkRW1eIeYB2432CeebNG54Pf0jLwhfIpMWV8Bk4M2qNz6CLj017vnd97/ARGA/fl3LpBdgRbk30Q7TKZl4PPwKX/sP8OhGPAbeAH/Q9M7bEJ3GN8HzRzev+q8yTj98wj4DxwBljsukXDfQM+AG+BJ8Ajgu72JUmSJEmSJEmSJElSf78AZoSjXlNivi4AAAAASUVORK5CYII=`,
    dinner: "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",
    edit: `iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAJV0lEQVR4nO2dS7AdRRmAv3tucnMNMZd7Q0xERUsT1FjqAkuDwSoIWGXpThZxg1nAQihEy0QFxCrRlW50A74Sn+UjBJ+oWKhAAUV8YUA0CSTgA4kxxhREY4yJ97j471Rmerpnumd65pwz5/+qpm7qnOlH5vvPTHdP9wwoiqIoiqIoiqIo7TENzAy6Ekq7XAB8ETgI9Be2E8BPgauAxYOrmtIkU8BngXnOiLdt+4BXDaiOSkMsBe6mWHx6OwZcNJCaKtEpkn8SOOL47p9oEIw8Lvl7gEs4c71/MfAZy34aBCPMUuBn5KXuBlY40myx7P8v4OKmK6vEpYr8BA2CEaeO/AQNghElhvwEDYIh5jxgM7AVacz1cMt/CJitWM71lvy0YThg3oV039JSHsDe2v811eUnaBAMEe/FfzDnN4Sf9l3o5WAIGJT8BA2CAWKTfxx40PL5aWBtQ/XQy8EAcMm/BLmd+2PL948A5zRUHw2CFnHJ35jaZwq4w7LfHmB1Q/XSy0ELuK752yz7TgN3WvbVM8GIUtTgO+pIo0HQEcpa+w8WpNUgGHHK5D9NeQt/WILgGPDqhsrrJGXy/wKc75nXsATBAWBJQ+V1Ch/5oX37YQmC9zRUVme4nPxEzePAZcCVwI3AqpI8VgEvsnw+iCC41SjrVw2V0xn2kpcf0p/eApxCgujDlu/bDoKVyGhkUs48cFYD5XSC5WSl/I/sIE8Z5in3JLDIsl/bQXDAKOdlDZTRCabI39rdhtzfL+MG8kKfLNi/zSA4bJRxbuT8O8W3yEspC4J3WtIcAy4sKauNIHiTpV6TkfLuJC8E/k1YEJg3gI4BGzzLazII5pB7EOl8d9bMs9NMALfg7v65guBjqX2qjLo1EQRzyPQzM883Vsyv85TJLwqCxcB1wCeBdSXlTGFfARwzCFzyPx+Yz9gwQb6/3AcOAU9ZPvdtGJpcDjyL9C5usnwfIwhc8u9BRwGtFMlfB6whThBsQsYH0l3M2GeCWezy70X7/lbK5CfUDYJ3kJXfR84Erl9klSBQ+YFMAJ+mXH5C1SC4lOxIXB8JhreX1C8kCGaRKecq35NQ+QlVguBr5OVv8qynTxC45N+DyrcygX3p9SHglR7pQ4PgxtQ+p5HLQQhFQbAWlR+ES/5f8ZOfEBIEU8AHga8iM4fLsD0TyBUE5qVF5RcQS35CrN5BwoXAH4H/EnYXUeV7MIE8kCmW/IRYQbABGT5O0s8jQ9ImRUGg8h00JT+hbhBcRFZ+0lB8nmN/VxDc71neWFEk/xURy1mDTBMLDYJ1yL0DM937SspzBYFPG2NsmAA+R/PyE6oEwacs+9/gWd40+bWIWyrWvXP0sMs/SDPyE0KD4DqqyQf5tR830m+uWvEuMSj5CWvxD4LFwEeR+QRXBJRhk38S+0TUsaKH3PIclPyEkCDwzW8XsgxtG3n5feDq2rUecYrkv9wzj2nktHwT9WfjxAqCtcgKpKL+f1mjsfPEkL8M6UolaR+KUK+6QaDyPeghB9Q8ME9TXX6yLY1Qv6pBsNqRTuWnaFL+nRHrWSUIPmTZX+WnaFL+z4n/5o7QILjSsq/KX6AHbMcu33fFbpvyE0KC4DLLfiqfOPKnaV9+gk8QXIy9q6fyqS8fZIn0IOQnFAXBRlS+lR7wBerLh3wDq035IEuzvkP+/9JHZgurfAOX/JCndKSZA365kMePaF/+1ylu4av8FD3ktWo2+XWfwPmcmulDWQR8Az/x86j8KPJ7wOuA5zdRwQBc8p9A3h34FWStQB95SEXZtPHOE0P+MuQFjH3gP8Db4lfTiyL556X2m0DqPPb0gC9RX77Z1Ys5uufLIuCb2OWP/e1bGy75T1FPfh+ZgePLFLKA463IL7MKLvkHUPlWiuSv8cyjaIRvuWceM8j99yTtxz3TpVH5gfSAL9OcfN+u3szC/qa0EBYBOyz1UPkOJhle+X2kMeqLyg9kkvqn/bOQhRFmHiEvaXLJfwB4rmcek+QXg/aBPwAv8cxjrIjxy1f5I4pL/p9R+Z2nSL7vUyxV/ojSNfm2Gzv7sS/uHHvGQf7jqHwrk8gNj67Lf4FnHmOFyh9jVP4Y0zX5tlu6Kt+Byh9jJpGnYnVB/mLg25Y8VL4DlT/GuOT/CZXfeYrkv9QzD5U/ooyD/MdQ+Va6Jt+2Yucx9E1bVlT+GDOJfdJjyG1Q1zSuXdSfxnU//nPsp7DL34fKd/IJuiP/u5Y89jH41URDy/nkX4HSR550vRtZ5nw18HpkLb6Jyh9xPkL+oLm2JCi2A9cgT8YeZvl7Ufml2LpJdbZdhC3aiCH/e5Y8VL4n6VUzfaQV/wQqf2zYT/bgJQ9pmEXekvUBZHGE+dpyc9tD+/K/b8lD5QfyDNkDWNRfP5szQfFDI90jnuU1LX+1Zx4KciDnyTbyfFfPzhhpT1P+NM4YgzxFrX3t5wdyLtmDeDAwvXn5WF+wr8ofQl5L9kD+NjC9OXp4rWO/WPJtDT6VX4NLyR7MuwPTv99IvxsJgvWceWhTjGv+EuAOSx570Gt+LTaRPaC3BabfSF5Ksp1CGoZ7Ld+p/CHhWrIH9dbA9DNIwzFkrCBU/g8sefweWBVYV8WCOQx8c4U8tiLvuFH5I8gtZA/uuyvmsxx5+dFWZMr142S7iMm2wTM/ld8S5uNPQt+GXcQM8ujWdP7XeKRbQn6QSeVXwOc9NuYrTf8esfxngfuMzy4oSTMF7EQe55ZmH/LM/b/FqZqS8Duyv7LXRM7ffFHCwwX76tj+ADhE9mDHHlCZJdsWOIX9oc4qfwBMkO/CNfHK8ieNMt5gfD9Nvq3QR85OrrduKxE4h/xB34E8Gy8mO40y0g1BlT9A1mPvq+9EplXH4noj/+0Ln09hH+HT035LXIF7wOZ24gXBm428H6ZYvg7vtsTNFI/a3Uacy8Ec+TkHd1nKexQ97beK7Xl4TZ0JzIag/vKHgF/gN35f90ywDHtDL/3LX1kjf8VB2dSuo/iv17sd2IwM784BK4y/Kx2fr0Cu9y4eReYkxByBVDywdQHb3vR+/gBxdQHb2u5Czg5KgxRdt32f4B2DE8A/gMPIr34HcqtXaZiiAJirkF8fEXl04a/572Q7Ynx+okJZSgSKAuAnyCyeJcbnzyBTvQ+ktv1IN+4wEgTKiFDWC1gHvAURm8g+0nSlFEVRFEVRFEVRlKb4P/UJwdFjnLwwAAAAAElFTkSuQmCC`,
    gift: "ClUlEQVR4nO2aO2sUURiGH+NtVYhYBSSVGOyCjcZCsVgrwcLKH2Cr+BtsQkDXQLTy0ihYCVFI5a1JsWYtxEJjIUEUd01KES+Fl+I7w0yGmZ3s7pzzzZrvgcNZznc48553zm1nBqrFFuAsMA+8BV4Bt4AjmqJCsRt4BPzNSH+A68A2NXUBuIt0dgU4B+wFdgF1oOliN9XUDcAO4ALSiVVgGZgFxhJ1DiMd/JQqT7bx3NU56VNs2ewjvnvp9BmYcPXmXNnFLm0dcnXu+RLrg3lE9CIwBexx+aIrf+LqvUHm+XhBeyvAOy9KPTCJdPI9ssAlGQXWXPwU0vnXG2hzGZkmpTFSZmMporl6H/iein0FHrjfDWT7e1nQ3hgyZT6UJRD8GhDd9Z858acun3R50QiYBrYCCwPqCsYZZIg3yTb6IOsXxXpOOweAh8QL52jpSj1RAz4iwueQPT3JCPCN2ICJRGwcOA88A367+BqygA4VdeAH0oFV4AZwmtiMJWIDLgG3kR0hOTJ+AXeA/aFE15CDSofs/XuYUxu45vqYy2wFhPpOjW4GRHc+1D+wSFQIpohHQi4hBalfz+c5YCgwA7QFaGMGaAvQJsuALy4/HlJIIE64vOs2OI3O4SSilRF7URDvNV3uZsB2YEbRgKWMWLMg3kuaYYNPl0MdUFSvY4ugtgBtzABtAdqYAdoCtDEDtAVoYwZoC9DGDNAWoI0ZoC1AGzNAW4A2ZoC2AG3MAG0B2lTh29vHyPeDlSP0a2vf2FPhLPoxoMX6NzXDUNYXeVMgq7zqZbnlm34K9LMLtJCPm4eprC82/S7QcflRL3LCcszlna61UjQI/4rcd7rSiwE1Z0K7AsIHTW3gKrCzFwMMwzAMw/i/+Qd9C+63mU20PgAAAABJRU5ErkJggg==",
    health: "FsklEQVR4nO2aTWwVVRTHf6+0lcbaqthaYyQEqjUpaqJo+DQBWwENmpgYo5JiF8a4MHYjJsYFO+OS1JUxIgt14cZPbAJRCo0gGo1asFYRBVOMWlTEYFvCuDj39N6ZzntvZt5M+9q+X/Iyb+7ce889//t9Z6BChQoVKsxfcgnTrAE6gZXA9cCVQCPwJ/AH8B1wCPgQ+LKE8lUBq42tVUBrHlufAH0l2ipKA7Ad+BnwYvyOAU8Al5SprUh0Ab86hkaAV4AHgVuAa4CFwLXACuBR4HVg1EnzA3BPBFvbEth6I6GtolwGvOVk/DVwH9G7TjUi3gmT/iLQC9REtHV/TFvbItqKRBPwucnsL+AxpE8moRZ4Fpgw+fUBl+ax9XfGtiLRAHxhMhgGliUsTJBObFPtB+qBZmDQhH2PDHRp2+ojRkvIAe+YhCeAq1MqkHIDcMrkfwDr/GAGtm7EivBS1ERPmgT/ADelXCClFSuCB3yDtIQs6MB2h3uLRW5C5lcPeCijAoG/2WfpvLLd2PoRmUHy8oKJeJhki6QoNCEjvAd8C7RkZMelFpkaPWSdEMpC4IyJtC7DwuhoPx0177IVK3ooD2ALliUHgc+YXudB1gk6IN6mge5cu9Fc3824IOuA24HfMrYT5AKyNwHrq0+AVea6J0WjOWAfsDfFPEtBfVsdfFAFnEeaR5pNsx071S1KMd+krMAuuADbAhqRQXAC2WKmRafzf2mK+SbltLlOVrIKUGeuo8gmIi3ucv6ntcQthd/NdXJvoAL8F3yQAtXAnc59ObQA7YbnNUAFOAuMI5uTgiulGKxENlVKWhuqUtBFl7aESQEuIMvEHHLokAYd5jporuUggJZhWAPcafCwua6JmWk1sqvrD+SnArwcMK7kgI/NL+nePy6bzPXTsIePIFNE6MMCdGGnug0mrAHpUhPAFcAYMrjWOemWO+nWx7SZhCpkFvCAtWER6oFzJkLUbrAAaU7qyG4TvsXcD5j7IXPf7qTtCUmXJVqmnyiw0es1kd6OmKnW/i9IDZ9DzvZ2mvAdJt4ec7/FSfseVgBNl4QOZKd3CticJ84CZI/jAc8Uyuw64F+nYFF/XcB+878bOIq/qamwPea+Bpl5PCduNzKeHExgX38n8/j1uHl+mghCPxfT6AFT8O6AQ2ex53Da3HvN/Vonrqbbj388SUuAW7GVurWY82BHdR0Q66MkQpTVMcRDmrii/U83IzvM/U4n3UWkK2mLiop2gZPYUV5pMeEe8GaMPGkBjmNPb6OuEHdjBehxwnVTNGTuB/CPCW66YaTPlop77HaE6BU5yTLswWVUEdZjHVnuhNchNTyGTIsTyDSpK8UNTrpitX8zsLhIHNf5QeQYLhHu6W0UEaqQvvwRU6cabd5P4Z8iNV2/+VUXyL8eEXEU6dthNGNH/EFS2N7HFSEf/dgjN3eKjEMO+/rsDFNbQurOK2mI8Cr+ETt0NRaBGkSEMfzvLYLOp/2SZYoIcQeV57HOu1NkMTYBHwBtgXC3EjJ3XilFhIcJnyKL8aJJM8JUEcDv/FEydF5JKsIdWAGejmGvDjlY9YD3A8+m3XkliQiLsAK0F4nbClzu3Nchb63udsKamCHnlSQi7EVqs9BrtxZkjXCc/PP9jDuvlDowhlGLfGDlISI0Bp6XjfNKFiI0IiKM4z9Jcl+sloXzSqkibAZ24V+41OJ3sGydV0oR4TXsKjFs9Vb2zitJRXCns12BZ7PGeSWqCC1IM1eaEec3OmGzznmlmAityAB3iKmjvDJrnVcKidCIPXA5hL8lgN/5Y8xC55VCIixGRBjH/53QnHFeKdYS3JemTcBXzCHnlSXYb3gHCD+admt+CPkoek7Rhmxp9SjdbQlX4a/56fh0bkZow/+ZbD3zyHnFPW0eQd7VzxvnlaXIWb2eD+xjHjmv5JAZYslMF6RChQoV5i3/A3zaLZcQYZePAAAAAElFTkSuQmCC",
    house: "DU0lEQVR4nO2aT0gVQRjAf5aEYBTSITp4iUA6eLFLPiWkQ1JpdOjQIaJLdYqOegySyGN/bh3rVoegUghUKAMzsGNEEJVGREXk64+VuR3mW3Zdd58zu/N239P5weC+2e/ffLv7zey44HA4HA5H3uwEngMzcryu6AY+Ap60L8D+QiMyZBQYSal7FviDGvg9aZ70nbESXQ74V86ERuBaSHcY2CBtONR/VWRrGtMEbAHui84CcCpG5jjwU2QeAi0ZY6wqJgnYBbwQ+U/Avgqye4EPIvsK2J0hxqoSTcAI8CBGrhf4KrIzQKuG7VaR9UT3QKZIq0Q0AXF3xHlgUfpvA80G9ptFxwP+iq2aolICGoHr8nsJuIwqdKY0AAPAP7F1A9iUMl7rJCVgGzAux7+AExZ8HQN+iM1JYLsFm5lJSsBr+TsLdFj01yE2fR/tFm2nIikBJsXOlB3AlPgoA0er4EObcAIGQr9vAk0a+v3ABPBd2jjQp6HXJD48VG0YNIraIv6Ab6UI5lJIf06a/3tI08YgQXHUTbpVwrf8PHBEU69fdN4AnaH+EvBWzuncCYjPedGZQj0iubCHYH43LUgTotcZc64k58YM7LVTvcIbS9YpqYwKNIk51FU1oRpT7wpsLUrKqEEm8R74lsKurcVXLM3AHTG+SLZlqX+lumLOdWP+CETJsvyOJfpi0pvRXh9BESyF+rsIiuDhjD7SvIDF0knwavoSaMsYmM8QydPgRUs+2lAxe6gxxBXdipxEbVz4gdnenOhD3eplaWNkv/JRWgjiX0CNaVUagAssn+dNt75qieg4rgAbk4Q3A3cJ3sHPsXYScBr4LcejwNY44Wci8BnoiRioV8Lx96DG5gFP44QfA9Ms/yfFWkoAqLFNA4/SGqg3tOK3tmKqV/JIwCGCHR2dNgsczCGuVbH1CJgM3m/vLPjNHL+tBJjaydWvqwFFB1A0LgFFB1A0LgFFB1A0tZCAJ6hN1kJoqHDO9ntAki8vcj4vv0Bt3AGFovNBUsUMarDaFZ1MkKm2Xy0DbikcIq5Y6fZloSi/id8BVJLR1asZv64IGsjGFSvdviwU5Xd9FME8v8ut6c9fQVVR062remsrZolwEVwyz1ndsR7G6HA4HA6HQ5P/UWiebq8FGd8AAAAASUVORK5CYII=",
    investment: "B8UlEQVR4nO2avU7DMBRGDwh17UTFs/AzMQAvRstztZ1ggoEXoN2ZwgQMdUVUYvvaSWM7uUeyUjmOfe8X53PUGBRFURSlzgR4ArbAz0DKBliY3LwsMgj4WGUuEWBjGl9KGhfCNX8zwcteraHRmNep8OI1sBpAnYgmpYZQ12oGDJYzYbsV/9UrsU6EmuCYcAmQ+qVFUuouv/acDxagBL4tv111XtQDxoQKkDqA1PQlwAPwhd3NlwF9Nbm92PUlHMME74EK95IWGl9oP+Jx+lgFzoFX2gkgrZeeD28YyQx4M2Psj6MRoH7n34GLiPGKFaAp+ZjxihTgcNrPBOO53L4oAVzJw251qBxxFC2AL3mAO1OkcRQjgO2Zl1K0AG2Td8WRvQBdJO+KI2sBJM/8IV25fXIBYu98V26fVIA2076rRJMJkIvbJxEgJ7dPIsALYYYXMl4RAiyBZ/Jw+94EmLLbcBDKsd2+FwHq6/yVpDNBv0UJUH/mp5LOBP0mFSD0X+GKnQi3wGfgtcUQ8yJUJ5XZRc2AE0tD2zkJPvEO+7WN11W987x0h0gMtgCzIubLkHSKp6wXfyGKESDqm3vPtIqxrQnmingZ3JpjzNtertyYo2ir7Bz/a2up5VEiwMSIsN80PYTyYZIXbZdXFEVRFEVRxsAv0e/sKHzSU0gAAAAASUVORK5CYII=",
    leisure: "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",
    liability: "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAElUlEQVRoge2a329URRTHPxK6hECh8qCh8qOrsWIkBuiLiT6YmGiMP4o1QZTwDyC1UR80PBKC+mjUaOPvh2Il0Woi+GCM8UHrDxQToQUCiiIYMUbZKi1pl/XhnGE2lzN35+5ud1fiN5nc7cw5c8/3zjkzZ2YKYcwD+oEvgL+1jAJbgVyKXkvhKuA7oBQo3wKdTbMuEvPwJA4CvUC7lvXAuLZ9Q4uPzCOIoWPAYqN9MZ7Mww20KzO+RIzsTZG5T2VGG2JRlZhAjGxPkVmkMoWGWBSBOUZdKULvsnobUissImP6vC1Fz7UdqK859cVWZFTGsYO9AzisMlsaaFdm5JB1ogQcQgJ7kZY+PIl9QFuTbIxGJ56MVfYBS5tmXUbkkHXic2QmmwA+Q9yp5UfikkAeGAROADOE3cqVGZV9SXVbAnfgF8JqSgG4veFWJ5DHk3gX6CEuGcyp7AiezMpZsjEKg3gS1eI97ePFulhUJU6oEetq6KNH+/ipLhZVCRfYtewtcvgJoGlwAdsq/VQFK2n8FPg6Qvc54Gck92oJJL9k7Jfdr3JrMurNCqwR+U/ifyKthkuGyNxmG6BYgZza3AV0Acu0/hfgOPAB8D6yeAfRzFlrGZIixWTbRWA3QtREs4j0IefJJWASGAI2AN3AAi3dwAPALmBKZScInLk1g8ijwHmVH0JcqxJWAm/hR2cgKdBoIn1qyDThI9cR7d9Cv+oWSYxMtUSOkZ3Icrw7hUisQw7Ix5EDdQvufLpA2a3ASa28E7glYNDVwLWJulMqt75M72QFIq/h3SmJhcA7Ze8vAX8Bjwf6GlaZl13FjoSyReQ34I9E3X5DZ3sKiRXI7DSJHRPPax8vIPub64GntO5+Q74LmQBm0Om6DdiJfOFfA0SsOkekoLo7SV+X+gmPBsBp4HujfgQ5krLggt9006xE1hCHD1V+Q6B9Evua4grCu9eN2udeq3G2iLij1mSsOXyEzESPEb9b7dY+D1mN9SByI/AqMrNNal1B5RcGjMoDX6nMaeB1ZDGcH+ZBO969L0KtRDYB58p0nF4lIiD3LjcjE9AosmieAu5tNJFV+FRiCFiNXwsquZaF65A7mLPITXMSF1yr3mn8NsTwYWRkDiCjA/CDPq3AXQ08wcX7/8NIzMwHbjX0evR5rJ5EupBZZBp40mjfo08r4esAnsa+JTuvz3NGm+trj9FWtWu9rX+/aXWKpCcziOslj1bnICnJcWBtWf2VwCdIDCxJ6OS1r2n8/iWaiFU2A2/o7ynEb0N4ReV2GW03AEe0/Sjwoxr5J7LhSmK3yg6GXpaViCtngYdSSIAErDsw7zfa25CrvoPA7ypzuSE3oH2cIeXmLCuRMeBZ4JoKJBx68Wm8RQbS0/gBxEWLwD1pL5qtlT1pTFH1h0nZvpYhj3enIuGPcAFu6N2QdeCJ3KR1C/Dpf+xIJNGLXySnkARwI7IWua3uKuBBhKxbZM8Ad8e8wGWUMWWM2v4LohPZT8QcPkwjgR19m7xEybiv9Q/yRZ5BArCEfJ2PSZ+hsmA5korvRaZhd4s8jqwRWwhMsQ7/AvFI7LQ18IE+AAAAAElFTkSuQmCC",
    liabilityBig: "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAKc0lEQVR4nO2de3AdVR3HP4lJIW20WtKWpI2Whw0tBXzMaPUPBKsD1o6grS2FtgIK2JYCvhEc0Rmf46PDQ0U7SH2MjxkG3+A40IBamhatUP8gxZSOQ1taaW1jkiZMQuofv72Tc3+7d+85u3vv3t7d78yZuXvv+T12f3fP43d+53caiIfZwGXAEmAO0Ol9/zywF/g98FtgX0w5OcpgOnAnMAqcKFNeBn4MtKeiaQawBOinvCF06QcWp6BvXWMdMIa7MQplDFhbda3rFEuQ5kc/5KeADcA8YIpX5gM3AU8H1B8jf1NiowN/MzUMXAc0htA1AtcDI4r2GHB6BfWte/wAvzEudKB/B36j3JuwjpnBbPyjqesi8FmreIwCsxLSMVNYj7/PCGumSqER2KV45R28gs2Dfa+6vg8YjyBr3KMN453DArsp/lfPi8FrvuL1TGztMogBih9iawxerYrXQGzt6gw2TdaJCsqL0vTVNWwMckBddwbWsoOm1bwzDxuD7FHX744hT9P2xeCVWehh79NEG/a+Avgn+bA3NoImhtdH4LMO/8SwIyEdM4fvU/wwRxB3iC0uwu86+W7COmYK7YhDUBtlLeWdi+vwG+MoMLOC+mYCiwleC9kF3Ayci7jeW73Pt+DvMwru9/dUWfe6xVriL1B9tOpa1zkW42++bMpR4NIU9M0E2oCvAS9R3hCjyKAgX5CyQENM+lnA+5Dl3TMoDgN6jokwoHxGniNHjgQQ1mRNAy5HmqRzkBn7lITkDiHRjM8gTdqvkU4/RwBagNuJFgwXtRwDbvNk5zDQAeygeobQ5R/Aayt+lycJZiGjo7SMUSjPk0ej0AL8Df/D2Q/cCpxPcv0HHq/zPd77A+TuAE5NUN5Jh9vxP5TNwOQqyJ6MRMdr+Z+pguyaxDT8rpDNKeihjXIUeE0KeqSOa/E3U2mMdqYgM3pTl6tT0CNVNCLzDBN3I7G71cYQcI/6TuuWCehAuPNS1OUCpUtvirqkBh0Il+RoyhWZD6RrQG5cf5cmak2fqiJKOE+OCsLWIM1k7J+aFmwMshz4D+Js/GACMk8DtiD9w3csdcgU9AxZ46DxWxIrf3coeTq+q5w+dQ2bf6cZP5XE5v856vqMBHjWDfLmosaQG6TGkBukxpAbpMaQG6TGkBukxpAbpMaQG6TGkBukxtCUtgI1inbgYmAh0AWcifjgCkkTBoEjSEB5L9ADdCNuptgo5ztK2rd0v+Kn183T8mW1ITvBgsKhbMsOJHFbWxxFsm6QTuAu4HiA7KhlCEkSOjuKQlk1SDPyRugl7CTLceALwCm2SmW1D5kH/JLSAR1jwDbgMSTeuBfpHwa931uRfqYLeCMT/Y1+ni3IcsP7gRVYBm1k7Q1ZjjzYoH90H7J7eEYEvjM92j0leA8Ay2wYZckg6wnOrLoPWIWk/4iLJmANwTHLLyP79kORFYPonC2Fci/wygTlFPAq/MlDCyXUKFkwyHL8b8YwcIUDj6sN2vsd6K70ZOk3ZWlQ5SzM1OcBP6T4XvuBS4BfVEH+z5D9+f3Gd41IQPtcXTkNgyTRTttiEjKaMqMxh5GY4T9XUY/HkVMkRozvWhHdmnXlajdZ5SLck5R3WwA/l2YK4J1I4gMzBrobWID7H/qqAH0+rSsdVRXMHFadAQziQm8mNQ2i5fX7qO3RicyYdQduizOBv+C/f7PsRvoIF2xSPAZRecO2qAp/QKb8ncBDAUqUwnTgq8CXvc+l0K34bUFuPkjeo7Z3GYC7FK992I+mzgNeJNwYZrkH+8jOqcALiv7bZoVrHASHGeRxo84jIfX0KCusRN2wMx2/b2qVJe2pwLOKthtJr34h8BZk1v0AklW1UMclXaF+5oOINxmQTnYb9g+pFMy0TaMh9WwNspXoA4CbFa8+B156vnJrSN01Rr3/InMPGzQhrntTzo1mhRnAduIZxLaejUF6CG/2ykG70G9xoDXf9G2Ub4rM9IcuhxR8XOm4XVdoRpKLbUVeoQFkaFhpg+wFDnsytwI3EDAUdEC74j+Km2/KjGX+nEX9s5louh521NNsVcaxTHtYaYMkvbHzSsXfdb5h5oe0zX63EsnU6novWynW9Yp6dL8vVNePOdIfZiKTxAWWND93lFFAN/B243phPbpOutT1Tkf6HuPzh/AbOElo3brq0SBnq+tnHem/x0ST24LMk75ItDWSctC6ad0DUWt9yAykvf4RkoZ2PzLnKOCI4j/NkT/AV/DfzzDwIPARksvI3aZkHLYhqhWDzERO6NGubC1PJ+acZMlfYw1+v5tZdgHfQJLoRMUpiudIeHVBLRjkIoqHo9UwCB7tMsRVHib/N8DrIvA/KQ3yVkqvgQfJS6LJCkID4uPaAPwO/wEFh4A3OPLUTdaLNkRpGmQq4hTUvPcg6ZvehjRlZm6tPlV3fgj/ODgdCfEx5y19uGXCWECxrv+yIUrTIBsD+G4kPHzpj6r+5SF1k8Aiit+Wax1oP0Cxrg/V8rC3Df85JZuAjyEuh1LYra7flKRSAXgU+JVxfYkD7ZvV9e5aNsh6ijPaHUAccuXQo64vdpD5CBP/1kUOdE8Yn13CR7VuPbVqkCkodzTwTSYiB8NQWAArYCH2Z5WYkYXnWtJAsUd4yJKmA1lbKeAE0F2rBrmB4gjyw0iMkw0OAn83rpsQ558N/mp8XoX9KqDprtlrSbOS4jWaHUgKk7Kodqfein9C9nkbRQ3cpOj3YBfH3EJxjIEvACEA7cjiVIHGpg9pRgxn6qhbhJKotkHuU78XLW9aog1/gMMaS9oNBs04sl4e5MdqAN6FNHOF+k9iF4nyYWLcY1SD2JaCQSYj2YH070UBAA64U/E5gN0SayMSQGfSjiEreg94v/0J/8z9IPB6C/5TA2i/ZXlPgP8B2dazLV9H4qf0GvMJJMu17Tq1xmz8b4ltP9SERNDo2Xip8iRwliVv3QIM4JjUp9IGKVUGEbdJHHw2gK9LHNVZyB/mKfwnzR1H5iArsQ+YWx2gz6cc9IEABrb14pRDiEMxLiYhJ5OavIdxO4OxADPY+kHc1/2DznLcGYFPVQ0yghw4meR5Vefg37Z2DHejRI1+BzGGjtj8H3Z9jg+VNkgvEkqzGnh1FAUtsIzg7QhXOfCIapDV+N+MMWSbWyRENUgpVDrqpBT0WbyFsgkZ+SSNqfg78EKJdZZjVIOUmuWmZRCQcM+gLW0vIOGdSUThNCPzjKAFrUQO1tQ3UGpEoYX7NqN4+ImqZzthSwpLkfY76J/7HOLAjJJbsgP4BP4ZuNlnRG6mTGg3xiKK//0NSBCyVmAj/kNZ5gD/VvX0offVwFxku3Opfm0MCWL7ErJmsQBZeZzklWnI6uFSJNr/CcKPpN1JxA48CJtDBMUtQ0zkD6k2mhFflc3ycNQyAHySeKGxPnSRbNoJs9yRpKIR0YG4Z5I0zCDiDkkirW4gLsPOKMcQF7aN0j+luvsNy+E0xLG4neJ9H7ZlHFkcuxF3Z2gkzEVGSPsDFD7k/TYL6VOuQdwNOiRnAFlAWlENhWNgJrIXcSMS0d6LRLO85JUj3ncPe3VWkFBk4/8Bh2bfpatSk4YAAAAASUVORK5CYII=",
    market: "E+ElEQVR4nO2bW4hVVRjHf2fMyWmm21CmaWXpgA8iRRcciXK0oGmQ8KEb0UMU9BJIUqRWKN3sJYskgp4qeikjKozCskKdmkC6WmRoUuN0k4bQaVKcOaeH71usfXb77OPea63dOXL+sFn7rMt//de319prrW/tAy200EILLTQErgeGgUrOaxjoL1y1R7g03lw/F67aI0wjCi3f5lDhCYFGMsCIhnm7P8CBAvV6xwBihLwG+AN5kTY1XkAa81yGMrdrmW+AUghRReFsYBwoA/MzlGsHfkWMcFUAXYVhHdKIN3OUXa9lN3tVVCBOxu0pzgSOAhPAHI+6CsNdSON3OXC8ohwbvCgqECVgNyL+VgeeS5VjFDjFg67C0I9dy0915BpSrjtdRRWJ9xHR93nguo0mmxIXINPeIeAMD3xTkdVgBbjaA19wvIiI3eiR00ynr3vkDIJzgH+Qqesij7zTI7wXeuT1jkeQJ/VaAO6XaYIp8UtE5JIA3EuU++sA3N7wN9l3fDsi5QdT0rv193g9EaH9AW1AL3BFQlqexUrU41NOSR/VsCNHHV4wBbgb+AkRNQFcEsvj6gKrh9D8NXEm8G5EwGENn47lawgDnJSRdBpwrV7zkbE2iozHzcAPwBZgMbK7uwc4ArwDzM1YV0PiK2q/oCaBT/X+R2CGlrmZ5IVJU/YA8xSfAbYDB5Fe0A/cASzS9PuB3/S+V8PdGetqSOxCrHpjQtp1WKufFonfr3HfAvcCnRrfED0gK1Yp6e/AcqArlr4D6RlRbKd6qOwDFoYSGEEQ/nZgL9UN+o76+/hu4BZkZWYM2HQG6AbeorrxpmsfryOjE9gaKx8KXvlnIw2NCt+AuLJrYSawFlhK9arvcprMAKdjfXbmejuWZyHwGfBxJG51JP8x5GW4X++jXJ2EgTcDvIp1M32h9wOadhbwGLL/NhWer2lXRuImIvdl4CPlqwDP+xCZAC8GGFCSP4ELkHnfdP8t2B1dGTmbqwAPatk2LWeMMgdxfEzT9LnAX1q2z1VoArwYwMz7q/T3Uaq7bxlZ5i7GPvEx4BrNb2aMnhr8KzX9Q1ehCXA2wGVKMIKc3IAcQb0BbEJcz7NjZTZiDTOELI/Hqb0t7cCeCF3sIjYBzgZ4QgmynNS2IU7JsYiAp+qU2aT51ubQmAZnA2xTgjxn7qciw+AG6q8Rlms9H+SoJw3OBviF9PHrC/OwS2SfcDbAESWIr/d9owvrOPGJ4zJAmk+wFAtDwYj8X75XSqvUOBbjb3rfMI6Tg4HrSUSaAfZoOC+whvM0HEnNFQhpBtiq4YrAGpZpOBi4nszoQcbnKGH965+Tf7pNg5elsDl9We8sJxl9yu/j44g4vBigF1nWjuP/XVACPkFEPqBxg1Qff7nEedsOv6RE3yPbX194SHn3Yh0mSaLzxnkzQBd2VziEnL+74iZko1Sh+kuOhjQAyFy9D7s7zPv5SQl4GNv4CnBuJD3Jq5wnbpZyH8qpMxHTsRukSeQobEGG8kuxJ0fHkD83VBDXmW+sUe5tvomnINtd4wmaRIbFOqRX9CA+vk7kpdkHPI79GMJsehZp/griZFlNdU/Ii1lI443jZiA9e37MQE57s3zkMIx4gKIe4jUZyme9Hg3Q7v+gAzkSexYZg3sQZ8gY8qR3Ak8ivoH2GhzLgPew/kaX6zDS7YM9+RZaaKGFEwr/AgVHGjLidJ8gAAAAAElFTkSuQmCC",
    save: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADt0lEQVRoge2YvWsUQRjGn9m7fBg/iJLEJo2NAbFRtPQfSCEpFOwshPSpYhMUq4CojQr+C4JRCyWNgqAgsVUkhSAYNGcgGtDkEnPvY7E7u7Ozs7O3J5tEuBfm9m5m7+b3zPsxswd0rWtd69pumsobOPNydZxUD0iMEgBArC4343FuNfH+wgigFBQAAgAJkhDzKgIRQihgdBUhRAQtEUjciImFLdQOHflJUTc+TgzfaUdAkDdgw4eEaQthjGbAkwQluoIgEfUjHgeTn6Z+JQahePvE48b1dgTU8wWk4R38EAknVUqFq48IDkjgjXb6/uvU999cORuCh6pAPQkBUera2JPv/YsTI1d9AvI9YMO7PCAShopefQ0tAjJsYngiu0g0vJJMrN8qcnpsrjHbkYAieAARtBlCOr6ZhJMkYZUvIAkpJoORCkwfn1ueKi+gAB5AnHy6UYuwhNArQIcdM/B6fgU1k8eQnwMWvBNAomlVci9jz6UTVkSyC2B7wAEfdR0uLaAIHgg9EMInChjNbMLrkpqZglFZjUPICQ9fGOQLKIAHwhW0XaXvTycoQWY9YFaqsKKVgy8UYMK7dLjCwtzQ4rKakwM6V2jc74T3aPDsA354qADL6y2M9CebuZmEjPMgaa8unzIqk8QeEApWmoxxbHifDzxl1IInEAQJrKr34OaHJr6tb2eOBa24pEqmUqXKrYbfIO59DhD07XPDd+IBGx4A+g/UsPGrBQoBpfDu9wAuvf0DcLtoHbRsADVHt0JvXx1BX28peK8AG54g6vUABweDdEix1wgde9L08SCvziddbvjOQ8iq7Slh0YcdgfdUQu9OvNfh/QL+A3ivgL0E79NRHEJ7GN4vYC/Be0QUl1EL/txQD2ZODmCkT8UPNOaJ0/fZPPfYfY2m4NanGhbWggw8PQoKd2J75f8dPtsvIhjqIaaObZeCB4pOo46wqQJevx/qsUPRjC23eZLYHfNVwacfatqD9wrIS9gq4ZPn4jR8Z2XUAR9Wm+rgRaQUvF9ATqmsFJ7l4L0C8up8lfA6hGx4epQU7sSZTapCeA3aLrxfgAseqBQ+bO3DFwjIwusfrQre/JMgBd9JFXLBo2L4JITS8D4/FJbRr4/m0Xj4NDmYVQhv5sGP+RdYe/bcKiZlBETKg9YmatubumtH4GHOW6DA99/oEoDRoxfPx/Ag0GgSw73VwK9sqXjyQ+Pj8aQkvpT2gBCT+ovmIswutrDclErg7y7ttzbQEF4UJ3Nd0LWuda1ru2p/ASsCdZ0lM904AAAAAElFTkSuQmCC",
    select: "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVR4nO2aW2sUMRiGH6mHC7WiVaxWURQrKmJbsUW90h/hvT/EK0XxAKssFBG8EEFrF+lFpSgqiHrhoWKResQLUWuhWqtV8FQZCbwDYZ2ZnZ3N7M5qXwhMspMveSb5vkkyC9P6N7UJyAHDwFclc30C2EgdaDaQB6YALyT9FtAcMgxxVZ39BhwHOoG5Sp0C+K57riSEOQUMAi2kpLw6+BrYHHHfFuCN7jWw5WpAdZ8Dy0nBJ6Y0Ej7ECqAATCpdBNbptzbgh6bZhjLbWgg8EMwzYJlLkJwM5yyI8QD/GLemRL6CUWkCHqr+E6DZFchjGd2mfEH5fnXcpEsqu6B7tiv/KGGbTcCQbJj2l7oAmZTBeUV52yFXquyT8vMjIluSNAwsqRTko4w1Ku8bL5ZdviCLIIMy1lUGyA5dm7qZmVrHZDAf0GFbdnm3ro8maG9RkbM7gTBao/D7E2iPAbIV+KX7Td2k4fep6/BrdEjG38UAGa1gNG6n+UI0alC4tR2wWPZv/apTrobkE6lA+DId2x8D5CAwkzqQF8PZ60Le/wJyGnivtdc5rc0yKS+Gs9vprcL2GUU9A3k+QWiuOkjQYjIojQKra9D/vzocVh60mAwDvKwV84eAfU3NQcoF9CL2NZkECSvvj9jXpKqwjt0F7geU3wHuRdhpidjXlK312vmZqDIC9AKtIfe6el94rt9HBmIiYK5OWHsQJw0V6RZw06V9fw8+oMWaGeo+a4i7qvwG95La95fm9orTLPp6QmAyCzIS4HRRMJkF6VXFvoDldxBMZkFaLWfviQGTWRCjDuv0sBAAYzZVZ0vsEF3Jq9R+l/XES42MOddNS56LBxUHxhwPHSA9ea5GvNQ0S1uey6lbSxjPtQ/WCsZLI5hUG6ZRbX1Ow3ipAOBSbdaZL/UMs09tnCRFFcPMSmFajcn+blKWDXMDWOzI7gxrO3GdKqnD+gRtzqz2JjywtkfChzCnKWupopq1u/ND5UvgiKbEqhh/FjDfI9vlE2MWxE5qIDMd9gAvIo524qZrWTh5bNCTPKwPNa+sv3KEpS/6DmKi065aA0yLCvUHntW1RE7RzXQAAAAASUVORK5CYII=",
    service: "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",
    study: "C7UlEQVR4nO2bO2sVQRSAv6viW7Cx8gZEA5YWKoqaUizsBB8/wUKw8ydo1CaWNnaCj2gajWBhkUTUxtJClIBcsQhBExUs1FjMWe/evTvZ2ZnZzewyHwy7c2bmzJnDzLm7ZxOIRCKRYkaASWAZWAm4fAbGgY2+F78YwOLKlGs+HTApSp8CXZ+KK+AE/Z3gjWTbh774hGQXVKbwZUo2l5Gn62tFKQdssJjgr+b+mIWuRmDqUe9bz5JSdqyr0JBGEB1gMUYXBOeAWR9G1YnPIDjmaEuwhBLcTFmzIBjKc4B34s9gBl0QbCQ2DtAFwdbi+whcBJaAIy5GebDDu0LTfu+k3x0XozzY4V2hSb8DqX5fgU1uplnb8Z+6g+DZ1P1O4KTF/F6pOwiek+vzTD1ofB2Bg9L+BRhFOW8Z2OxqYEk7BqjzbTDZ/o+AD8BbYAdwStM/m4leBO4DU6KjNnzsgA7wUdqTl6YrUr+b098kE+1qrzGmOcHVJj4sbT36u24P/WOwJdM/LxPdBaYL5imyw4qswtmUbMZw4pvSNpGRvxH5mYxcl4keKZinyA4rXI9AB5hPteeVeyXmbJwDjor8N8ML/4M6Bj+ArYZzenVAHb8C5+U6gdoN6bIeeA1sA07XYIsVLkGwA3wSue7l57K0PyzQZdJm0l4alyB4XGTzKGfksRt1FH4C20VmEgR1n+qCigG3RHajYOyM9Lsg9cdSn0YtGrk+S82TbrOx1xgXB/REdqhg7CUGj8F+9A9CC1LyjmEZe41xccAL4InB2F3Aewa/63eBB6jkyQrwTep7gX0oZy0x/C0iyCfBOqn8ZzDmBB37VU1wD0JBEx1gMSZ+GNHct5YYBNtMdIDFmBgENfetJQbBBpF8c1jwqTTx6G0G38NDLtercEBTyjh2f/5X6IBXqExNqFQWgxLFo1Uo94iVA0yC4He5/iqrvC3kZWhDYwxlY68K5atlaEMrV6twAAxnaEMrPVm813+Xi0Qi7ecffQJYk5h00ekAAAAASUVORK5CYII=",
    sweet: "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",
    tax: "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",
    tourism: "HFUlEQVR4nO2baWxVRRTHf6+UNlSk0giyKeLC4koEXEBEFD/wwY3FLUWMBVQkEKMJCWok0aAsbmAiSlyCGnEXRCQYWSQKKKigoIgBF6ggCIKCpZReP5wZZnrfvPvufWtt3j+ZvN4zZ+6cOXfmnDNnplBAAQUU0HhRCkwAvgAOqrIGGK/qmjQ6AesBL0H5GuiYN+myjFLM4H8BhgAtVbkO+AGjhJI8yZhVjMcMvrWjvjXwq+IZl0O5coY1yOCGBPAMUzyrciJRjvE3MrjjA3haKZ4D6XRUlE7jLMJTv7EAnqC60GisCtikfq8M4Bmkfr/Lsix5wThkFmwGKhz1FcCPimdsDuXKGUqAr5AB/gbcAJSrMgzYourW0kTdIEAHjBJcZZ3iadIoQab4Z4i1P6D+vgtonke5soYWQBXwCVAN1AA/AYuB25FIsMmiNybETVT2IYpocjgf2I8McgNQCbRH9gRnALcCKzGKuD8/YmYHJyAxvwe8RvA2txI4AtQDfbMvWm7wCiamD+PSJmNmyv/eJgxBBvMP0DVkm46YpfAeGQqJ84EOwB5kIGMitrUN46QMy5UTxBDX5gELif4V9eCPqjI4o9LlAGORAewG2qXQ3vYGHrAXOCdj0mUZ3ZDkpj/h0RKJ8paEeIdWQAx4W/29B7iFRm4TijHZnpd9dfMwA0sGm68UeNeifUnwNjqveAgRchuS0dGYQEPDlgx+vhgSIVZbdUuAnumLnDlciAQxR4EBFr0fUIsEN1EVcJGPfhziFfap+hpgeFpSZwhlmDh/mkVvB+yw6FEVcASYQnz0WAHMxNiGvAdMzyDCrMcIWwwsV/Rl6jmqAurU71ZgFPFb5LW4Z0pOcRUyvWuA8yz6dES4HcBJihZVAX2Bb63nbRhFtAF2KvqZ6Q4iHWirP9GiDUWUUovYAA09kGTJWltRRcBNwEaLvg8Jrz1gaXrip48aJUgb9dwNs/Wd4OPVA0gWHLlmilbEOqt+PmZ25Q2bEGGmAldgjOE8B68WvFeSdyZbKiciHqFR4HXiMzvf4LbMuv6aJO8MayvyjtEYf/w+sBqYgSRB/IhhBjY5yXv/VXzlGZM0C7gcMXIecFsI/kswCkh24LlK8Y1OR8CwKFIdrUZ2XdXAGwSHmadj9vrTAvhsPEHDZXJpAO/NGBdaFvL9KaE5knVxZWhrgbsdbcoxhm8+4c4fY5i84IfqdwuJI7gYsunJeoJUh5N/ASORtfspDRUxGxOBNQM+wkR9YUPQi1Wbn5FIUbuyOQFtBiqe/RgXm1FUYgyYDiX1NN0N3AMcUs/LEdfztHreCXSO0Nfjqt0M9dwdE8gMDWinZ8vMCH2FQk9M0mKUoo1Sz4eByxStN3J46QF/YBR2EElu2Pg8AW0RZvrbMfsYRfsTuTDlwrnIfuAwcn6QqI8wtGOoQDYXHvC8og1QnXjEn8y0Ry4r6SUxwvrbRhBNT39/Nkfbn2UktiUvKJ43U+g3DkWYNbwGWY+2RZ/haNMZ8/WnRuzUVsB0x7tvtOoTZX87IUsxUT4hkgIeURW7gJNpaNE/QIycjTLMEfYiq34lsMLH66Lp7XAdomg/llrC1gJ9XEIjOQHNF6ZfF41rES0eQSysbdE3EH9hKYYJczfjju6C0AJZix7x+UGQLK+HHInPVX9/jzvGL0cMswdcHVEOQE5b9A7tPkXTFn0XcKqjzUSMG+oRsb9iYIFqvxV3SDtb1c9ClLVBPb+U4J36buFG4mdqUujO3kG+7B0Yi97PwT8YcygRVeMx5It7iG05y8HTGnGD9YhLRPFpz1TpaFOC3CWwPVdoaKvfHdG2tvgjHbxdMUnHB6J2hBhSD7kLmChVpW3RYh+9CrMsXFkebTQjh8g6oNHr+EHgTgdfK2QdesBbRD+E0MvmMJIqc+ECJc9RJM7wQ9uddcQnQ2OYDFSkEFn78REBPEWIJ9BhbtSEQxUypeuQW18u9AB+V308m4CnFWaqP+WoH0AKIbJe8/uB/gl49LTcA3QJ+2KF6zEZXNfMAjk30JZ8McGXoPogs6getw3SH2pWWAGLkC2unp7+aG84xkVGPXbqhUlgJJqWgzD3gxcSbv3ei/kg/lD5bEThtUiIHArNaLgn/xiJw6sxNsKfxAwD/TWeS1A/DJM4nUv4628xzGZoBfGub46qezGivFRhvIBdVkZ9kcIu1b6to24MZmk8SXSj2gZzsuRPo52CzNq9pHAnWh8o9EUyM3pXlgr0Pzac5qNPUgLWk94tj4GIx6hD0nAapciSrU3lpVqr/VXRvjUVvKraL0WMZ1vEwus9QNTrMS48rN5XjcQWFYgBTHnmPkb8EpiSonCnYnaLdqlB1n8mUIzYLH8fh0js1QJRgihhhyqPkt6t7C6IgduOfKUFSMCTSZQhMm9HBr4MdxhfQAEFFHAM/wFNookG//ZxKwAAAABJRU5ErkJggg==",
    transport: "EgElEQVR4nO2aXWgVRxSAP5NeQ5NYrG1EsLU2QUFKrSBtpX1oS1D7ILYpxSi0r0KsiLQJQsAfhEIK6qPFIpj+0CI+KCnWWgOFpBEioqhg2/jzUqporW2sMWpMtg/nbHa9d++9+zN7d8H9YLjLuTPnnDk7c3ZmdiEjIyMjIyMjpcwHLgOXgHkJ+5IIuwBLy644DFTFodQgS1zXrybmRUj6ce5elDKhxYQuS/2aJO0jAOB3LaawDOqKlY8QZ7uBL/V6nWkjaR4B9pwf1OKWGeMx0woN4g7AFL1+JW6j04BPgF+Av4E7wFlgL/BS3MZdTEcS3yiQ0zKqsulxGW0GrlE6g+5RZ+JmmdobcMkGVLbUpCE7BywHjgAzgT7gHeBp4HHgReBTZDSsBXqIP3fYQ/2ES2ZfG88DM5DhbgFdOPMtnwXAFa33sWkn8vhe7ax2yVarrMe0sa2q+Eeczk8BNgBDmF2EBC2NLj8bVXYPGQ3fAm3AnKgBOK2Km12yDQl22i7HPHzt9ag3DhwF3ggbgFuqaJpLNqSy9yk+JZKiFnge8e0LYBgnGD3AM0EVegXAVhpYWQLUAR3ATcTnf4AVQRSconAKHFTZr0A78DpQY8DZsLwMHEfmv5/pMw5s9Kt8izY6ijPcnwMu5Cm9izyLdwAtwKxoffJNA/Av/jqeXzr8GHgSuKENPsMJQg3QCnwOnAEeeBi4CHyFZOOFQHWEjhZjvdrqBep9tmnD2UZ/4KfBUuC+GuoDVgJPIfNrMbATGNH/B4GfcHKHuwwjI2kbspp7wqfDpfhada8N2G6TthsFFvlp8BZwleLDaQLYh5MLqpG73qZOXvJo8wAZPbuBD4GmgJ0A54nkqxN57NG2vyGr2rLUI6u8fuAvJHoXkcfNkhLtbGYh+WEHki/u4u/5XowZSOBHCLdzrUUSuYUs5ytODfIEacd5slgB2i/X+v3lKpbgNSSI95D1Q6IEDcBmrb8zot39qqc7op7IBA2AvSlqjWi3CclH94HZEXVFImgA7PMJE0O3R3VtN6ArNEECMFfrXjdk+23Vd8GQvlAECcB7WvcHQ7ZzyD7BQh7fQLpPhcf1t4GHN2phGUPOPEDWPIkQZATUAX9QuI7wU9yPTa83VN/Zf6Z5BIwgS/SfkewdhHJBnh/KIwN4nT1UktnkJdZKj4Cr+vtshe3a3NTfyU1apQNwUn+9zvYHKFzympbZ/R0r62lMrEKG4FkKg++VIE3LFuKcdCXCVGR3aSHbaDeVCECnynb7d9k8LThHbG+65P3IYQwxyWYiyW+CFHxt0oUThHXEc5TmpgE5VH1oDZAkVThBsIBzyCnuC/g/9ytHHTLnO5E7byEvgZJ6BHvyLoWnz3GUCeTOp6rzNjnkLc83SHb+DzOdvg2cR061E5/zYQiybwh6zjBJmvcCFSELQNIOJEx1mr8Si5O5wGHkoDS1xJUEm4E/tf5AmbqJYioAOeRt9xrkrtt1j2Hm3aVvTH08HbXcQl6b5yDdX4qaYgz5um0IOAQcQN57ZmRkZGRkPOr8D0nlKB2DwxZMAAAAAElFTkSuQmCC",
    work: "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"
};
const labelImages = [
    {
        label: "Work",
        alias: "work",
        img: images64["work"]
    },
    {
        label: "Health",
        alias: "health",
        img: images64["health"]
    },
    {
        label: "Investments",
        alias: "investment",
        img: images64["investment"]
    },
    {
        label: "Dinner",
        alias: "dinner",
        img: images64["dinner"]
    },
    {
        label: "Groceries",
        alias: "market",
        img: images64["market"]
    },
    {
        label: "Transport",
        alias: "transport",
        img: images64["transport"]
    },
    {
        label: "Leisure",
        alias: "leisure",
        img: images64["leisure"]
    },
    {
        label: "Service",
        alias: "service",
        img: images64["service"]
    },
    {
        label: "House",
        alias: "house",
        img: images64["house"]
    },
    {
        label: "Tourism",
        alias: "tourism",
        img: images64["tourism"]
    },
    {
        label: "Sweets",
        alias: "sweet",
        img: images64["sweet"]
    },
    {
        label: "Gift",
        alias: "gift",
        img: images64["gift"]
    },
    {
        label: "Education",
        alias: "study",
        img: images64["study"]
    },
    {
        label: "Tax",
        alias: "tax",
        img: images64["tax"]
    }
];
const components = {
    LogInForm: `
    <form id="{field.id}" class="div--scrollable" action="window.application.callHandler(this,\'{field.id}Submit\');">
      <div class="field">
        <label>Country</label>
        <input type="text" onchange="window.application.callHandler(this,\'{field.id}CountryChange\');" />
</div>
<div class="field">
        <label>Entity</label>
        <input type="text" onchange="window.application.callHandler(this,\'{field.id}EntityChange\');" />
</div>
      <input type="submit" value="Submit">
    </form>
  `,
    liabilityReport: `
    <div id="{field.id}" class="{field.className}" id="{field.id}"><div class="liabRep-header">Summary</div>{field.content}</div>
  `,
    liabRepRow: `<div class="row liabRep-row">
  <div class="liabRep-cel liabRep-source">{field.debtor}</div>
  <div class="liabRep-cel liabRep-cred">{field.credit}</div>
  <div class="liabRep-cel liabRep-debt">{field.debit}</div>
  <div class="liabRep-cel liabRep-source">{field.currency}</div>
</div>`,
    blogContainer: `
    <div class="page-body div--scrollable">
      <article class="introduction">
  <p>Welcome to my blog, where I give daily updates about my projects, studies and leisure activities.</p>
</article>
      <div class="post-container" id="postContainer">
  {field.children}
</div>
  `,
    blogPost: `
    <article class="post">
      <div class="post-details">
        <p class="post-title">{field.title}</p>
  <p class="post-date">{field.date}</p>
</div>
      <p class="post-author">{field.author}</p>
<p class="post-text">{field.text}</p>
      <img src="{field.src}" alt="{field.alt}" />
    </article>
  `,
    labelField: `
    <li class="direction-option">
      <input type="radio" id="{field.alias}" name="label" value="{field.label}" alt="{field.label}" {field.checked} onchange="window.application.callHandler(this, '{field.id}')">
      <label for="{field.alias}">
        <img class="img-swap icon-big" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAA{field.img}"/>
      </label>
    </li>`,
    radioField: `
  <label class="rad-label">
    <input type="radio" class="rad-input" name="{radio.id}" value="{radio.value}"{radio.checked} onchange="window.application.callHandler(this,\'{radio.id}\')">
    <div class="rad-design"></div>
    <div class="rad-text">{radio.label}</div>
  </label>
  `,
    labelsField: `<div id="{field.id}" class="container"><ul class="direction">{field.content}</ul></div>`,
    image: `<img src="data:image/png;base64,{field.img}"/>`,
    button: '<button id="{button.id}" type="button" class="{button.className}" onClick="window.application.callHandler(this,\'{button.id}\')">{button.content}</button>',
    dataList: '<datalist id="{dl.id}" class="comboBox">{dl.options}</datalist>',
    comboBox: '<div id={cb.id}><input class="{cb.className}" type="text" list="{cb.comboId}"{cb.value} onchange="window.application.callHandler(this,\'{cb.comboId}\')"><datalist id="{cb.comboId}" class="comboBox">{cb.options}</datalist></div>',
    tablePagination: '<div id="{pagination.id}" class="pagination"><span>Rows per page:&nbsp;</span>{pagination.cbRowsPerPage}{pagination.carrosel}</div>',
    container: '<div id="{container.id}" class="{container.className}">{container.content}</div>',
    th: '<th id="{cell.id}">{cell.children}</th>',
    simple_li_click: '<li onclick="{li.click}">{li.content}</li>',
    thead: '<thead id="{row.id}"><tr id="th{row.id}">{row.content}</tr></thead>',
    form: '<form id="{form.id}" class="{form.className}" onsubmit="window.application.callHandler(this,\'{form.id}\')">{form.fields}</form>',
    //textField: '<div id="{text.id}" class="{text.className}"><label for="{this.inputId}">{text.name}</label><input type="text" id="{this.inputId}" onchange="window.application.callHandler(this,\'{text.id}\')" /></div>',
    textField: `
  <div id="{field.id}" class="container text-container">
    <div class="textfield {field.invalidDiv}">
      <input id="{field.id}Input" list="{field.listId}" required class="{field.invalid}" type="text" placeholder="{field.label}" onchange="window.application.callHandler(this,\'{field.id}Change\');" value="{field.value}" />
      <label for="{field.id}Input" class="field-label {field.invalid}">{field.label}</label>
      {field.dataList}
      <div class="containerIcon">
        <div id="{field.id}InputErrorIcon" class="invalidIcon {field.hideError}" onmouseover="displayInvalidTooltip">!</div>
      </div>
    </div>
    <div id="{field.id}InputTooltip" class="tooltip {field.hideError}">{field.validationMessage}</div>
  </div>`,
    bookField: `
  <div id="{field.id}" class="book-dropdown">
    {field.input}
    <div class="book-dropdown-content">
      {field.list}
    </div>
  </div>`,
    simpleTextField: `<div id="{field.id}" class="container">
  <div class="textfield {field.invalidDiv}">
    <label for="{field.id}Input" class="field-label {filed.hideLabel} {field.invalid}">{field.label}</label>
    <input id="{field.id}Input" class="{field.invalid}" type="text" maxlength="30" placeholder="{field.label}" onchange="window.application.callHandler(this,\'{field.id}Change\');" onfocus="window.application.callHandler(this,\'{field.id}Focus\');" onblur="window.application.callHandler(this,\'{field.id}Blur\');" value="{field.value}" />
    <div class="containerIcon">
      <div id="{field.id}InputErrorIcon" class="invalidIcon {field.hideError}" onmouseover="displayInvalidTooltip">!</div>
    </div>
  </div>
  <div id="{field.id}InputTooltip" class="tooltip {field.hideError}">{field.validationMessage}</div>
</div>`,
    amountField: `<div id="{field.id}" class="container amount-container">
  <div class="textfield modalfield">
    <div class="amount-currency-container">
      <div class="currency-dropdown">
        <label>{field.currency}</label>
        <div class="currency-dropdown-content">
          {field.currencyList}
        </div>
      </div>
    </div>
    <label for="{field.id}Input" class="field-label hide">{field.label}</label>
    <input id="{field.id}Input" class="amount-input" type="number" maxlength="30" min=0 step=0.01 value={field.value} placeholder="{field.label}" onchange="window.application.callHandler(this, '{field.id}')" />
  </div>
</div>
<div class="direction-container">
  <ul class="direction">
    <li class="direction-option">
      <input type="radio" id="{field.id}Income" name="{field.id}Direction" value="income" alt="Income" {field.incomeChecked} onchange="window.application.callHandler(this, '{field.id}Dir')">
      <label for="{field.id}Income">
        <img class="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADmElEQVR4nO2bS0hUURjHf41KYmgZBRE9QFqUPaQgohZRYJsgCCMzCtJVQdEm0iAMKloEQbSIiGhVUBG0iB6IC5WgZS1UKowIo4VZCL1MMm1xZnDOQWfuedxzRq8/ODhX7vnu//vu3O9+5zGQPNYB3cBHYG9gLd4pQTg/nm79YeX4p4UJ58eB3rBy/LIC+IkcgLqgijzzGNn552Hl+GUfsvO/gKqgijxSDnxCDkBLUEWeuYrsfA/ibZAINgB/mXB+DNgRVJFHUsBL5Lt/K6gizxxHdv4rsCioIo8sAYaQA3BkshPneBSlSyvQAJQa9C0HFmcddwE7EYGYFhxGvns2bQRY41e+HaWIkZqrAFzMdbHiODyw5CSwMuv4OyKB6TIKtAEXXIjyRSXwDfkO1gZV5JlryM4/DSvHL1XAHyacH0XM3iSGhyS4atuCqNMzzv8GlgVV5JkXyHf/fFg5fqlDdn4AqAiqyCMlwDvkABwNqsgzJ5Cdf4vn4szFxVZjlrBSwDnlf82I19+04QruavYuz9qt2Y786rJpY8BWv/LtmAu8wd3dD1b0mOaAZsSzn6EfuGdoqwe4b9jXGpMZoVWIBcbsmZo9wBMniqKxELiU1mLKEIZD5Tbkr+8jCxGm3MDNo6e9ONqgGPgBLLdyxYwO3ARgXOeiFcBnpfMpa1fMCBKA60rHbsItMakBiL3vZkSFlun0D9imeWGXOAtAKkKHIuBm+m+G24hlp2lPlDrgGLAx63gQOBPRfhmwCbPFDRBTZK8QEyS50Jk4rdQRMB/hcPbXbdIlpiku9B79pKS2PmCBYttbElR3VnQRvXiqdyhyf1wByJcDXgPD6c/DiMchatIpi3heFOY5tCWRLwd8QExY7gLaEQMgU54hXp1RWA/s1rB9WePcg4gdY7HTiPx1a3TY1+trcEaT+AAUI563VjTfjwp9wFnEEHMqTgOHItpbqnn9do1za7IPioEH2G8gqEU8U8dznFOdbnFgvIKcwt3uibici5XE5wA1AJ2ISi9q06FJw26Tpm0dzZ3ZHWe/AaEFhEYthSuJb09OtYZt3YRqNRx2NWLrUOyq5axNy1cKxzYanPEkPgBqDtBd4tL55UXBDodzPcf50MkBs8PhQiTxAVBzQA16Q0sdCnY4nE3chVBBDocHHYlQ7biyC/BFOTbZPj+l3QPpDzYVVQ+wVjFeBNxF/GLD1O4IcAd5WQ7EJupeS80DQP1/Q7c2KrewnUoAAAAASUVORK5CYII="/>
      </label>
    </li>
    <li class="direction-option">
      <input type="radio" id="{field.id}Expense" name="{field.id}Direction" value="expense" alt="Expense" {field.expenseChecked} onchange="window.application.callHandler(this, '{field.id}Dir')">
      <label for="{field.id}Expense">
        <img class="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABGUlEQVRIie3UPUvDUBQG4Ad161AQXfwCQTo66yIiDoqO4tw/UcRd0NH/4OBmB0HE2UkQBAdxbV0cHBShqGAdjBSKtyRtLnTICweS3JDncLk5FCkyBNnCE9oDVhObWeBmDuhfNULINk7wgPfk5agZx3mgy2hZwGOCvKCGRUxgNNDMIAWW8Zw8uMPcP43lDu+ildycoRTYkdzh7+TiECMBNAr8gWoPMAR/4hhTmMFFVnglBdoN11HpWp/NCqdNG7dYDazPx4KrwmeghMtYcCgV3GdEgyMzbXbw2ge60S84hiOdX7GOct/tp8w0rhPwC3uxQVjXGa0NLMXEyljDqc7WXmFy0A9nORgt7Os9WnOD33CDA7+jsUiR4c4PF/oFIjYEfRAAAAAASUVORK5CYII="/>
      </label>
    </li>
  </ul>
</div>`,
    amountLiability: `<div id="{field.id}" class="container">
  <div class="textfield modalfield">
    <label for="{field.id}Input" class="field-label hide">{field.label}</label>
    <input id="{field.id}Input" class="amount-input" type="number" maxlength="30" min=0 step=0.01 value={field.value} placeholder="{field.label}" onchange="window.application.callHandler(this, '{field.id}')" />
    <div class="direction-container">
      <ul class="direction">
        <li class="direction-option">
          <input type="radio" id="{field.id}Income" name="{field.id}Direction" value="income" alt="Income" {field.incomeChecked} onchange="window.application.callHandler(this, '{field.id}Dir')">
          <label for="{field.id}Income">
            <img class="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADmElEQVR4nO2bS0hUURjHf41KYmgZBRE9QFqUPaQgohZRYJsgCCMzCtJVQdEm0iAMKloEQbSIiGhVUBG0iB6IC5WgZS1UKowIo4VZCL1MMm1xZnDOQWfuedxzRq8/ODhX7vnu//vu3O9+5zGQPNYB3cBHYG9gLd4pQTg/nm79YeX4p4UJ58eB3rBy/LIC+IkcgLqgijzzGNn552Hl+GUfsvO/gKqgijxSDnxCDkBLUEWeuYrsfA/ibZAINgB/mXB+DNgRVJFHUsBL5Lt/K6gizxxHdv4rsCioIo8sAYaQA3BkshPneBSlSyvQAJQa9C0HFmcddwE7EYGYFhxGvns2bQRY41e+HaWIkZqrAFzMdbHiODyw5CSwMuv4OyKB6TIKtAEXXIjyRSXwDfkO1gZV5JlryM4/DSvHL1XAHyacH0XM3iSGhyS4atuCqNMzzv8GlgVV5JkXyHf/fFg5fqlDdn4AqAiqyCMlwDvkABwNqsgzJ5Cdf4vn4szFxVZjlrBSwDnlf82I19+04QruavYuz9qt2Y786rJpY8BWv/LtmAu8wd3dD1b0mOaAZsSzn6EfuGdoqwe4b9jXGpMZoVWIBcbsmZo9wBMniqKxELiU1mLKEIZD5Tbkr+8jCxGm3MDNo6e9ONqgGPgBLLdyxYwO3ARgXOeiFcBnpfMpa1fMCBKA60rHbsItMakBiL3vZkSFlun0D9imeWGXOAtAKkKHIuBm+m+G24hlp2lPlDrgGLAx63gQOBPRfhmwCbPFDRBTZK8QEyS50Jk4rdQRMB/hcPbXbdIlpiku9B79pKS2PmCBYttbElR3VnQRvXiqdyhyf1wByJcDXgPD6c/DiMchatIpi3heFOY5tCWRLwd8QExY7gLaEQMgU54hXp1RWA/s1rB9WePcg4gdY7HTiPx1a3TY1+trcEaT+AAUI563VjTfjwp9wFnEEHMqTgOHItpbqnn9do1za7IPioEH2G8gqEU8U8dznFOdbnFgvIKcwt3uibici5XE5wA1AJ2ISi9q06FJw26Tpm0dzZ3ZHWe/AaEFhEYthSuJb09OtYZt3YRqNRx2NWLrUOyq5axNy1cKxzYanPEkPgBqDtBd4tL55UXBDodzPcf50MkBs8PhQiTxAVBzQA16Q0sdCnY4nE3chVBBDocHHYlQ7biyC/BFOTbZPj+l3QPpDzYVVQ+wVjFeBNxF/GLD1O4IcAd5WQ7EJupeS80DQP1/Q7c2KrewnUoAAAAASUVORK5CYII="/>
          </label>
        </li>
        <li class="direction-option">
          <input type="radio" id="{field.id}Expense" name="{field.id}Direction" value="expense" alt="Expense" {field.expenseChecked} onchange="window.application.callHandler(this, '{field.id}Dir')">
          <label for="{field.id}Expense">
            <img class="img-swap icon-small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABGUlEQVRIie3UPUvDUBQG4Ad161AQXfwCQTo66yIiDoqO4tw/UcRd0NH/4OBmB0HE2UkQBAdxbV0cHBShqGAdjBSKtyRtLnTICweS3JDncLk5FCkyBNnCE9oDVhObWeBmDuhfNULINk7wgPfk5agZx3mgy2hZwGOCvKCGRUxgNNDMIAWW8Zw8uMPcP43lDu+ildycoRTYkdzh7+TiECMBNAr8gWoPMAR/4hhTmMFFVnglBdoN11HpWp/NCqdNG7dYDazPx4KrwmeghMtYcCgV3GdEgyMzbXbw2ge60S84hiOdX7GOct/tp8w0rhPwC3uxQVjXGa0NLMXEyljDqc7WXmFy0A9nORgt7Os9WnOD33CDA7+jsUiR4c4PF/oFIjYEfRAAAAAASUVORK5CYII="/>
          </label>
        </li>
      </ul>
    </div>
  </div>
</div>`,
    flag: '<img id="{img.id}" class="{img.className}" title={img.title} onClick="window.application.callHandler(this,\'{img.id}\')" alt="{img.title}" src="data:image/png;base64,{img.imgBase64}" />',
    countryField: `
  <div id="{field.id}" class="country-dropdown">
    {country.selected}
    <div class="country-dropdown-content">
      {country.list}
    </div>
  </div>`,
    liabilityButton: `
  <div id={btn.id} class="{btn.className}">
    <input id="cb{btn.id}" class="m-modal__toggle" type="checkbox">
    <div class="m-modal__backdrop"></div>
    <div class="m-modal__content">{btn.content}</div>
    <img class="img-swap" src="data:image/png;base64,{btn.img}"/>
  </div>`,
    save: `
    <button id={save.id} class="{save.className}" onclick="window.application.callHandler(this, '{save.id}')" {save.disabled}> 
    <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADt0lEQVRoge2YvWsUQRjGn9m7fBg/iJLEJo2NAbFRtPQfSCEpFOwshPSpYhMUq4CojQr+C4JRCyWNgqAgsVUkhSAYNGcgGtDkEnPvY7E7u7Ozs7O3J5tEuBfm9m5m7+b3zPsxswd0rWtd69pumsobOPNydZxUD0iMEgBArC4343FuNfH+wgigFBQAAgAJkhDzKgIRQihgdBUhRAQtEUjciImFLdQOHflJUTc+TgzfaUdAkDdgw4eEaQthjGbAkwQluoIgEfUjHgeTn6Z+JQahePvE48b1dgTU8wWk4R38EAknVUqFq48IDkjgjXb6/uvU999cORuCh6pAPQkBUera2JPv/YsTI1d9AvI9YMO7PCAShopefQ0tAjJsYngiu0g0vJJMrN8qcnpsrjHbkYAieAARtBlCOr6ZhJMkYZUvIAkpJoORCkwfn1ueKi+gAB5AnHy6UYuwhNArQIcdM/B6fgU1k8eQnwMWvBNAomlVci9jz6UTVkSyC2B7wAEfdR0uLaAIHgg9EMInChjNbMLrkpqZglFZjUPICQ9fGOQLKIAHwhW0XaXvTycoQWY9YFaqsKKVgy8UYMK7dLjCwtzQ4rKakwM6V2jc74T3aPDsA354qADL6y2M9CebuZmEjPMgaa8unzIqk8QeEApWmoxxbHifDzxl1IInEAQJrKr34OaHJr6tb2eOBa24pEqmUqXKrYbfIO59DhD07XPDd+IBGx4A+g/UsPGrBQoBpfDu9wAuvf0DcLtoHbRsADVHt0JvXx1BX28peK8AG54g6vUABweDdEix1wgde9L08SCvziddbvjOQ8iq7Slh0YcdgfdUQu9OvNfh/QL+A3ivgL0E79NRHEJ7GN4vYC/Be0QUl1EL/txQD2ZODmCkT8UPNOaJ0/fZPPfYfY2m4NanGhbWggw8PQoKd2J75f8dPtsvIhjqIaaObZeCB4pOo46wqQJevx/qsUPRjC23eZLYHfNVwacfatqD9wrIS9gq4ZPn4jR8Z2XUAR9Wm+rgRaQUvF9ATqmsFJ7l4L0C8up8lfA6hGx4epQU7sSZTapCeA3aLrxfgAseqBQ+bO3DFwjIwusfrQre/JMgBd9JFXLBo2L4JITS8D4/FJbRr4/m0Xj4NDmYVQhv5sGP+RdYe/bcKiZlBETKg9YmatubumtH4GHOW6DA99/oEoDRoxfPx/Ag0GgSw73VwK9sqXjyQ+Pj8aQkvpT2gBCT+ovmIswutrDclErg7y7ttzbQEF4UJ3Nd0LWuda1ru2p/ASsCdZ0lM904AAAAAElFTkSuQmCC"/>
    </button>
  `,
    tesseractForm: `
  <form name="tesseractForm" action="JavaScript:handleTesseractSubmitFile()">
    <input type="file" id="{tesseract.id}" name="filename" accept="image/*" onChange="window.application.callHandler(this, '{tesseract.id}')">
    <input type="submit">
  </form>
  `
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"kW8fe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function assembleUrl(entity, filter) {
    const base = localStorage.getItem("entityUrl");
    let query = "?entity=" + entity;
    if (filter) query += "&" + Object.keys(filter).map((k)=>k + "=" + filter[k]).join("&");
    return base + query;
}
async function operate(route, payload, filter) {
    try {
        let response = await fetch(assembleUrl(route, filter), payload);
        if (response.status >= 200 && response.status <= 202) {
            const body = await response.json();
            const items = body.result ?? body;
            return typeof items === "string" ? JSON.parse(items) : items;
        } else {
            alert("Response not 200: " + response.status + ". Error: " + JSON.stringify(response.body));
            alert("Endpoint used: " + localStorage.getItem("entityUrl"));
            return [];
        }
    } catch (ex) {
        alert(ex);
        return [];
    }
}
function buildPayload(data, method) {
    return {
        method: method,
        body: JSON.stringify(data),
        headers: {
            origin: "https://mayerhofer.github.io",
            "Content-Type": "application/json"
        }
    };
}
class EntityAPI {
    constructor(route){
        this.route = route;
    }
    async get(filter) {
        return await operate(this.route, null, filter);
    }
    async save(data) {
        if (data._id) await operate(this.route, buildPayload(data, "PUT"));
        else {
            const response = await operate(this.route, buildPayload(data, "POST"));
            data._id = response.insertedId;
        }
        return data;
    }
    async delete(data) {
        return await operate(this.route, buildPayload(data, "DELETE"));
    }
}
exports.default = EntityAPI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"390bl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _textField = require("../components/textField");
var _textFieldDefault = parcelHelpers.interopDefault(_textField);
var _flagCombo = require("./flagCombo");
var _flagComboDefault = parcelHelpers.interopDefault(_flagCombo);
var _liabilityModal = require("./liabilityModal");
var _liabilityModalDefault = parcelHelpers.interopDefault(_liabilityModal);
var _templates = require("../templates");
var _toast = require("../components/toast");
var _toastDefault = parcelHelpers.interopDefault(_toast);
var _entity = require("../servers/entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
var _div = require("../html/div");
var _divDefault = parcelHelpers.interopDefault(_div);
var _button = require("../html/button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
var _image = require("../html/image");
var _imageDefault = parcelHelpers.interopDefault(_image);
var _dateField = require("../html/dateField");
var _dateFieldDefault = parcelHelpers.interopDefault(_dateField);
const buildNewState = (props)=>{
    const cf = props.element;
    const isEdit = typeof props.element === "object";
    if (isEdit) return {
        isEditMode: true,
        amount: cf.amount,
        nextElementId: cf.elementId,
        country: cf.location,
        currency: cf.currency,
        date: new Date(cf.date),
        direction: cf.direction,
        description: cf.description,
        provider: cf.provider,
        labels: cf.labels,
        book: cf.book,
        liability: undefined
    };
    else return {
        isEditMode: false,
        amount: 10,
        nextElementId: props.data.map((d)=>d.elementId).filter((id)=>id > 0).sort((a, b)=>a - b).pop() + 1,
        country: "Spain",
        currency: "EUR",
        date: new Date(),
        direction: false,
        description: "",
        provider: "",
        labels: [
            ""
        ],
        book: "M EUR",
        liability: undefined
    };
};
const validDefinitionObject = {
    validDef: {
        required: true,
        restricted: false,
        options: []
    }
};
const buildAutoOptions = (cashflows)=>{
    const options = cashflows.map((cf)=>cf.provider);
    const result = new Set();
    options.sort();
    for(let i = 0; i < options.length - 1; i++)if (options[i] == options[i + 1]) result.add(options[i]);
    return result;
};
class FinanceForm extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        if (!Array.isArray(props.data)) throw "Missing prop cashflow array or cashflow element";
        this.state = {
            isEditMode: typeof props.element === "object",
            isSaving: false,
            labelOptions: [],
            bookOptions: [],
            validationState: {
                provider: structuredClone(validDefinitionObject),
                description: structuredClone(validDefinitionObject),
                labels: structuredClone(validDefinitionObject),
                book: structuredClone(validDefinitionObject)
            },
            ...buildNewState(props)
        };
    }
    getDerivedState(props) {
        if (!Array.isArray(this.props.data)) throw "Missing prop cashflow array or cashflow element";
        return Object.assign({}, this.state, buildNewState(props));
    }
    componentDidMount() {
        const self = this;
        const optionApi = new (0, _entityDefault.default)("option");
        optionApi.get().then((options)=>{
            const labelOptions = options.filter((option)=>option.combo === "labels").map((o)=>o.description);
            const bookOptions = options.filter((option)=>option.combo === "books");
            const labels = structuredClone(validDefinitionObject);
            const book = structuredClone(validDefinitionObject);
            book.validDef.restricted = labels.validDef.restricted = true;
            labels.validDef.options = labelOptions;
            book.validDef.options = bookOptions.filter((o)=>o.currency === (this.props.currency ?? "EUR")).map((o)=>o.description);
            self.setState({
                labelOptions,
                bookOptions,
                validationState: Object.assign({}, this.state.validationState, {
                    labels,
                    book
                })
            });
        });
    }
    cleanState() {
        const newProps = Object.assign({}, this.props, {
            element: undefined
        });
        this.setState(this.getDerivedState(newProps));
    }
    isValidToSave() {
        return this.state.provider.trim().length > 0 && this.state.description.trim().length > 0 && !Number.isNaN(this.state.amount) && this.state.labels.length > 0;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.element !== nextProps.element || this.state.isEditMode !== nextState.isEditMode || this.state.currency !== nextState.currency || this.state.date !== nextState.date || this.state.amount !== nextState.amount || this.state.country !== nextState.country || this.state.direction !== nextState.direction || this.state.book !== nextState.book || this.state.description !== nextState.description || this.state.provider !== nextState.provider || Array.isArray(nextProps.labels) && (this.state.labels.length !== nextProps.labels.length || !this.state.labels.every((i)=>nextState.labels.includes(i)));
    }
    handleCountryUpdate(country) {
        this.setState({
            country
        });
    }
    handleBookChange(e) {
        this.setState({
            book: typeof e === "string" ? e : e.innerHTML
        });
    }
    handleCurrencyUpdate(e) {
        const newOptions = this.state.bookOptions.filter((o)=>o.currency === e.value).map((o)=>o.description);
        const validationState = JSON.parse(JSON.stringify(this.state.validationState));
        validationState.book.validDef.options = newOptions;
        this.setState({
            currency: e.value,
            validationState
        });
    }
    handleDirectionChange(e) {
        this.setState({
            direction: e.value === "income"
        });
    }
    handleLabelChange(e) {
        this.setState({
            labels: [
                e.value
            ]
        });
    }
    handleUpdateDate(e) {
        this.setState({
            date: new Date(e.value)
        });
    }
    handleUpdateAmount(e) {
        this.setState({
            amount: e.value
        });
    }
    handleBack() {
        this.cleanState();
        this.props.handleClose();
    }
    async handleSave() {
        try {
            const dt = this.state.date;
            const cfid = this.state.nextElementId;
            const newCashFlow = {
                date: dt.getTime(),
                currency: this.state.currency,
                location: this.state.country,
                direction: this.state.direction,
                provider: this.state.provider,
                description: this.state.description,
                labels: this.state.labels,
                book: this.state.book,
                amount: Number.parseFloat(this.state.amount),
                elementId: cfid
            };
            const saveObj = this.state.isEditMode ? Object.assign({}, this.props.element, newCashFlow) : newCashFlow;
            const cfApi = new (0, _entityDefault.default)("cashflow");
            const savedCf = await cfApi.save(saveObj);
            this.log("info", "CF saved", newCashFlow.provider);
            await this.saveLiability(cfid, savedCf);
            this.props.handleSave(savedCf);
            this.cleanState();
        } catch (ex) {
            this.log("error", ex.message, ex.stackTrace);
        }
    }
    async saveLiability(cfid, newCashFlow) {
        if (this.state.liability) {
            const lApi = new (0, _entityDefault.default)("liability");
            const obj = {
                ...this.state.liability,
                date: newCashFlow.date,
                cashflowId: cfid
            };
            const found = this.state.isEditMode && (await lApi.get()).find((l)=>l.cashflowId === cfid);
            if (found) {
                //update
                obj["elementId"] = found.elementId;
                obj["_id"] = found._id;
            } else {
                const maxIdRes = await lApi.get({
                    "type": "maxId"
                });
                const nextElementId = maxIdRes[0].maxId + 1;
                // insert
                obj["elementId"] = nextElementId;
            }
            await lApi.save(obj);
            this.log("info", "New liability saved successfully.", `CF id: ${cfid.toString()}`);
        }
    }
    handleProviderChange(provider) {
        this.setState({
            provider
        });
    }
    handleDescriptionChange(description) {
        this.setState({
            description
        });
    }
    handleCopy() {
        const changes = {
            isEditMode: false,
            nextElementId: this.props.data.map((d)=>d.elementId).filter((id)=>id > 0).sort((a, b)=>a - b).pop() + 1
        };
        this.setState(changes);
    }
    handleAddLiability(obj) {
        const cb = window.document.getElementById("cb" + this.id + "Liability");
        this.setState({
            liability: obj
        });
        cb.checked = false;
    }
    log(type, header, text) {
        this.buildRComponent({
            type,
            header,
            text,
            id: this.id + "Toast"
        }, (p)=>new (0, _toastDefault.default)(p));
    }
    render() {
        // Util Functions
        const buildTb = (props)=>this.buildRComponent(props, (p)=>new (0, _textFieldDefault.default)(p));
        const buildProps = (label)=>{
            return {
                id: this.id + label,
                label,
                value: this.state[label.toLowerCase()],
                validDef: this.state.validationState[label.toLowerCase()].validDef,
                update: this[`handle${label}Change`].bind(this)
            };
        };
        const currencyHtml = (0, _templates.currencies)[this.state.currency] ?? "?";
        const amountProps = {
            id: this.id + "Amount",
            label: "Amount",
            currency: currencyHtml,
            currencyList: Object.keys((0, _templates.currencies)).map((key)=>this.fill("radioField", {
                    id: this.id + "Currency",
                    value: key,
                    label: (0, _templates.currencies)[key]
                })).join(""),
            expenseChecked: this.state.direction ? "" : "checked",
            incomeChecked: this.state.direction ? "checked" : "",
            value: this.state.amount
        };
        const labelImgArray = (0, _templates.labelImages).map((label)=>this.fill("labelField", {
                id: this.id + "Labels",
                checked: Array.isArray(this.state.labels) && this.state.labels.indexOf(label.label) >= 0 ? "checked" : "",
                ...label
            }));
        const labelProps = {
            id: this.id + "Labels",
            content: labelImgArray.slice(0, 7).join("") + '</ul><ul class="direction">' + labelImgArray.slice(7).join("")
        };
        let dateValue = this.state.date.toISOString().slice(0, 11) + this.state.date.toString().slice(16, 21);
        let date = (0, _dateFieldDefault.default)(this.id + "Date", "Date", dateValue, this.handleUpdateDate.bind(this));
        let country = this.buildRComponent({
            id: this.id + "Country",
            country: this.state.country,
            handleChange: this.handleCountryUpdate.bind(this)
        }, (p)=>new (0, _flagComboDefault.default)(p));
        const providerProps = buildProps("Provider");
        const descProps = buildProps("Description");
        const bookFieldProps = buildProps("Book");
        let amount = this.fill("amountField", amountProps);
        let labels = this.fill("labelsField", labelProps);
        const bookProps = {
            id: this.id + "BookContainer",
            input: buildTb(bookFieldProps),
            list: "<ul>" + this.state.validationState.book.validDef.options.map((b)=>`<li onclick="window.application.callHandler(this,\'${this.id}Book\')">${b}</li>`).join("") + "</ul>"
        };
        let book = this.fill("bookField", bookProps);
        const lProps = {
            id: this.id + "LiabilityView",
            addLiability: this.handleAddLiability.bind(this),
            amount: this.state.amount,
            currency: this.state.currency
        };
        const liabilityView = this.buildRComponent(lProps, (p)=>new (0, _liabilityModalDefault.default)(p));
        // Nao deletei abaixo, porque o codigo e da mesma imagem em tamanho 100x100
        let liability = this.fill("liabilityButton", {
            id: this.id + "Liability",
            content: liabilityView,
            className: "form-button",
            img: (0, _templates.images64).liability
        });
        let save = (0, _buttonDefault.default)("form-button", (0, _imageDefault.default)("save"), this.id + "Save", this.handleSave.bind(this), !this.isValidToSave());
        let back = (0, _buttonDefault.default)("form-button", (0, _imageDefault.default)("back"), this.id + "Back", this.handleBack.bind(this));
        let copy = this.state.isEditMode ? (0, _buttonDefault.default)("form-button", (0, _imageDefault.default)("copy"), this.id + "Copy", this.handleCopy.bind(this)) : "";
        let actionButtons = (0, _divDefault.default)("buttons", [
            liability,
            back,
            copy,
            save
        ].join(""), this.id + "ActionButtons");
        this.registerHandler(this.id + "AmountDir", this.handleDirectionChange.bind(this));
        this.registerHandler(this.id + "Labels", this.handleLabelChange.bind(this));
        this.registerHandler(this.id + "Amount", this.handleUpdateAmount.bind(this));
        this.registerHandler(this.id + "Book", this.handleBookChange.bind(this));
        this.registerHandler(this.id + "Currency", this.handleCurrencyUpdate.bind(this));
        if (this.props.data.length > 1) providerProps.autoOptions = [
            ...buildAutoOptions(this.props.data)
        ];
        return (0, _divDefault.default)("page", [
            actionButtons,
            date,
            country,
            amount,
            buildTb(providerProps),
            buildTb(descProps),
            book,
            labels
        ].join(""), this.id);
    }
}
exports.default = FinanceForm;

},{"../framework/RComponent":"iu3rT","../components/textField":"hj91c","./flagCombo":"8O4nh","./liabilityModal":"grrMq","../templates":"18mfC","../components/toast":"clg1H","../servers/entity":"kW8fe","../html/div":"ie98x","../html/button":"jjZkH","../html/image":"d0VA3","../html/dateField":"l1qYn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hj91c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
class TextField extends (0, _rcomponent.RComponent) {
    // props = {label: 'Provider', value: provider.value, validDef: {restricted: false, required: true, options: []}}
    constructor(props){
        super(props);
        this.state = {
            hideError: " hide",
            invalidDiv: "",
            invalid: "",
            validationMessage: "",
            placeholder: props.label,
            value: props.value
        };
    }
    getDerivedState(props) {
        this.state = {
            hideError: " hide",
            invalidDiv: "",
            invalid: "",
            validationMessage: "",
            placeholder: props.label,
            value: props.value
        };
        return this.state;
    }
    handleValidation(val) {
        const props = this.props.validDef;
        const isFieldEmpty = typeof val !== "string" || val.trim().length <= 0;
        const hasValue = !isFieldEmpty;
        const isInOptions = props.options ? props.options.indexOf(val) >= 0 : false;
        const bIsValid = props.restricted ? isInOptions : props.required ? hasValue : true;
        const newState = {
            ...this.state
        };
        newState.hideError = bIsValid ? " hide" : "";
        newState.invalid = bIsValid ? "" : "text-red";
        newState.invalidDiv = bIsValid ? "" : "border-red";
        newState.validationMessage = bIsValid ? "" : isFieldEmpty ? "* Required Field" : "* Not a valid option.";
        newState.value = val;
        this.setState(newState);
    }
    handleUpdate(e) {
        let newValue = e.value;
        this.props.update(newValue);
        this.handleValidation(newValue);
    }
    render() {
        const prefix = this.id;
        const textValue = this.state.value;
        const autoOptions = this.props.autoOptions ? this.props.autoOptions.map((item)=>`<option${item == textValue ? " selected" : ""}>${item}</option$>`) : null;
        const dataList = autoOptions ? this.fill("dataList", {
            id: prefix + "DataList",
            options: autoOptions.join("")
        }) : "";
        const fieldProps = {
            id: prefix,
            label: this.props.label,
            listId: prefix + "DataList",
            dataList,
            ...this.state
        };
        this.registerHandler(prefix + "Change", this.handleUpdate.bind(this));
        return this.fill("textField", fieldProps);
    }
}
exports.default = TextField;

},{"../framework/RComponent":"iu3rT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8O4nh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _country = require("../servers/country");
var _countryDefault = parcelHelpers.interopDefault(_country);
class FlagCombo extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        this.state = {
            country: this.props.country ?? "Spain",
            countries: this.props.countryImg ?? []
        };
    }
    getDerivedState(props) {
        return Object.assign({}, this.state, {
            country: props.country ?? "Spain"
        });
    }
    // Load flag images
    componentDidMount() {
        // Inside asynchronous methods, context of this is lost.
        let field = this;
        // Load flags only if not already loaded to avoid infinite loop
        if (!Array.isArray(field.state.countries) || field.state.countries.length <= 0) // Istead of getting all and then filtering, better to make multiple requests since we don't need many countries.
        (0, _countryDefault.default).get([
            "PL",
            "IT",
            "CH",
            "BR",
            "ES",
            "DE",
            "FR",
            "AD",
            "PT"
        ]).then((data)=>{
            setTimeout(()=>{
                field.setState({
                    countries: data
                });
            }, 1000);
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.country !== nextState.country || this.state.countries !== nextState.countries;
    }
    handleChange(e) {
        this.setState({
            country: e.title
        });
        this.props.handleChange(e.title);
    }
    buildCountryProps(c) {
        let id = this.id + c.name.replace(/\s/g, "");
        this.registerHandler(id, this.handleChange.bind(this));
        return {
            id,
            title: c.name,
            imgBase64: c.flag
        };
    }
    getFlagProps() {
        const found = this.state.countries ? this.state.countries.find((c)=>c.name === this.state.country) : undefined;
        const flag = found ? found.flag : "";
        return {
            id: this.state.country,
            imgBase64: flag,
            className: this.state.countries.length > 0 ? "" : "country-hide"
        };
    }
    render() {
        const mapCountry = (c)=>this.fill("flag", this.buildCountryProps(c));
        return this.fill("countryField", {
            id: this.id,
            selected: this.fill("flag", this.getFlagProps()),
            list: this.state.countries ? this.state.countries.map(mapCountry).join("") : ""
        });
    }
}
exports.default = FlagCombo;

},{"../framework/RComponent":"iu3rT","../servers/country":"eExdh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eExdh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class CountryAPI {
    static cachedValues = {};
    static async get(arrayCountryCodes) {
        const toFetch = arrayCountryCodes.filter((x)=>!Object.keys(CountryAPI.cachedValues).includes(x));
        const result = await CountryAPI.fetchOnly(toFetch);
        result.forEach((r)=>CountryAPI.cachedValues[r.isoAlpha2] = r);
        return Object.values(CountryAPI.cachedValues).filter((x)=>arrayCountryCodes.includes(x.isoAlpha2));
    }
    static async fetchOnly(arrayCountryCodes) {
        const suffix = arrayCountryCodes.map((a, i)=>"c" + i.toString() + "=" + a).join("&");
        const address = localStorage.getItem("countryUrl") + "?" + suffix;
        const response = await fetch(address);
        if (response.status === 200) {
            let body = await response.json();
            return body.documents;
        } else {
            let text = await response.json();
            alert(text);
            alert("Response not 200: " + response.status + ". Error: " + JSON.stringify(response.body));
            alert("Endpoint used: " + localStorage.getItem("entityUrl"));
            return [];
        }
    }
}
exports.default = CountryAPI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"grrMq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _templates = require("../templates");
var _textField = require("../components/textField");
var _textFieldDefault = parcelHelpers.interopDefault(_textField);
var _div = require("../html/div");
var _divDefault = parcelHelpers.interopDefault(_div);
var _button = require("../html/button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
class LiabilityModal extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        this.state = {
            liability: true,
            amount: this.props.amount ? this.props.amount : 10,
            currency: props.currency,
            debtor: "Cris Carnaval",
            validationState: {
                debtor: {
                    validDef: {
                        required: true,
                        restricted: false
                    }
                }
            }
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currency !== nextProps.currency || this.state.amount !== nextState.amount;
    }
    getDerivedState(props) {
        const shouldUpdateAmount = props.amount > 0 && this.props.amount !== props.amount;
        return {
            liability: this.state.liability,
            amount: shouldUpdateAmount ? this.state.liability ? props.amount : props.amount / 2 : this.state.amount,
            currency: props.currency,
            debtor: this.state.debtor,
            validationState: {
                debtor: {
                    validDef: {
                        required: true,
                        restricted: false
                    }
                }
            }
        };
    }
    handleDebtorChange(e) {
        this.setState({
            debtor: e.value
        });
    }
    handleCurrencyUpdate(e) {
        this.setState({
            currency: e.value
        });
    }
    handleAmountChange(e) {
        this.setState({
            amount: e.value
        });
    }
    handleDirectionChange(e) {
        let liability = e.value !== "income";
        this.setState({
            liability,
            amount: liability ? this.props.amount : this.props.amount / 2
        });
    }
    handleSave() {
        let dt = new Date();
        const obj = {
            dueIn: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
            source: this.state.debtor,
            liability: this.state.liability,
            amount: Number.parseFloat(this.state.amount),
            currency: this.state.currency,
            cashflowId: -1,
            elementId: -1,
            payed: false,
            updated: dt.getTime()
        };
        this.props.addLiability(obj);
    }
    render() {
        const buildTb = (props)=>this.buildRComponent(props, (p)=>new (0, _textFieldDefault.default)(p));
        const buildProps = (label)=>{
            return {
                id: this.id + label,
                label,
                value: this.state[label.toLowerCase()],
                validDef: this.state.validationState[label.toLowerCase()].validDef,
                update: this[`handle${label}Change`].bind(this)
            };
        };
        const buildCurrProps = (key)=>{
            return {
                id: this.id + "Currency",
                value: key,
                label: (0, _templates.currencies)[key],
                checked: this.state.currency === key ? " checked" : ""
            };
        };
        const currencyList = Object.keys((0, _templates.currencies)).map((key)=>this.fill("radioField", buildCurrProps(key))).join("");
        const amountProps = {
            id: this.id + "Amount",
            expenseChecked: this.state.liability ? "checked" : "",
            incomeChecked: this.state.liability ? "" : "checked",
            currency: (0, _templates.currencies)[this.state.currency] ?? "?",
            value: this.state.amount,
            label: "Amount",
            currencyList
        };
        const amount = this.fill("amountField", amountProps);
        const debtor = buildTb(buildProps("Debtor"));
        const button = (0, _buttonDefault.default)("table__header-add", "<span>+</span>", "AddNewLiability", this.handleSave.bind(this));
        const header = (0, _divDefault.default)("table__header", button);
        const content = `
    <h1>Add Liability</h1><br />${header}<br />
    ${debtor}<br />${amount}<br />
    `;
        this.registerHandler(this.id + "Currency", this.handleCurrencyUpdate.bind(this));
        this.registerHandler(this.id + "Amount", this.handleAmountChange.bind(this));
        this.registerHandler(this.id + "AmountDir", this.handleDirectionChange.bind(this));
        return (0, _divDefault.default)("liability", content, this.id);
    }
}
exports.default = LiabilityModal;

},{"../framework/RComponent":"iu3rT","../templates":"18mfC","../components/textField":"hj91c","../html/div":"ie98x","../html/button":"jjZkH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ie98x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>Div);
function Div(className, content, id) {
    const idText = id ? `id="${id}" ` : "";
    return `<div ${idText}class="${className}">${content}</div>`;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jjZkH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>Button);
var _rcomponent = require("../framework/RComponent");
function Button(className, content, id, clickHandler, isDisabled) {
    const onClick = `window.application.callHandler(this,\'${id}\')`;
    const disabled = isDisabled ? " disabled" : "";
    (0, _rcomponent.application).handlers[id] = clickHandler;
    return `<button id="${id}" type="button" class="${className}" onClick="${onClick}"${disabled}>${content}</button>`;
}

},{"../framework/RComponent":"iu3rT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"clg1H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
class Toast extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
    }
    render() {
        const toast = window.document.querySelector(".toast");
        const type = this.props.type;
        toast.classList.add("toast-" + type);
        toast.classList.remove("unshow");
        toast.querySelector(".toast-header p").textContent = this.props.header;
        toast.querySelector(".toast-details p").textContent = this.props.text;
        const closeButton = toast.querySelector(".toast-close");
        closeButton.onclick = ()=>{
            toast.classList.add("unshow");
            toast.classList.remove("toast-" + type);
        };
    //return
    }
}
exports.default = Toast;

},{"../framework/RComponent":"iu3rT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d0VA3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>Image);
var _templates = require("../templates");
function Image(name) {
    return `<img src="data:image/png;base64,${(0, _templates.images64)[name]}"/>`;
}

},{"../templates":"18mfC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l1qYn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>DateField);
var _rcomponent = require("../framework/RComponent");
function DateField(id, label, value, onChange) {
    const onChangeEvent = `window.application.callHandler(this, '${id}')`;
    (0, _rcomponent.application).handlers[id] = onChange;
    return `
  <div id="${id}" class="container container-date">
    <div class="datefield">
      <label for="${id}Input" class="field-label">${label}</label>
      <input id="${id}Input" type="datetime-local" maxlength="30" value="${value}" onchange="${onChangeEvent}" />
    </div>
  </div>`;
}

},{"../framework/RComponent":"iu3rT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hHmw3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _entity = require("../servers/entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
var _div = require("../html/div");
var _divDefault = parcelHelpers.interopDefault(_div);
var _button = require("../html/button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
var _image = require("../html/image");
var _imageDefault = parcelHelpers.interopDefault(_image);
class GenericTable extends (0, _rcomponent.RComponent) {
    // props: {
    //   entity: string;
    //   handleAdd: (data) => void;
    //   handleEdit: (row) => void;
    //   formatter: object; // (fields except mandatory date and elementId)
    // }
    constructor(props){
        super(props);
        this.state = {
            data: [],
            start: 0,
            end: 15,
            editing: null,
            increment: 15,
            showEdit: false,
            formatter: props.formatter
        };
    }
    componentDidMount() {
        const api = new (0, _entityDefault.default)(this.props.entity);
        const self = this;
        api.get(this.props.filter).then((data)=>{
            // At the very least sort by date descending to present meaninful information right on top.
            // Should always have the most recent cashflows so next(elementId) can be passed to CREATE form.
            if (Array.isArray(data) && data.length > 0 && typeof data[0].date === "number") data.sort((a, b)=>{
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            self.setState({
                data
            });
        });
    }
    handleDelete(element) {
        if (confirm("Delete?")) {
            const api = new (0, _entityDefault.default)(this.props.entity);
            const tableSelf = this;
            api.delete(element).then(()=>{
                if (tableSelf.props.entity === "cashflow") {
                    const lApi = new (0, _entityDefault.default)("liability");
                    lApi.get().then((res)=>{
                        const found = res.find((l)=>l.cashflowId === element.elementId);
                        if (found) lApi.delete(found);
                    });
                }
                tableSelf.setState({
                    ...tableSelf.state,
                    data: tableSelf.state.data.filter((ele)=>ele !== element)
                });
            });
        }
    }
    handleEdit(element) {
        this.setState({
            showEdit: true,
            editing: element
        });
    }
    handleSelect(element) {
        if (typeof this.props.handleSelect === "function") this.props.handleSelect(element, this.handleRemoveRow.bind(this));
    }
    handleBack() {
        const inc = this.state.increment;
        this.setState({
            start: this.state.start - inc,
            end: this.state.end - inc
        });
    }
    handleForw() {
        const inc = this.state.increment;
        this.setState({
            start: this.state.start + inc,
            end: this.state.end + inc
        });
    }
    handleSaveOne(one) {
        const elements = this.state.data;
        const found = elements.find((o)=>o._id === one._id);
        if (found) elements[elements.indexOf(found)] = one;
        else {
            elements.unshift(one);
            elements.sort((a, b)=>{
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        }
        this.setState({
            data: elements
        });
    }
    handleClose() {
        this.setState({
            showEdit: false,
            editing: null
        });
    }
    handleRemoveRow(elementId) {
        this.setState({
            ...this.state,
            data: this.state.data.filter((ele)=>ele.elementId !== elementId)
        });
    }
    buildCell(key, row, formatter) {
        return formatter[key](row);
    }
    rowToHtml(row) {
        const formatter = this.state.formatter;
        const fields = Object.keys(formatter).map((key)=>this.buildCell(key, row, formatter));
        let actionButtons = "";
        if (typeof this.props.buildEditComponent === "function") {
            const editBtn = (0, _buttonDefault.default)("act-btn", (0, _imageDefault.default)("edit"), this.id + "EditBtn" + row.elementId, ()=>this.handleEdit.bind(this)(row));
            const delBtn = (0, _buttonDefault.default)("act-btn", (0, _imageDefault.default)("delete"), this.id + "DelBtn" + row.elementId, ()=>this.handleDelete.bind(this)(row));
            const selBtn = (0, _buttonDefault.default)("act-btn", (0, _imageDefault.default)("select"), this.id + "SelBtn" + row.elementId, ()=>this.handleSelect.bind(this)(row));
            actionButtons = (0, _divDefault.default)("actions-wrapper", selBtn + editBtn + delBtn);
        }
        return (0, _divDefault.default)("table__row", fields.join("") + actionButtons);
    }
    render() {
        if (this.state.showEdit) {
            const handleSave = this.handleSaveOne.bind(this);
            const scrollContent = this.buildRComponent({
                id: this.props.idEditComponent,
                handleSave,
                handleClose: this.handleClose.bind(this),
                data: this.state.data,
                element: this.state.editing
            }, this.props.buildEditComponent);
            const content = (0, _divDefault.default)("div--scrollable", scrollContent, this.id + "content");
            return (0, _divDefault.default)("table__wrapper", content, this.id);
        } else {
            const rows = this.state.data.slice(this.state.start, this.state.end).map(this.rowToHtml.bind(this));
            const content = (0, _divDefault.default)("table__wrapper", rows.join(""), this.id + "content");
            const label = (0, _divDefault.default)("table__header-label", new Date().toISOString().substring(0, 10));
            const count = (0, _divDefault.default)("table__header-label", this.state.data.length + ": " + (this.state.start + 1) + "-" + (this.state.end > this.state.data.length ? this.state.data.length : this.state.end));
            const backwards = (0, _buttonDefault.default)("table__header-add", "<span>&lt;</span>", this.id + "Backwards", this.handleBack.bind(this), this.state.start === 0);
            const forwards = (0, _buttonDefault.default)("table__header-add", "<span>&gt;</span>", this.id + "Forwards", this.handleForw.bind(this), this.state.start + 16 >= this.state.data.length);
            const section = this.state.data && typeof this.props.header === "function" ? this.buildRComponent({
                id: this.id + "Header",
                data: this.state.data
            }, this.props.header) : "";
            let button = "";
            if (typeof this.props.buildEditComponent === "function") button = (0, _buttonDefault.default)("table__header-add", "<span>+</span>", this.id + "AddNew" + this.props.entity, ()=>this.handleEdit.bind(this)());
            const header = (0, _divDefault.default)("table__header", label + count + backwards + forwards + button);
            return (0, _divDefault.default)("div--scrollable", section + header + content, this.id);
        }
    }
}
exports.default = GenericTable;

},{"../framework/RComponent":"iu3rT","../servers/entity":"kW8fe","../html/div":"ie98x","../html/button":"jjZkH","../html/image":"d0VA3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aAgzo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _textField = require("../components/textField");
var _textFieldDefault = parcelHelpers.interopDefault(_textField);
var _entity = require("../servers/entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
var _toast = require("../components/toast");
var _toastDefault = parcelHelpers.interopDefault(_toast);
var _div = require("../html/div");
var _divDefault = parcelHelpers.interopDefault(_div);
var _button = require("../html/button");
var _buttonDefault = parcelHelpers.interopDefault(_button);
var _image = require("../html/image");
var _imageDefault = parcelHelpers.interopDefault(_image);
class LiabilityForm extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        this.state = {
            dueDate: props.element.dueIn,
            liability: props.element.liability,
            amount: props.element.amount,
            payed: props.element.payed,
            debtor: props.element.source,
            validationState: {
                debtor: {
                    validDef: {
                        required: true,
                        restricted: false
                    }
                }
            }
        };
    }
    handleDueChange(e) {
        this.setState({
            dueDate: e.value
        });
    }
    handleDebtorChange(e) {
        this.setState({
            debtor: e.value
        });
    }
    handleAmountChange(e) {
        this.setState({
            amount: Number.parseFloat(e.value)
        });
    }
    handlePayedChange(e) {
        this.setState({
            payed: e.value
        });
    }
    handleDirectionChange(e) {
        this.setState({
            liability: e.value !== "income"
        });
    }
    async handleSave() {
        const obj = Object.assign({}, this.props.element);
        obj.dueIn = this.state.dueDate;
        obj.liability = this.state.liability;
        obj.amount = Number.parseFloat(this.state.amount);
        obj.payed = this.state.payed;
        obj.source = this.state.debtor;
        try {
            this.saveLiability(obj);
        } catch (ex) {
            this.log("error", ex.message, ex.stackTrace);
        }
    }
    log(type, header, text) {
        this.buildRComponent({
            type,
            header,
            text,
            id: this.id + "Toast"
        }, (p)=>new (0, _toastDefault.default)(p));
    }
    async saveLiability(updatedLiability) {
        if (updatedLiability && updatedLiability.cashflowId && updatedLiability._id && updatedLiability.elementId) {
            const lApi = new (0, _entityDefault.default)("liability");
            this.log("info", "saving liability", `CF id: ${updatedLiability.cashflowId.toString()}`);
            await lApi.save(updatedLiability);
            this.log("info", "Liability object updated", `CF id: ${updatedLiability.cashflowId.toString()}`);
        }
    }
    render() {
        const buildTb = (props)=>this.buildRComponent(props, (p)=>new (0, _textFieldDefault.default)(p));
        const buildProps = (label)=>{
            return {
                id: this.id + label,
                label,
                value: this.state[label.toLowerCase()],
                validDef: this.state.validationState[label.toLowerCase()].validDef,
                update: this[`handle${label}Change`].bind(this)
            };
        };
        const amountProps = {
            id: this.id + "Amount",
            expenseChecked: this.state.liability ? "checked" : "",
            incomeChecked: this.state.liability ? "" : "checked",
            value: this.state.amount,
            label: "Amount"
        };
        const amount = this.fill("amountLiability", amountProps);
        const debtor = buildTb(buildProps("Debtor"));
        let save = (0, _buttonDefault.default)("form-button", (0, _imageDefault.default)("save"), this.id + "Save", this.handleSave.bind(this));
        const content = `
    <h2>Update Liability</h2><br />${(0, _divDefault.default)("buttons", [
            save
        ].join(""), this.id + "ActionButtons")}<br />
    ${debtor}<br />${amount}<br />
    `;
        //this.registerHandler(this.id + 'Currency', this.handleCurrencyUpdate.bind(this));
        this.registerHandler(this.id + "Amount", this.handleAmountChange.bind(this));
        this.registerHandler(this.id + "AmountDir", this.handleDirectionChange.bind(this));
        return (0, _divDefault.default)("liability", content, this.id);
    }
}
exports.default = LiabilityForm;

},{"../framework/RComponent":"iu3rT","../components/textField":"hj91c","../servers/entity":"kW8fe","../components/toast":"clg1H","../html/div":"ie98x","../html/button":"jjZkH","../html/image":"d0VA3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bi7Wn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _rcomponent = require("../framework/RComponent");
var _entity = require("../servers/entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
class LiabilityReport extends (0, _rcomponent.RComponent) {
    constructor(props){
        super(props);
        this.state = {
            cashflows: []
        };
    }
    componentDidMount() {
        const cfApi = new (0, _entityDefault.default)("cashflow");
        const self = this;
        const filter = {
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        };
        cfApi.get(filter).then((data)=>{
            const result = data.filter((cf)=>self.props.data.find((l)=>l.cashflowId === cf.elementId));
            self.setState({
                cashflows: result
            });
        });
    }
    getCf(liability) {
        return this.state.cashflows.find((cf)=>cf.elementId === liability.cashflowId);
    }
    render() {
        // a = array of debtors. b = liability object.
        const self = this;
        const report = this.props.data.reduce((a, b)=>{
            let row = a.find((obj)=>obj.debtor === b.source && obj.currency === self.getCf(b)?.currency);
            if (!row) a.push({
                debtor: b.source,
                credit: b.liability ? 0 : b.amount,
                debit: b.liability ? b.amount : 0,
                currency: self.getCf(b)?.currency
            });
            else if (b.liability) row.debit += b.amount;
            else row.credit += b.amount;
            return a;
        }, []);
        report.forEach((row)=>{
            row.debit = Math.round(100 * row.debit) / 100;
            row.credit = Math.round(100 * row.credit) / 100;
        });
        const fields = {
            id: this.id,
            className: "liabilityReport",
            content: report.map((k)=>this.fill("liabRepRow", k))
        };
        return this.fill("liabilityReport", fields);
    }
}
exports.default = LiabilityReport;

},{"../framework/RComponent":"iu3rT","../servers/entity":"kW8fe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4kl7s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>StackTrace);
function StackTrace(id, content) {
    return `
  <div id="${id}" class="btn-trace">
    <input id="cb${id}" class="m-modal__toggle" type="checkbox">
    <div class="m-modal__backdrop"></div>
    <div class="m-modal__content">${content}</div>
    <img class="img-swap" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAD50lEQVR4nO2bSWxOURSAv6JolAjCQv8UIaaGijE0kWClJCQ2FhZWIiwkWLBpYiEiQQ1dGCJiilBdGTaIKCJYGRZmgkQXpuqiE7/FOS/v+Yfnvf/NzfuSm75zev57z33v5dx7zv1/SElJScknAzQD7dpagMmRehQiGeArkM1pX4GqCP0KjWZkwleRCVcB11R30WJ3D2jN+WwUugrgNXAmfyql0Y5M1vq0M6r7adEZbwYR68ap/I4S6OfSPteZxDOggO4GsBo4BmxQ3THL/wzukn9DotC1Aa+ABypXq9+rgAbgEi6ZTPEgOMltZyFTDXRi+ryt1I6qkID3U1sz8Z88wDDgJhIQF0bsS0oiKIvagQBoAOr0uhXYFaEvRakBGoFnQIe2Z6qr8dh3G2YQ/OKxL98ZCDQBv8lfZYzWCxxW21KoBpZpq/bor68MRCJ0FlmqDgLzgSHa5iMT71KbG5R+E2JJEzKxT8BMG7tatckCh0LwKxRqkFe7E3Pydin3LORN6AWmuxzrHPBG21lPXvtII/JED6rsJOU+orr9Lsd6aenvhSevfeQ54tA8lZ2k3AtUfupyrApggrYKT177iJFiV+bIdin3UJXbg3TMbTpcKl36d5ADWyPTM2w7XYwT21LeHWRiy1VuUfka4nQGuK66ZrVZofJth2PEupS3HXHmtMpOUu6zqtvqcAynpbxIyCC7vy7Mp2GXcmeAbmQZHOtwDKelvMi4jPNl7QDun5zdDfjhop/AmIc48wsYaWM3CkmOssAcF/07iSuRYzjUaGNzSG2uuOw7EaW8WiQWdANTCvx/KtCjNjNK6D8RpbxTFH/CRtQ+GapHITMG+I5MtN6iX6m6b8DoCPwKlU3IZN8jtYBK4IPqNnrotwyJM0Y2eNybm8HRH3iMTHgfsjRmgYd4254PAD5iBsD73twMlrnIRsdoPcBsH/o1ssHxQLkP/QXKHsyntTsKB6Iuiw8Gbun1EtxlfsWoA6bp9QPgiQ99JoZyZI9hvFVv//eBQqfDSaYHyR6NswWnqXRKkrFG+gtITBkR5IBx+W4QSIWpF1insrG3eIQclXtiKLAWidRW4vLdIDArTXtVHotZFl+PA+x2XZuB89rCKp66JfeGfAYWA1vwoQYwEUlMssBOi74VKXISA90iJJ+oJyCWIpuTo0ENkASGE/2OMSVM7mFG3Nxlp89RKLr/sVz3uW+GppTASKSCkyR8OyQ1lsETvrkWPL4dkhbbCMUpFyik8+2QdId+qIV/g2WccoFCOt8OSSuBNcQ7GXJ7A/IOSe0qQh0UTiji8juBYjqnv3fosyTikDRoEnFImpKSEj1/AXMIxHDg9hd1AAAAAElFTkSuQmCC"/>
  </div>`;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gEwwu","1SICI"], "1SICI", "parcelRequirece5e")

//# sourceMappingURL=index.18dbc454.js.map
