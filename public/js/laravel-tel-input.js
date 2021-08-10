/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/laravel-tel-input.js":
/*!*******************************************!*\
  !*** ./resources/js/laravel-tel-input.js ***!
  \*******************************************/
/***/ (() => {

/**
 * International Telephone Input
 */
if (typeof window.intlTelInput !== 'function') {
  throw new TypeError('Laravel-Tel-Input: requires International Telephone Input (https://github.com/jackocnr/intl-tel-input). Please install with NPM or include the CDN.');
} // LaravelTelInput


(function () {
  'use strict';

  function setCookie(cookieName, cookieValue) {
    var expiryDays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var cookieString = "".concat(cookieName, "=").concat(cookieValue, ";");

    if (expiryDays) {
      var d = new Date();
      d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
      cookieString += "expires=".concat(d.toUTCString(), ";");
    }

    if (path) {
      cookieString += "path=".concat(path, ";");
    }

    if (domain) {
      cookieString += "domain=".concat(domain, ";");
    }

    document.cookie = cookieString;
  }

  function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  function removeCookie(cookieName) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var cookieString = "".concat(cookieName, "=;");
    var d = new Date();
    d.setTime(d.getTime() - 30 * 24 * 60 * 60 * 1000);
    cookieString += "expires=".concat(d.toUTCString(), ";");

    if (path) {
      cookieString += "path=".concat(path, ";");
    }

    if (domain) {
      cookieString += "domain=".concat(domain, ";");
    }

    document.cookie = cookieString;
  } // init a tell input


  function initTelInput(telInput) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // tel input country cookie
    var IntlTelInputSelectedCountryCookie = "IntlTelInputSelectedCountry_".concat(telInput.dataset.phoneInputId); // allow each input to have its own initialCountry and geoIpLookup

    window.intlTelInputGlobals.autoCountry = getCookie(IntlTelInputSelectedCountryCookie) || window.intlTelInputGlobals.autoCountry; // window.intlTelInputGlobals.startedLoadingAutoCountry = false;
    // fix autofill bugs on page refresh in Firefox

    var form = telInput.closest('form');

    if (form) {
      form.setAttribute('autocomplete', 'off');
    } // geoIpLookup option


    if (options.geoIpLookup == null) {
      // unset it if null
      delete options.geoIpLookup;
    } else if (options.geoIpLookup === 'ipinfo') {
      options.geoIpLookup = function (success, failure) {
        var country = getCookie(IntlTelInputSelectedCountryCookie);

        if (country) {
          success(country);
        } else {
          fetch('https://ipinfo.io/json').then(function (res) {
            return res.json();
          }).then(function (data) {
            return data;
          }).then(function (data) {
            var _data$country;

            var country = (_data$country = data.country) === null || _data$country === void 0 ? void 0 : _data$country.toUpperCase();
            success(country);
            setCookie(IntlTelInputSelectedCountryCookie, country);
          })["catch"](function (error) {
            return success('US');
          });
        }
      };
    } else if (typeof window[options.geoIpLookup] === 'function') {
      // user custom function
      options.geoIpLookup = window[options.geoIpLookup];
    } else {
      if (typeof options.geoIpLookup !== 'function') {
        throw new TypeError("Laravel-Tel-Input: Undefined function '".concat(options.geoIpLookup, "' specified in tel-input.options.geoIpLookup."));
      }

      delete options.geoIpLookup; // unset if undefined function
    } // customPlaceholder option


    if (options.customPlaceholder == null) {
      // unset if its null
      delete options.customPlaceholder;
    } else if (typeof window[options.customPlaceholder] === 'function') {
      // user custom function
      options.customPlaceholder = window[options.customPlaceholder];
    } else {
      if (typeof options.customPlaceholder !== 'function') {
        throw new TypeError("Laravel-Tel-Input: Undefined function '".concat(options.customPlaceholder, "' specified in tel-input.options.customPlaceholder."));
      }

      delete options.customPlaceholder; // unset if undefined function
    } // init the tel input


    var itiPhone = window.intlTelInput(telInput, options); // countrychange event function

    var countryChangeEventFunc = function countryChangeEventFunc() {
      var countryData = itiPhone.getSelectedCountryData();

      if (countryData.iso2) {
        var _countryData$iso;

        setCookie(IntlTelInputSelectedCountryCookie, (_countryData$iso = countryData.iso2) === null || _countryData$iso === void 0 ? void 0 : _countryData$iso.toUpperCase()); // phone country input data

        if (this.dataset.phoneCountryInput && countryData.iso2) {
          var _phoneCountryInput$va, _countryData$iso2;

          var phoneCountryInput = document.querySelector(this.dataset.phoneCountryInput);
          var oldValue = (_phoneCountryInput$va = phoneCountryInput.value) === null || _phoneCountryInput$va === void 0 ? void 0 : _phoneCountryInput$va.trim();
          phoneCountryInput.value = (_countryData$iso2 = countryData.iso2) === null || _countryData$iso2 === void 0 ? void 0 : _countryData$iso2.toUpperCase();

          if (phoneCountryInput.value !== oldValue || phoneCountryInput.value != '') {
            phoneCountryInput.dispatchEvent(new KeyboardEvent('change'));
          }
        } // phone dial code input data


        if (this.dataset.phoneDialCodeInput && countryData.dialCode) {
          var phoneDialCodeInput = document.querySelector(this.dataset.phoneDialCodeInput);
          var _oldValue = phoneDialCodeInput.value;
          phoneDialCodeInput.value = countryData.dialCode;

          if (phoneDialCodeInput.value !== _oldValue || phoneDialCodeInput.value != '') {
            phoneDialCodeInput.dispatchEvent(new KeyboardEvent('change'));
          }
        } // once country change trigger change event on the telephone input


        telInput.dispatchEvent(new KeyboardEvent('change'));
      }
    }; // countrychange event function


    var telInputChangeEventFunc = function telInputChangeEventFunc() {
      // phone input data
      if (this.dataset.phoneInput) {
        var _phoneInput$value, _itiPhone$getNumber;

        var phoneInput = document.querySelector(this.dataset.phoneInput);
        var oldValue = (_phoneInput$value = phoneInput.value) === null || _phoneInput$value === void 0 ? void 0 : _phoneInput$value.trim();

        if (oldValue != '' && oldValue.charAt(0) != '+' && oldValue.charAt(0) != '0' && itiPhone.isValidNumber() === null) {
          oldValue = "+".concat(oldValue);
          phoneInput.value = oldValue;
        }

        if (((_itiPhone$getNumber = itiPhone.getNumber()) === null || _itiPhone$getNumber === void 0 ? void 0 : _itiPhone$getNumber.trim()) != '') {
          if (itiPhone.isValidNumber()) {
            phoneInput.value = itiPhone.getNumber();
          } else {
            phoneInput.value = '';
          }
        } else {
          if (oldValue != '' && itiPhone.isValidNumber() === null) {
            itiPhone.setNumber(oldValue);
            phoneInput.value = itiPhone.getNumber();
          }
        }

        if (phoneInput.value !== oldValue && phoneInput.value != '' && (itiPhone.isValidNumber() === true || itiPhone.isValidNumber() === null)) {
          var _itiPhone$getSelected;

          phoneInput.dispatchEvent(new KeyboardEvent('change'));
          phoneInput.dispatchEvent(new CustomEvent('telchange', {
            detail: {
              valid: true,
              validNumber: phoneInput.value,
              number: itiPhone.getNumber(),
              country: (_itiPhone$getSelected = itiPhone.getSelectedCountryData().iso2) === null || _itiPhone$getSelected === void 0 ? void 0 : _itiPhone$getSelected.toUpperCase(),
              countryName: itiPhone.getSelectedCountryData().name,
              dialCode: itiPhone.getSelectedCountryData().dialCode
            }
          }));
        } else {
          if (itiPhone.isValidNumber() === false) {
            var _itiPhone$getSelected2;

            phoneInput.dispatchEvent(new KeyboardEvent('change'));
            phoneInput.dispatchEvent(new CustomEvent('telchange', {
              detail: {
                valid: false,
                validNumber: phoneInput.value,
                number: itiPhone.getNumber(),
                country: (_itiPhone$getSelected2 = itiPhone.getSelectedCountryData().iso2) === null || _itiPhone$getSelected2 === void 0 ? void 0 : _itiPhone$getSelected2.toUpperCase(),
                countryName: itiPhone.getSelectedCountryData().name,
                dialCode: itiPhone.getSelectedCountryData().dialCode
              }
            }));
          }
        }
      }
    }; // Listen the tel inputs events


    telInput.addEventListener('countrychange', countryChangeEventFunc);
    telInput.addEventListener('change', telInputChangeEventFunc); // listen and sync phone number with tel input if any

    if (telInput.dataset.phoneInput) {
      var phoneInput = document.querySelector(telInput.dataset.phoneInput);

      if (phoneInput) {
        var _phoneInput$value2;

        var oldValue = (_phoneInput$value2 = phoneInput.value) === null || _phoneInput$value2 === void 0 ? void 0 : _phoneInput$value2.trim();

        if (oldValue != '' && oldValue.charAt(0) != '+' && oldValue.charAt(0) != '0') {
          oldValue = "+".concat(oldValue);
        }

        phoneInput.addEventListener('change', function () {
          var _this$value;

          var newValue = (_this$value = this.value) === null || _this$value === void 0 ? void 0 : _this$value.trim();

          if (newValue != oldValue && newValue != '') {
            itiPhone.setNumber(newValue);
          }
        });
      }
    } // listen and sync phone country with tel input if any


    if (telInput.dataset.phoneCountryInput) {
      var phoneCountryInput = document.querySelector(telInput.dataset.phoneCountryInput);

      if (phoneCountryInput) {
        phoneCountryInput.addEventListener('change', function () {
          var _this$value2;

          itiPhone.setCountry((_this$value2 = this.value) === null || _this$value2 === void 0 ? void 0 : _this$value2.trim());
        });
      }
    } // After each intlTelInput instance has been created, fix issues with pre-filled values by dispatching change event on the country dropdown


    telInput.dispatchEvent(new KeyboardEvent('countrychange'));
  } // Call function to initialize an instance of int tel input on all elements with .iti--laravel-tel-input attribute


  var telInputconfig = laravelTelInputConfig; // laravelTelInputConfig will be defined in blade

  var telInputs = document.querySelectorAll(".iti--laravel-tel-input");

  for (var i = 0; i < telInputs.length; i++) {
    initTelInput(telInputs[i], telInputconfig);
  }
})();

/***/ }),

/***/ "./resources/css/laravel-tel-input.css":
/*!*********************************************!*\
  !*** ./resources/css/laravel-tel-input.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/laravel-tel-input": 0,
/******/ 			"public/css/laravel-tel-input": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/laravel-tel-input"], () => (__webpack_require__("./resources/js/laravel-tel-input.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/laravel-tel-input"], () => (__webpack_require__("./resources/css/laravel-tel-input.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;