import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './scss/custom.scss';
import './scss/style.scss';
import'./css/custom.css';
import'./css/style.css';
import'jquery/dist/jquery.min';
import'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
    $('.add-to-cart-btn').click(function(){
        alert("اضف الي عربة الشراء");
    });
    $('#copyright').text("  جميع الحقوق محفوظة للمتجر سنة  " + new Date().getFullYear());

    //     $('.product-option input[type="raido"]').on( "change",function() {
    //     $(this).parents('.product-option').siblings().removeClass('active');
    //     $(this).parents('.product-option').addClass('active');
    // });
    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active'); //product-option قمنا بإضافة نقطة قبل كلمة 
      });
      //عندما تتغير كمية المنتج
$('[data-product-quantity]').change(function () {

    //اجلب الكمية الجديدة
    var newQuantity= $(this).val();

    //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
    var parent = $(this).parents('[data-product-info]');

    //اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = parent.attr('data-product-price');

    //السعر الإجمالي للمنتج هو سعر القطعة مضروبا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذاالسطر
    parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

    $('[data-remove-form-cart]').click(function() {
        $(this).parents('[data-product-info]').remove();
        calculateTotelPrice();
    });
    
    calculateTotelPrice();
});
$('[data-remove-form-cart]').click(function() {
    $(this).parents('[data-product-info]').remove();
    calculateTotelPrice();
});

        function calculateTotelPrice() {
        var totalPriceForAllProducts = 0;
        $('[data-product-info]').each(function() {
        var pricePerUnit = $(this).attr('data-product-price');
        var quantity = $(this).find('[data-product-quantity]').val();
        var totalPriceForProduct = pricePerUnit * quantity;
        totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    });
};


var citiesByCountry = {
    sa: ['الرياض','جدة'],
    eg: ['القاهرة','الإسكندرية'],
    jo: ['عمان','الزرقاء'],
    sy: ['دمشق','حلب','حماه']
};
$('#form-checkout select[name="country"]').change(function() {
  var country = $(this).val();
  var cities = citiesByCountry[country];
  $('#form-checkout select[name="city"]').empty();
  $('#form-checkout select[name="city"]').append(
      '<option disabled selected value="">اختر المدينة</option>'
  );
  cities.forEach(function(city) {
    var newOption = $('<option></option>');
    newOption.text(city);
    newOption.val(city);
    $('#form-checkout select[name="city"]').append(newOption);
  });
});


$('#form-checkout input[name="payment_method"]').change(function() {
    var paymentMethod = $(this).val();
    if (paymentMethod === 'on_delivery') { 
        $('#credit-card-info input').prop('disabled' , true);
    } else {
       $('#credit-card-info input').prop('disabled' , false);
    }
    $('#credit-card-info').toggle();
  });

  
    $( "#price-range" ).slider({
      range: true,
      min: 50,
      max: 1000,
      step:50,
      values: [ 250, 800 ],
      slide: function(event, ui) {
          $('#price-min').text(ui.values[0]);
          $('#price-max').text(ui.values[1]);

      }
  });
});



