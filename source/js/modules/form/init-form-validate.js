/* eslint-disable no-console */
import FormsValidate from './form-validate';
const formWrappers = document.querySelectorAll('[data-validate]');

const resetForm = (form) => {
  setTimeout(() => {
    window.clearForm(form);
  }, 1000);
};

const baseValidationSuccessCallback = (e) => {

  // В данном колбеке бэкендер будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки при отправке
  let formData = new FormData(e.target);
  let data = formData.get('month') + '/' + formData.get('day') + '/' + formData.get('year');
  let birthDate = new Date(data);
  let today = new Date();
  let validAge = 568036800000; // 18 years in milliseconds
  let oneDay = 86400000; // one day in milliseconds
  if ((today - birthDate + oneDay) > validAge) {
    if (e.target.querySelector('.custom-input__error').classList.contains('is-active')) {
      e.target.querySelector('.custom-input__error').classList.remove('is-active');
    }
    console.log('valid age');
    resetForm(e.target);
  } else {
    e.preventDefault();
    console.log('invalid age');
    if (!e.target.querySelector('.custom-input__error').classList.contains('is-active')) {
      e.target.querySelector('.custom-input__error').classList.add('is-active');
    }

  }

};

const baseValidationErrorCallback = (e) => {
  e.preventDefault();

};

const customExampleValidationSuccessCallback = (e) => {
  e.preventDefault();

  // В данном колбеке бэкендер будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки при отправке
  resetForm(e.target);
  // eslint-disable-next-line no-console
  console.log('Ваша форма успешна отправлена');
};

const customExampleValidationErrorCallback = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.error('Отправка формы невозможна, заполните все обязательные поля');
};

const callbacks = {
  base: {
    // Колбек при успешной валидации формы при попытке её отправки
    validationSuccessCallback: baseValidationSuccessCallback,
    // Колбек при не успешной валидации формы при попытке её отправки, не связан с запросами на сервер
    validationErrorCallback: baseValidationErrorCallback,
  },
  customExample: {
    validationSuccessCallback: customExampleValidationSuccessCallback,
    validationErrorCallback: customExampleValidationErrorCallback,
  },
};

const setCustomPhoneInputsEvent = () => {
  if (document.querySelectorAll('[data-validate-type="phone"] input').length) {
    document.querySelector('html').addEventListener('input', ({target}) => {
      if (target.closest('[data-validate-type="phone"]')) {
        target.closest('[data-validate-type="phone"]').querySelector('input').dispatchEvent(new Event('input'));
      }
    });
  }
};

const initFormValidate = () => {
  if (formWrappers.length) {
    setCustomPhoneInputsEvent();
    formWrappers.forEach((wrapper) => {
      let callback = wrapper.dataset.callback;
      if (!callback) {
        callback = 'base';
      }

      const formValidate = new FormsValidate(wrapper, callbacks[callback]);
      return formValidate.init();
    });
  }
};

export {initFormValidate};
