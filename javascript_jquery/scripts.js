// A simple scroll function.
(function ($) {
  Drupal.behaviors.backToTop = {
    attach: function (context) {

      $('#back-to-top').once().click(function(){
        $('html, body').animate({ scrollTop: 0 }, 'fast');
      });

    }
  }
})(jQuery, Drupal);

// Using bootstrap affix.
Drupal.behaviors.stickyOffset = {
  attach: function (context) {

    var offsetTop = 90;

    $('#header-wrapper').affix({
      offset: {
        top: $('.navbar-header').outerHeight(),
      }
    });
    var sidebar = $('.fixed-sidebar', context);
    if (sidebar.length !== 0) {
      if (sidebar.outerHeight() + offsetTop > $(window).height()) {
        sidebar.addClass('affix-overflow');
        sidebar.affix({
          offset: {
            top: (sidebar.offset().top + sidebar.outerHeight()) - $(window).height(),
            bottom: $('#block-panels-mini-footer').outerHeight(true),
          }
        });
      }
      else {
        sidebar.affix({
          offset: {
            top: sidebar.offset().top - offsetTop,
            bottom: $('#block-panels-mini-footer').outerHeight(true),
          }
        });
      }
    }
  }
}

/**
 * Enable float label behavior for all inputs.
 */
Drupal.behaviors.floatLabels = {
  attach: function (context) {
    var input = $('input.form-text', context).not('.no-float');
    var multiselect = $('select[multiple="multiple"]', context).not('.no-float');

    // Chosen is disabled on selects for certain devices.
    multiselect.each(function(){
      if (!chosenIsEnabled($(this))) {
        $(this).parents('.form-group').removeClass('multiselect-float-label');
      }
    });

    //float labels for any inputs that have a default value
    input.add(multiselect).each(function(){
      if ($(this).val()) {
        $(this).parents('.form-group').addClass('float-label');
      }
    });

    multiselect.on('change', function(evt, params) {
      if ($(this).val()) {
        $(this).parents('.form-group').addClass('float-label');
      }
      else {
        $(this).parents('.form-group').removeClass('float-label');
      }
    });

    //float labels for any inputs that are focused or have a value on focusout
    input.focusin(function(){
      $(this).parents('.form-group').addClass('float-label');
    });
    input.focusout(function(){
      if (!$(this).val()) {
        $(this).parents('.form-group').removeClass('float-label');
      }

      input.each(function(index){
        if ($(this).val()) {
          $(this).parents('.form-group').addClass('float-label');
        }
      });
    });
  }
}