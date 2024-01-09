import Vue from "vue";


Vue.directive('textbox-validation', {
    bind: function(el, binding, vnode) {
      el.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        const validationPattern = binding.value.pattern;
        const validationMessage = binding.value.message;
  
        if (!validationPattern.test(inputValue)) {
          event.target.classList.add('validation-error');
          event.target.setAttribute('data-validation-message', validationMessage);
        } else {
          event.target.classList.remove('validation-error');
          event.target.removeAttribute('data-validation-message');
        }
      });
    },
  });