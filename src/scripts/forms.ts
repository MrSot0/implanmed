/** Valida con la API nativa y muestra el primer error junto al botón de envío. */
export function validateForm(form: HTMLFormElement) {
  const box = form.querySelector<HTMLElement>('[data-form-error]');
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  const invalid = [...form.querySelectorAll<HTMLInputElement>('input, select, textarea')].filter(
    (el) => !el.checkValidity(),
  );
  if (invalid.length === 0) {
    if (box) box.hidden = true;
    return true;
  }
  invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
  const first = invalid[0];
  const label = form.querySelector(`label[for="${first.id}"]`)?.textContent?.replace('*', '').trim() ?? 'Un campo';
  const msg = first.validity.valueMissing
    ? `Falta completar: ${label}.`
    : `Revisa el campo: ${label}.`;
  if (box) {
    box.textContent = msg;
    box.hidden = false;
  }
  first.focus();
  return false;
}
