<?php
/*
 * Laravel International Telephone Input configurations
 *  
 * For more details about the configuration, see:
 * https://github.com/jackocnr/intl-tel-input
 */
return [
    'component-name' => 'tel-input',

    'options' => [
        'allowDropdown' => true,

        'autoHideDialCode' => true,
        
        /**
         * autoPlaceholder
         *    1. 'polite' - core plugin default
         *    2. 'aggressive'
         */
        'autoPlaceholder' => 'aggressive',

        'customContainer' => '',
        
        /**
         * customPlaceholder
         *    1. null - core plugin default
         *    2. 'ACustomFunctionName' - Create your javascript function with the specified custom name and bind to window as window.ACustomFunctionName.
         * 
         * see: https://github.com/jackocnr/intl-tel-input#initialisation-options
         */
        'customPlaceholder' => null, 

        'dropdownContainer' => null,

        'excludeCountries' => [],

        'formatOnDisplay' => true,
        
        /**
         * geoIpLookup
         *    1. null - core plugin default
         *    2. 'ipinfo' - Predefined lookups for IP addresses implementation using free service from https://ipinfo.io.
         *                - The lookup result for each tel input is stored in a cookie to avoid repeat lookups.
         *    3. 'ACustomFunctionName' - Create your javascript function with the specified custom name and bind to window as window.ACustomFunctionName.
         * 
         * see: https://github.com/jackocnr/intl-tel-input#initialisation-options
         */
        'geoIpLookup' => 'ipinfo',

        'initialCountry' => 'auto',

        'localizedCountries' => [],

        'nationalMode' => true,

        'onlyCountries' => [],

        'placeholderNumberType' => 'MOBILE',

        'preferredCountries' => ['CN', 'NG', 'US', 'GB'],

        'separateDialCode' => false,

        /**
         * utilsScript
         * - path to the utils.js file in public/ directory.
         */
        'utilsScript' => '/vendor/intl-tel-input/build/js/utils.js', 
    ]
];