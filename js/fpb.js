/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	import Sortable from "sortablejs";
	var tinymce = window.tinymce; //BAD
	
	function ready(fn) {
	  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}
	
	// forEach method, could be shipped as part of an Object Literal/Module
	var forEach = function (array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, i, array[i]); // passes back stuff we need
	  }
	};
	
	class FrontendPageBuilder {
	    constructor() {
	    }
	    init() {
	        tinymce.init({
	            selector: '[data-sfb-valuetype="string"]',
	            inline: true,
	            toolbar: 'undo redo',
	            menubar: false
	        });
	
	        tinymce.init({
	            selector: '[data-sfb-valuetype="rich"]',
	            inline: true,
	            // toolbar: 'undo redo',
	            menubar: false
	        });
	
	        function serializeContent() {
	            var areas = document.querySelectorAll("[data-sfb-content]");
	            forEach(areas, function(i, area){
	                var data = [];
	                var sections = area.querySelectorAll("[data-sfb-section]");
	                forEach(sections, function(i, section){
	                    var sectiondata = {};
	                    var fields = section.querySelectorAll("[data-sfb-value]");
	                    forEach(fields, function(i, field) {
	                        var name = field.getAttribute("data-sfb-value");
	                        var type = field.getAttribute("data-sfb-valuetype");
	                        var value = field.innerHTML;
	                        sectiondata[name] = value;
	                    });
	                    data.push(sectiondata);
	                });
	                console.log(JSON.stringify(data));
	            });
	        }
	
	        var buttonrow = '<ul class="sfb-tools"><li class="sfb-tools_handle"></li><li class="sfb-tools_edit"></li><li class="sfb-tools_trash"></li><li class="sfb-tools_show"></li></ul><div class="sfb-overlay"><span></span><span></span><span></span><span></span></div>'
	
	        ready(function() {
	
	            var areas = document.querySelectorAll("[data-sfb-content]");
	            forEach(areas, function(i, area){
	                Sortable.create(area, {
	                    animation: 150,
	                    // draggable: "[data-sfb-section]",
	                    handle: ".sfb-tools_handle"
	                });
	                var sections = area.querySelectorAll("[data-sfb-section]");
	                forEach(sections, function(i, section){
	                    section.insertAdjacentHTML('afterbegin', buttonrow);
	                    // section.classList.add("sfb-draggable");
	                });
	            });
	
	            document.getElementById("sfb-save").addEventListener("click", function(e) {
	                serializeContent();
	            });
	        });
	    }
	}
	
	export default FrontendPageBuilder;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=fpb.js.map