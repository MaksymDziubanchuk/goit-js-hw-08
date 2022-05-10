import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[type="email"]'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

const LOCAL_STORAGE_KEY = 'feedback-form-state';

let emailValue = '';
let textareaValue = '';

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
  emailValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).email;
  textareaValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).textarea;
}

if (emailValue) {
  refs.email.value = emailValue;
}

if (textareaValue) {
  refs.textarea.value = textareaValue;
}

const localData = {
  email: '',
  textarea: '',
};

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localData.email = '';
  localData.textarea = '';
}

function onEmailInput(event) {
  localData.email = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
}

function onTextareaInput(event) {
  localData.textarea = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
}
