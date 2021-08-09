# Laravel Telephone Input

Laravel Telephone Input component for Blade and Livewire based on the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin.  

[![Latest Version on Packagist](https://img.shields.io/packagist/v/victorybiz/laravel-tel-input.svg?style=flat-square)](https://packagist.org/packages/victorybiz/laravel-tel-input)
[![Total Downloads](https://img.shields.io/packagist/dt/victorybiz/laravel-tel-input.svg?style=flat-square)](https://packagist.org/packages/victorybiz/laravel-tel-input)
![GitHub Actions](https://github.com/victorybiz/laravel-tel-input/actions/workflows/main.yml/badge.svg)

### DEMO PREVIEW
1. Simple Usage Demo
![preview](https://github.com/victorybiz/laravel-tel-input/raw/main/demo.gif) 
<br>
2. Country Sync Demo
![preview](https://github.com/victorybiz/laravel-tel-input/raw/main/demo2.gif) 

## Table of Contents


<br>

<a name="installation"></a>

## Installation

You can install the package via composer:

```bash
composer require victorybiz/laravel-tel-input
```

## Directives
Place the `@laravelTelInputStyles` in the `<head>` section of your template before any of your other styles. Place the `@laravelTelInputScripts` directive in your template right before your closing `</body`> tag and after scripts from libraries like Livewire.
```html
<html>
  <head>
    <!-- ... -->
    @laravelTelInputStyles
    <!-- ... -->
  </head>
<body>
    <!-- content -->

    @laravelTelInputScripts
</body>
</html>
```

## Requirements
This package use the following packages.
* International Telephone Input (https://github.com/jackocnr/intl-tel-input) 
* Laravel Livewire (https://laravel-livewire.com/) is required when using Livewire `wire:model`

Please make sure you install and include these dependencies before using this component. 

<a name="javaScript-dependencies"></a>

### Core Dependencies
This package uses [intl-tel-input](https://github.com/jackocnr/intl-tel-input) under the hood. For the dependency, we recommend you install them through npm or yarn, and then require them in your project's JavaScript. To install each of the dependencies this package makes use of, run this command in the terminal:
```bash
npm install intl-tel-input
```
Or Yarn:
```bash
yarn add intl-tel-input
```
Import JS
```javascript
import intlTelInput from 'intl-tel-input';

window.intlTelInput = intlTelInput;
```
Import CSS:
```css
@import 'intl-tel-input/build/css/intlTelInput.css';
```


If you’re using the compiled JavaScript, don’t forget to include the download or CDN versions of the dependencies before it. Please refer to the [intl-tel-input readme](https://github.com/jackocnr/intl-tel-input) for additional installation steps.


Place the @fcStyles in the <head> before any of your other styles. Place the @fcScripts directive right before your closing </body> tag and after scripts from libraries like Livewire.

## Configuration
To customize the component, you should publish the configuration file using the vendor:publish Artisan command. The configuration file will be placed in your application's config directory:

```bash
# Publish the config file
php artisan vendor:publish --tag=laravel-tel-input:config
```
Please refer to the [intl-tel-input readme](https://github.com/jackocnr/intl-tel-input) for plugin options.

<a name="requirements"></a>

<a name="usage"></a>

## Usage

##### Basic usage
```html
<x-tel-input
  id="phone"
  name="phone"
  class="form-input"
/>                
```
##### Add hidden phone-country-input
```html
<x-tel-input
  id="phone"
  name="phone"
  class="form-input"
  phone-country-input="#phone_country"
/>
<input type="hidden" id="phone_country" name="phone_country">
```
##### Usage with Livewire
```html
<x-tel-input
  wire:model="phone"
  id="phone"
  name="phone"
  class="form-input"
/> 
<input wire:model="phone_country" type="hidden" id="phone_country" name="phone_country">
```
##### Sync tel-input wih a country dropdown
```html
<div class="form-item">
  <label>Phone number</label>
  <x-tel-input
    id="phone"
    name="phone"
    class="form-input"
    phone-country-input="#address_country"
  />
</div>
<div class="form-item">
  <label>Address</label>
  <input type="text" placeholder="House name/number"><br>
  <input type="text" placeholder="City"><br>
  <input type="text" placeholder="State"><br>
  <input type="text" placeholder="Zip code"><br>
  <select id="address_country" name="address_country">
    <option value="CN">China</option>
    <option value="IN">India</option>
    <option value="NG">Nigeria</option>
    <option value="GB">United Kingdom</option>
    <option value="US">United States</option>
  </select>
</div>
```

<a name="props"></a>

## Props / Attributes

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| **id** | `String` | | Yes | Used to identify the component in events. |
| **name** | `String` | `phone` | Yes | Specifies a name for component. |
| **phone-country-input** | `String` | | No | Used to model or sync the selected phone country to another `<input>` or `<select>` input. |
| **value** | `String\|\|Integer` | `null` | No | Presets the input value. Equivalent to the `value` attribute on `<input>`. |
| **placeholder** | `String` | `'Phone number'` | No | Equivalent to the `placeholder` attribute on `<input>`. | 
| **class** | `String` |  | No | Equivalent to the `class` attribute on `<input>` input. | 
| **required** | `Boolean` | `false` | No | Equivalent to the `required` attribute on `<input>` input. | 
| **disabled** | `Boolean` | `false` | No | Equivalent to the `disabled` attribute on `<input>` input. | 



### Testing

```bash
composer test
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email lavictorybiz@gmail.com instead of using the issue tracker.

## Credits

-   [Victory Osayi Airuoyuwa](https://github.com/victorybiz)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Laravel Package Boilerplate

This package was generated using the [Laravel Package Boilerplate](https://laravelpackageboilerplate.com).
