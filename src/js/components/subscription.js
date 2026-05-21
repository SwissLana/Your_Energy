import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { subscribe } from '../api/exercises-api';

export function initSubscription() {
  const form = document.querySelector('[data-subscription-form]');

  if (!form) return;

  form.addEventListener('submit', onSubscriptionSubmit);
}

async function onSubscriptionSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const email = form.elements.email.value.trim();

  const button = form.querySelector('.subscribe-btn');

  try {
    button.disabled = true;
    
    await subscribe(email);

    iziToast.success({
      message: 'Subscription successful!',
      position: 'topRight',
    });

    form.reset();
  } catch (error) {
  
    iziToast.error({
      message: error.response?.data?.message || 'Subscription failed.',
      position: 'topRight',
    });
    
  } finally {
    button.disabled = false;
  }
}
