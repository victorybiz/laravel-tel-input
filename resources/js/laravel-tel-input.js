/**
   * International Telephone Input
   */
 if (typeof window.intlTelInput !== 'function') {
  throw new TypeError(
    'Laravel-Tel-Input: requires International Telephone Input (https://github.com/jackocnr/intl-tel-input). Please install with NPM or include the CDN.'
  );
}
if (!window.LaravelTelInput) {
window.LaravelTelInput = function () {

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
    // allow each input to have its own initialCountry and geoIpLookup
    window.intlTelInputGlobals.autoCountry = null;
    window.intlTelInputGlobals.startedLoadingAutoCountry = false;

    // tel input country cookie
    const IntlTelInputSelectedCountryCookie = `IntlTelInputSelectedCountry_${telInput.dataset.phoneInputId}`;

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
    

    // init the tel input
    const itiPhone = window.intlTelInput(telInput, options);
    const telInputEventFunc = function () {
      let countryData = itiPhone.getSelectedCountryData();  
      if (countryData.iso2) {
        setCookie(IntlTelInputSelectedCountryCookie, countryData.iso2?.toUpperCase());
      }
      // phone country input data
      if (this.dataset.phoneCountryInput && countryData.iso2) {
        const phoneCountryInput = document.querySelector(this.dataset.phoneCountryInput);
        let oldValue = phoneCountryInput.value?.trim();
        phoneCountryInput.value = countryData.iso2?.toUpperCase();
        if (phoneCountryInput.value !== oldValue || phoneCountryInput.value != '') {
          phoneCountryInput.dispatchEvent(new KeyboardEvent('change'));
        }
      }
      // phone input data
      if (this.dataset.phoneInput) {
        const phoneInput = document.querySelector(this.dataset.phoneInput);      
        let oldValue = phoneInput.value?.trim();
        if (oldValue != '' && oldValue.charAt(0) != '+') {
          oldValue = `+${oldValue}`;
          phoneInput.value = oldValue;
        }
        if (itiPhone.getNumber()?.trim() != '') {
          phoneInput.value = itiPhone.getNumber();
        } else {
          if (oldValue != '') {
            itiPhone.setNumber(oldValue);        
            phoneInput.value = itiPhone.getNumber();
          }        
        }
        if (phoneInput.value !== oldValue && phoneInput.value != '') {
          phoneInput.dispatchEvent(new KeyboardEvent('change'));
        }      
      }    
      // phone dial code input data
      if (this.dataset.phoneDialCodeInput && countryData.dialCode) {
        const phoneDialCodeInput = document.querySelector(this.dataset.phoneDialCodeInput);
        let oldValue = phoneDialCodeInput.value;
        phoneDialCodeInput.value = countryData.dialCode;
        if (phoneDialCodeInput.value !== oldValue || phoneDialCodeInput.value != '') {
          phoneDialCodeInput.dispatchEvent(new KeyboardEvent('change'));
        }
      }
    }
    telInput.addEventListener('change', telInputEventFunc);
    telInput.addEventListener('countrychange', telInputEventFunc);
    // sync phone number with tel input
    if (telInput.dataset.phoneInput) {
      const phoneInput = document.querySelector(telInput.dataset.phoneInput);
      if (phoneInput) {
        let oldValue = phoneInput.value?.trim();
        if (oldValue != '' && oldValue.charAt(0) != '+') {
          oldValue = `+${oldValue}`;
        }
        phoneInput.addEventListener('change', function () {
          let newValue = this.value?.trim();
          if (newValue != oldValue) {
            itiPhone.setNumber(newValue);
          }
        });
      }
    }
    // sync phone country with tel input
    if (telInput.dataset.phoneCountryInput) {
      const phoneCountryInput = document.querySelector(telInput.dataset.phoneCountryInput);
      if (phoneCountryInput) {
        phoneCountryInput.addEventListener('change', function () {
          itiPhone.setCountry(this.value?.trim());
        });
      }
    }
  }

  // init all tel inputs
  const telInputconfig = laravelTelInputConfig; // laravelTelInputConfig will be defined in blade
  const telInputs = document.querySelectorAll(".phone-input");
  for (let i = 0; i < telInputs.length; i++) {
    initTelInput(telInputs[i], telInputconfig);
  } 
}
}
window.LaravelTelInput();