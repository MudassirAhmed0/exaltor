/**
 * PHP Email Form Validation - v3.5
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */

const form = document.querySelector("#contactForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.getElementById("submitBTN").disabled=true;
  const formData = new FormData(form);
  let object = {};
  formData.forEach((value, key) => (object[key] = value));
  let json = JSON.stringify(object);

  const response = await fetch("/contactForm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  });

  
  if (response.ok) {
    form.querySelector(".loading").classList.remove("d-block");
    form.querySelector(".sent-message").classList.add("d-block");
    form.reset();
    document.getElementById("submitBTN").disabled=false;
  } else {
    displayError("Form submission failed and no error message returned from: " + "contactForm");
    document.getElementById("submitBTN").disabled=false;
  }
});

function displayError(error) {
  form.querySelector(".loading").classList.remove("d-block");
  form.querySelector(".error-message").innerHTML = error;
  form.querySelector(".error-message").classList.add("d-block");
}

/*

(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");
      let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }
      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: "contactForm" }).then((token) => {
                formData.set("recaptcha-response", token);
                php_email_form_submit(thisForm, action, formData);
              });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, "The reCaptcha javascript API url is not loaded!");
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: "POST",
      body: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        thisForm.querySelector(".loading").classList.remove("d-block");
        if (data.trim() == "OK") {
          
        } else {
          throw new Error(data ? data : "Form submission failed and no error message returned from: " + action);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  
})();
*/
