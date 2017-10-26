'use strict';

window.product = (function ($) {
  var HTML_CURRENCY = '&nbsp;<span class="woocommerce-Price-currencySymbol">₽</span>';
  var container = document.querySelector('.product');
  var orderForm = container.querySelector('.product-order-form');
  var servicesInputs = orderForm.elements;
  var price = container.querySelector('.product-total__price');
  var priceDelElem = price.querySelector('del');
  var priceInsElem = price.querySelector('ins');
  var oldPrice = priceDelElem ? priceDelElem.querySelector('.amount') : 0;
  var currentPrice = priceInsElem ? priceInsElem.querySelector('.amount') : price.querySelector('.amount');
  var formatter = new Intl.NumberFormat('ru');

  var getPrice = function () {
    priceDelElem = price.querySelector('del');
    priceInsElem = price.querySelector('ins');
    oldPrice = priceDelElem ? priceDelElem.querySelector('.amount') : 0;
    currentPrice = priceInsElem ? priceInsElem.querySelector('.amount') : price.querySelector('.amount');
    var rawCurrentPriceValue = currentPrice.textContent;
    var rawOldPriceValue = oldPrice.textContent;
    var currentPriceValue = rawCurrentPriceValue.replace(/\D/g, '');
    var oldPriceValue = rawOldPriceValue.replace(/\D/g, '');

    return {
      old: parseFloat(oldPriceValue),
      current: parseFloat(currentPriceValue)
    };
  };

  var getServicePrice = function (serviceElem) {
    var $servicePrice = $(serviceElem).closest('.product-service').find('.product-service__price');
    var rawServicePriceValue = $servicePrice.text();
    var servicePriceValue = rawServicePriceValue.replace(/\D/g, '');

    return parseFloat(servicePriceValue);
  };

  Array.from(servicesInputs).forEach(function (element) {
    if (element.type === 'checkbox') {
      element.addEventListener('change', function () {
        var checkedValue = getServicePrice(element);
        var resultCurrentValue;
        var resultOldValue;

        if (element.checked) {
          resultCurrentValue = getPrice().current + checkedValue;
          resultOldValue = getPrice().old + checkedValue;
        } else {
          resultCurrentValue = getPrice().current - checkedValue;
          resultOldValue = getPrice().old - checkedValue;
        }

        if (oldPrice) {
          oldPrice.innerHTML = formatter.format(resultOldValue) + HTML_CURRENCY;
        }

        currentPrice.innerHTML = formatter.format(resultCurrentValue) + HTML_CURRENCY;
      });
    }
  });

  return {

  };
})(window.jQuery);
