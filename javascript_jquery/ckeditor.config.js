// Adds some configuration options for images and slideshow.
CKEDITOR.on( 'dialogDefinition', function( ev ) {

  var dialogName = ev.data.name;
  var dialogDefinition = ev.data.definition;

  if ( dialogName == 'atomProperties' ) {
    var info = dialogDefinition.getContents( 'info' );

    var dialog = dialogDefinition.dialog;

    //Remove the caption checkbox.
    info.remove('chkCaption');

    // Add a checkbox to hide the caption by adding hide-caption class.
    info.add({
      id: 'chkHideCaption',
      type: 'checkbox',
      label: 'Hide Caption',
      default: 0,
      setup: function(widget) {

        var options = JSON.parse(widget.data.options);
        // Set the initial value when dialog opens.
        if (options.hideCaption) {
          this.setValue(options.hideCaption);
        }

      },
      commit: function(widget) {
        var options = JSON.parse(widget.data.options);
        options.hideCaption = this.getValue();

        var textInput = dialog.getContentElement('advanced', 'txtClasses');
        var currentVal = textInput.getValue();

        // Add or remove class based on checkbox value.
        if (options.hideCaption == true) {
          currentVal = currentVal.replace('hide-caption', '');
          currentVal = currentVal.trim();
          textInput.setValue(currentVal + ' hide-caption');
        }
        else {
          currentVal = currentVal.replace('hide-caption', '');
          currentVal = currentVal.trim();
          textInput.setValue(currentVal);
        }

        widget.setData('options', JSON.stringify(options));
      }
    });

    // Add a radio button for including an image in slideshow.
    info.add({
      id: 'chkSlideshow',
      type: 'radio',
      label: 'Include in slideshow',
      items: [['Do Not Include', '0'], ['Slideshow Only', '1'], ['Slideshow and Page', '2']],
      default: '0',
      setup: function(widget) {

        var options = JSON.parse(widget.data.options);

        // When opening dialog set the checkbox based on valuse of usesSlideshow in the atom options.
        if (options.usesSlideshow) {
          this.setValue(options.usesSlideshow);
        }

      },
      commit: function(widget) {

        var options = JSON.parse(widget.data.options);
        options.usesSlideshow = this.getValue();

        switch (options.usesSlideshow) {

          case "0":
            // Remove any added slideshow classes.
            // Retains any classes added manually.
            var textInput = dialog.getContentElement('advanced', 'txtClasses');
            var currentVal = textInput.getValue();
            currentVal = currentVal.replace('only', '').replace('slideshow', '');
            currentVal = currentVal.trim();

            textInput.setValue(currentVal);

            break;

          case "1":
            // Add classes of slideshow and only to additional classes input.
            // Retains any classes added manually.
            var textInput = dialog.getContentElement('advanced', 'txtClasses');
            var currentVal = textInput.getValue();
            currentVal = currentVal.replace('only', '').replace('slideshow', '');
            currentVal = currentVal.trim();

            textInput.setValue(currentVal + ' slideshow only');

            break;

          case "2":
            // Add class of slideshow to additional classes input.
            // Retains any classes added manually.
            var textInput = dialog.getContentElement('advanced', 'txtClasses');
            var currentVal = textInput.getValue();
            currentVal.replace('sh-only', '');
            currentVal = currentVal.replace('only', '').replace('slideshow', '');
            currentVal = currentVal.trim();

            textInput.setValue(currentVal + ' slideshow');

            break;

        }

        widget.setData('options', JSON.stringify(options));

      }
    });

  }
});