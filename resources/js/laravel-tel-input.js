// LaravelTelInput
(function () {

  'use strict';
  
  function setCookie(cookieName, cookieValue, expiryDays = null, path = null, domain = null) {
    let cookieString = `${cookieName}=${cookieValue};`
    if (expiryDays) {
      const d = new Date();
      d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
      cookieString += `expires=${d.toUTCString()};`
    }
    if (path) {
      cookieString += `path=${path};`
    }
    if (domain) {
      cookieString += `domain=${domain};`
    }
    document.cookie = cookieString;
  }
  
  function getCookie(cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function removeCookie(cookieName, path = null, domain = null) {
    let cookieString = `${cookieName}=;`
    const d = new Date();
    d.setTime(d.getTime() - (30 * 24 * 60 * 60 * 1000));
    cookieString += `expires=${d.toUTCString()};`
    if (path) {
      cookieString += `path=${path};`
    }
    if (domain) {
      cookieString += `domain=${domain};`
    }
    document.cookie = cookieString;
  }

  // init a tell input
  function initTelInput(telInput, options = {})
  {
    // tel input country cookie
    const IntlTelInputSelectedCountryCookie = `IntlTelInputSelectedCountry_${telInput.dataset.phoneInputId}`;

    // allow each input to have its own initialCountry and geoIpLookup
    window.intlTelInputGlobals.autoCountry = getCookie(IntlTelInputSelectedCountryCookie) || window.intlTelInputGlobals.autoCountry;
    // window.intlTelInputGlobals.startedLoadingAutoCountry = false;

    // fix autofill bugs on page refresh in Firefox
    let form = telInput.closest('form');
    if (form) {
      form.setAttribute('autocomplete', 'off');
    }

    // geoIpLookup option
    if (options.geoIpLookup == null) {
      // unset it if null
      delete options.geoIpLookup; 
    } else if (options.geoIpLookup === 'ipinfo') {
      options.geoIpLookup = function(success, failure) {
        let country = getCookie(IntlTelInputSelectedCountryCookie);
        if (country) {
          success(country);
        } else {
          fetch('https://ipinfo.io/json')
          .then( res => res.json() )
          .then( data => data)
          .then( (data) => {
            let country = data.country?.toUpperCase();
            success(country);
            setCookie(IntlTelInputSelectedCountryCookie, country);
          })
          .catch( error => success('US') );
        }
      }
    } else if (typeof window[options.geoIpLookup] === 'function') {
      // user custom function
      options.geoIpLookup = window[options.geoIpLookup];      
    } else {
      if (typeof options.geoIpLookup !== 'function') {
        throw new TypeError(
          `Laravel-Tel-Input: Undefined function '${options.geoIpLookup}' specified in tel-input.options.geoIpLookup.`
        );
      }
      delete options.geoIpLookup; // unset if undefined function
    }

    // customPlaceholder option
    if (options.customPlaceholder == null) {
      // unset if its null
      delete options.customPlaceholder; 
    } else if (typeof window[options.customPlaceholder] === 'function') {
      // user custom function
      options.customPlaceholder = window[options.customPlaceholder];      
    } else {
      if (typeof options.customPlaceholder !== 'function') {
        throw new TypeError(
          `Laravel-Tel-Input: Undefined function '${options.customPlaceholder}' specified in tel-input.options.customPlaceholder.`
        );
      }
      delete options.customPlaceholder; // unset if undefined function
    }

    // utilsScript option
    if (options.utilsScript) {
      // Fix utilsScript relative path bug
      options.utilsScript = options.utilsScript.charAt(0) == '/' ? options.utilsScript : '/' + options.utilsScript;
    }

    // init the tel input
    const itiPhone = window.intlTelInput(telInput, options);
   

    // countrychange event function
    const countryChangeEventFunc = function () { 
      
      let countryData = itiPhone.getSelectedCountryData();  
      if (countryData.iso2) {
          setCookie(IntlTelInputSelectedCountryCookie, countryData.iso2?.toUpperCase());
              
        // phone country input data
        if (this.dataset.phoneCountryInput && countryData.iso2) {
          const phoneCountryInput = document.querySelector(this.dataset.phoneCountryInput);
          if (phoneCountryInput) {
            let oldValue = phoneCountryInput.value?.trim();
            phoneCountryInput.value = countryData.iso2?.toUpperCase();
            if (phoneCountryInput.value !== oldValue || phoneCountryInput.value != '') {
              phoneCountryInput.dispatchEvent(new KeyboardEvent('change'));
            }
          }
        }
        // phone dial code input data
        if (this.dataset.phoneDialCodeInput && countryData.dialCode) {
          const phoneDialCodeInput = document.querySelector(this.dataset.phoneDialCodeInput);
          if (phoneDialCodeInput) {
            let oldValue = phoneDialCodeInput.value;
            phoneDialCodeInput.value = countryData.dialCode;
            if (phoneDialCodeInput.value !== oldValue || phoneDialCodeInput.value != '') {
              phoneDialCodeInput.dispatchEvent(new KeyboardEvent('change'));
            }  
          }      
        }
        // once country change trigger change event on the telephone input
        telInput.dispatchEvent(new KeyboardEvent('change'));
      }
    }

    // countrychange event function
    const telInputChangeEventFunc = function () {
      // phone input data
      if (this.dataset.phoneInput) {
        const phoneInput = document.querySelector(this.dataset.phoneInput);    
        if (phoneInput) {  
          let oldValue = phoneInput.value?.trim();
          if (oldValue != '' && oldValue.charAt(0) != '+'  && oldValue.charAt(0) != '0' && itiPhone.isValidNumber() === null) {
            oldValue = `+${oldValue}`;
            phoneInput.value = oldValue;
          }
          if (itiPhone.getNumber()?.trim() != '') {          
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
            phoneInput.dispatchEvent(new KeyboardEvent('change'));
            phoneInput.dispatchEvent(new CustomEvent('telchange', {
              detail: {
                valid: true,
                validNumber: phoneInput.value,
                number: itiPhone.getNumber(),
                country: itiPhone.getSelectedCountryData().iso2?.toUpperCase(),
                countryName: itiPhone.getSelectedCountryData().name,
                dialCode: itiPhone.getSelectedCountryData().dialCode            
              }
            }));
          } else {
            if (itiPhone.isValidNumber() === false) {
              phoneInput.dispatchEvent(new KeyboardEvent('change'));  
              phoneInput.dispatchEvent(new CustomEvent('telchange', {
                detail: {
                  valid: false,
                  validNumber: phoneInput.value,
                  number: itiPhone.getNumber(),
                  country: itiPhone.getSelectedCountryData().iso2?.toUpperCase(),
                  countryName: itiPhone.getSelectedCountryData().name,
                  dialCode: itiPhone.getSelectedCountryData().dialCode            
                }
              }));
            }
          }
        }
      }    
    }

    // Listen the tel inputs events
    telInput.addEventListener('countrychange', countryChangeEventFunc);
    telInput.addEventListener('change', telInputChangeEventFunc);

    // listen and sync phone number with tel input if any
    if (telInput.dataset.phoneInput) {
      const phoneInput = document.querySelector(telInput.dataset.phoneInput);
      if (phoneInput) {
        let oldValue = phoneInput.value?.trim();
        if (oldValue != '' && oldValue.charAt(0) != '+' && oldValue.charAt(0) != '0') {
          oldValue = `+${oldValue}`;
        }
        phoneInput.addEventListener('change', function () {
          let newValue = this.value?.trim();
          if (newValue != oldValue && newValue != '') {
            itiPhone.setNumber(newValue);
          }
        });
      }
    }
    // listen and sync phone country with tel input if any
    if (telInput.dataset.phoneCountryInput) {
      const phoneCountryInput = document.querySelector(telInput.dataset.phoneCountryInput);
      if (phoneCountryInput) {
        phoneCountryInput.addEventListener('change', function () {
          itiPhone.setCountry(this.value?.trim());
        });
      }
    }

    // After each intlTelInput instance has been created, fix issues with pre-filled values by dispatching change event on the country dropdown
    telInput.dispatchEvent(new KeyboardEvent('countrychange'));
    // Fix issues working on page with Turbolinks enabled
    document.addEventListener("turbolinks:load", function() { 
      if (telInput) {
        telInput.dispatchEvent(new KeyboardEvent('countrychange'));
      }
    });
    // Fix issues working on page with Turbo enabled
    document.addEventListener("turbo:load", function() { 
      if (telInput) {
        telInput.dispatchEvent(new KeyboardEvent('countrychange'));
      }
    });
  }

  function renderTelInput()
  {
    if (typeof window.intlTelInput !== 'function') {
      throw new TypeError(
          'Laravel-Tel-Input: requires International Telephone Input (https://github.com/jackocnr/intl-tel-input). Please install with NPM or include the CDN.'
      );
    }
    // Call function to initialize an instance of int tel input on all elements with .iti--laravel-tel-input attribute
    const telInputconfig = laravelTelInputConfig; // laravelTelInputConfig will be defined in blade
    const telInputs = document.querySelectorAll(".iti--laravel-tel-input");
    if (telInputs.length > 0) {
      for (let i = 0; i < telInputs.length; i++) {
        initTelInput(telInputs[i], telInputconfig);
      } 
    }
  }

  // Listen to the document events and re-render the tel inputs
  document.addEventListener("DOMContentLoaded", function() {
    renderTelInput();

    // user dispatched browser events to re-render the tel inputs
    document.addEventListener("telDOMChanged", function() {
      renderTelInput();
    });

    // Livewire event hook 
    if (window.Livewire) {
      window.Livewire.hook('component.initialized', component => {
        renderTelInput();
      });
    }
  });
  // 
})();