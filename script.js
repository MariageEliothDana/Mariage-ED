const ACCESS_CODE = 'ED270627';
const access = document.querySelector('#access');
const invitation = document.querySelector('#invitation');
const transitionWash = document.querySelector('#transition-wash');
const nameInput = document.querySelector('#name');
const guestsSelect = document.querySelector('#guests');
const singleGuestOnly = ['valentine', 'jason'];

function updateGuestOptions() {
  const names = nameInput.value.toLocaleLowerCase('fr-FR');
  const onlyOne = singleGuestOnly.some((name) => names.includes(name));
  const twoOption = guestsSelect.querySelector('option[value="2"]');
  twoOption.hidden = onlyOne;
  twoOption.disabled = onlyOne;
  if (onlyOne) guestsSelect.value = '1';
}

nameInput.addEventListener('input', updateGuestOptions);
updateGuestOptions();

document.querySelector('#access-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#access-code');
  const error = document.querySelector('#access-error');
  if (input.value.trim().toUpperCase() === ACCESS_CODE) {
    access.classList.add('opening');
    window.setTimeout(() => {
      transitionWash.classList.add('active');
      access.classList.add('leaving');
      invitation.classList.remove('hidden');
      invitation.classList.add('pre-reveal');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          invitation.classList.add('revealing');
          window.setTimeout(() => transitionWash.classList.remove('active'), 650);
        });
      });
    }, 2350);
    window.setTimeout(() => {
      access.classList.add('hidden');
      window.scrollTo(0, 0);
    }, 3000);
  } else {
    error.textContent = 'Code incorrect. Vérifiez votre invitation.';
    input.select();
  }
});
document.querySelector('#rsvp-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const response = Object.fromEntries(form.entries());
  response.events = [form.get('mairie'), form.get('domaine')];
  response.dietType = form.get('dietType');
  const responses = JSON.parse(localStorage.getItem('wedding-demo-responses') || '[]');
  responses.push({...response, submittedAt: new Date().toISOString()});
  localStorage.setItem('wedding-demo-responses', JSON.stringify(responses));
  document.querySelector('#success').textContent = 'Merci, votre réponse a bien été enregistrée dans cette démo.';
  event.currentTarget.reset();
});
