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
   
      
  // Internal AJAX Call:    
  // This part will be work for user open the testimonials.html. 
  // AJAX for Testimonials (testimonials.html)
  if (window.location.pathname.endsWith('testimonials.html')) {
    const sliderContainer = $('.testimonials-slider'); //  "testimonials-slider"

    if (sliderContainer.length === 0) {
        console.error(' testimonials-slider element not found error!');
    } else {
        
        $.ajax({
            url: 'json_files/testimonials.json',
            dataType: 'json',
            success: function(data) {
                // Clear any static fallback content
                sliderContainer.empty();

                if (data && data.length > 0) {
                    data.forEach(function(item) {
                        const name = item.name || "Anonymous";
                        const role = item.role || "Client";
                        const message = item.message || "No message provided.";

                        // Same testimonials card
                        const card = $(`
                            <div class="testimonial-card">
                                <p class="testimonial-text">"${message}"</p>
                                <div class="testimonial-author">
                                    <img src="images/user.jpg" alt="User Photo">
                                    <div>
                                        <h4>${name}</h4>
                                        <p>${role}</p>
                                    </div>
                                </div>
                            </div>
                        `);
                        sliderContainer.append(card); // Append the new card to the slider
                    });

                    
                    if ($.fn.slick) {
                        if (sliderContainer.hasClass('slick-initialized')) {
                            sliderContainer.slick('unslick'); 
                        }
                        sliderContainer.slick({
                            dots: true,
                            infinite: data.length > 1, 
                            speed: 300,
                            slidesToShow: 1,
                            adaptiveHeight: true,
                            autoplay: true,
                            autoplaySpeed: 3000
                        });
                    } else {
                        console.warn('Slick Carousel plugin error!');
                        
                    }
                } else {
                    // If no data is returned from JSON or data is an empty array
                    sliderContainer.html('<p>No testimonials available at this time.</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Testimonials AJAX Error: Could not load or parse JSON data.');
                console.error('Requested URL:', this.url); // 'this.url' refers to the 'url' option of the AJAX settings
                console.error('Status:', textStatus);
                console.error('Error Thrown:', errorThrown);
                
            }
        });
    }
  }

  // External AJAX Call
  // Exchange Rate  API
  $(document).ready(function() {
    if (window.location.pathname.endsWith('projects.html') && $('#exchange-rates-section').length) {
      console.log('Take the exchange rates from the frankfurter API');
      $.ajax({
        url: 'https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,TRY',
        dataType: 'json',
        success: function(res) {
          console.log('API Response:', res);
          if (!res.rates) {
            console.error('“rates” error!: response', res);
            return;
          }
          const list = $('#rates-list').empty();
        
          $.each(res.rates, function(code, rate) {
            list.append(`<li>${code}: ${rate.toFixed(4)}</li>`);
          });
        },
        error: function(xhr, status, err) {
          console.error('Frankfurter API Error!:', status, err);
        }
      });
    }
  });





  // Internal Ajax Call: 
  // AJAX Call For HomePage
  if ( (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/index')) && $('#daily-architectural-term-content').length > 0 ) {
    const termContentContainer = $('#daily-architectural-term-content');

    

    $.ajax({
        url: 'json_files/architectural_terms.json', 
        dataType: 'json',
        success: function(termsData) {
            if (termsData && termsData.length > 0) {
                // Select a random term
                const randomIndex = Math.floor(Math.random() * termsData.length);
                const selectedTermObject = termsData[randomIndex];

                // Prepare the HTML for the selected term
                const termHtmlOutput = `
                    <h3>${selectedTermObject.term}</h3>
                    <p class="term-description">${selectedTermObject.description}</p>
                    ${selectedTermObject.category ? `<p class="term-category">Category: ${selectedTermObject.category}</p>` : ''}
                `;
                
                termContentContainer.html(termHtmlOutput); 
            } else {
                
                termContentContainer.html('<p>No architectural terms found at this time.</p>');
                console.warn('architectural_terms.json was loaded but is empty or not an array of terms.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.error('Error loading!:', textStatus, errorThrown);
            console.error('Requested URL:', this.url); 
            termContentContainer.html('<p style="color:red;">Could not load the architectural term of the day. Please try again later.</p>');
        }
    });
  }

      
});
  