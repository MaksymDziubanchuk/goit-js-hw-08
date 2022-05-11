import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[type="email"]'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

let emailValue;
let textareaValue;

const formData = {};

loadValues();
updateInputs();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function loadValues() {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    emailValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).email;
    textareaValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).message;
  } else {
    emailValue = '';
    textareaValue = '';
  }
  formData.email = emailValue;
  formData.message = textareaValue;
}

function updateInputs() {
  if (emailValue) {
    refs.email.value = emailValue;
  }

  if (textareaValue) {
    refs.textarea.value = textareaValue;
  }
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  loadValues();
}
