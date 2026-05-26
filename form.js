const form = document.forms['contact']
const closeSuccess = document.querySelector('p.alert-submit-success button.close')

const alerts = {
  'empty-name': form.querySelector('.alert-empty-name'),
  'empty-email': form.querySelector('.alert-empty-email'),
  'invalid-email': form.querySelector('.alert-invalid-email'),
  success: document.querySelector('.alert-submit-success'),
}

function validate() {
  Object.values(alerts).forEach((item) => item.classList.add('display-none'))
  let valid = true

  if (form['name'].value == '') {
    alerts['empty-name'].classList.remove('display-none')
    valid = false
  }

  if (form['email'].value == '') {
    alerts['empty-email'].classList.remove('display-none')
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form['email'].value)) {
    alerts['invalid-email'].classList.remove('display-none')
    valid = false
  }

  return valid
}

form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (!validate()) return

  const params = new URLSearchParams(new FormData(form))

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
    .then(() => {
      form?.classList.add('display-none')
      alerts['success']?.classList.remove('display-none')
    })
    .catch(() => {})
})

closeSuccess?.addEventListener('click', function () {
  form?.classList.remove('display-none')
  alerts['success']?.classList.add('display-none')
})
