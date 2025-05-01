$(function() {
    // DATEPICKER
    // Contact Page's form use the datepicker
    if($.fn.datepicker){
    $("#date").datepicker({
      dateFormat: "dd.mm.yy",
      showAnim: "slideDown",
      changeMonth: true,
      changeYear: true,
      minDate: 0
    });
    } else {
        console.warn('Datepicker is not installed.')
    }
  
    // Form validation:
    // Contact Page's forms use the form validation.
    if($.fn.validate){
    $("#contact-form").validate({
      rules: {
        name:    { required: true, minlength: 2 },
        email:   { required: true, email: true },
        message: { required: true, minlength: 5 }
      },
      messages: {
        name:    "Please enter a name at least 2 characters",
        email:   "Please enter a valid email.",
        message: "Please enter a message at least 5 characters"
      },
      errorPlacement: function(error, element) {
        error.insertAfter(element);
      },
      submitHandler: function(form) {
     
        var name    = $("#name").val();
        var mail  = $("#email").val();
        var date = $("#date").val() || "—";
        var msg   = $("#message").val();
  
        var response = 
          "<h2>Thank you, " + name + "!</h2>" +
          "<p>Informations you choose: </p>" +
          "<ul>" +
            "<li><strong>E-mail:</strong> " + mail + "</li>" +
            "<li><strong>Date:</strong> " + date + "</li>" +
            "<li><strong>Message:</strong> " + msg + "</li>" +
          "</ul>";
  
        $("#response")
          .removeClass("error")
          .addClass("success")
          .html(response);
  
      }

    });
    }
    else {
        console.warn('Validation UI is not installed.')
    }
    
    // SLIDER
    // Testimonials page use slider.
    if ($.fn.slick) {
        $('.testimonials-slider').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 3000
        });
      } else {
        console.warn('Slick Carousel is not installed.');
      }

      // --- Testimonial Form Validation ---
      if ($.fn.validate && $('#testimonial-form').length) {
        $('#testimonial-form').validate({
          rules: {
            name:    { required: true, minlength: 2 },
            email:   { required: true, email: true },
            message: { required: true, minlength: 5 }
          },
          messages: {
            name:    'Please enter at least 2 characters.',
            email:   'Please enter a valid email address.',
            message: 'Please enter at least 5 characters.'
          },
          errorPlacement: function(error, element) {
            error.insertAfter(element);
          },
          submitHandler: function(form) {
            alert('Thank you for your feedback!');
            form.reset();
          }
        });
      }



        // ACCORDION 
        // Home Page
      if ($.fn.accordion) {
        $("#accordion").accordion({
          collapsible: true,     // All accordions will be closed
          active: false,         // Closed when the page loading
          heightStyle: "content" 
        });
      } else {
        console.warn("jQuery UI Accordion Error");
      }

      // TABS: 
      // About Page
      if ( $.fn.tabs ) {
        $("#tabs").tabs();
      } else {
        console.error("jQuery UI Tabs plugin not found!");
      }



      // Price Slider
      // Projects Page
      // Inital price 1200$
      var basePrice = 1200; 

      $("#room-slider").slider({
        value: 1,    // Default room amount
        min: 1,
        max: 10,     
        step: 1,     
        slide: function(event, ui) {
          $("#room-count").text(ui.value);
          $("#project-cost").text(ui.value * basePrice);
        }
      });
    
      // Initial values
      var initial = $("#room-slider").slider("value");
      $("#room-count").text(initial);
      $("#project-cost").text(initial * basePrice);
      
});
  