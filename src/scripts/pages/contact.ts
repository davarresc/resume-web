import { ActionInputError } from "astro:actions";
import { actions } from "astro:actions";
import type { ActionError } from "astro:actions";

const errorClasses = ["border-red-300", "focus:border-red-600"];

export const handleSubmit = async (form: HTMLFormElement, e: Event) => {
  const submitButton = form.querySelector(
    "button[type='submit']",
  ) as HTMLButtonElement;

  e.preventDefault();
  e.stopImmediatePropagation();

  submitButton.setAttribute("disabled", "true");
  const formData = new FormData(form);
  const { error } = await actions.contactForm(formData);

  if (!error) {
    onSuccess(form);
  } else {
    onError(form, error);
  }

  submitButton.removeAttribute("disabled");
};

const onSuccess = (form: HTMLFormElement) => {
  const elements = form.elements as unknown as Record<string, HTMLElement>;
  const successAlert = document.querySelector(".alert-success");
  const errorAlert = document.querySelector(".alert-error");

  const firstNameEle = elements["firstName"];

  successAlert?.classList.remove("hidden");
  errorAlert?.classList.add("hidden");
  form.reset();
  Object.keys(elements).forEach((element) => {
    elements[element].classList.remove(...errorClasses);
  });

  scrollIntoView(firstNameEle);
  firstNameEle.focus({ preventScroll: true });
};

const scrollIntoView = (element: HTMLElement) => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const onError = (form: HTMLFormElement, error: ActionError) => {
  const elements = form.elements as unknown as Record<string, HTMLElement>;

  if (error instanceof ActionInputError) {
    const errorFields = Object.keys(error.fields);

    Object.keys(elements).forEach((element) => {
      if (errorFields.includes(element)) {
        elements[element].classList.add(...errorClasses);
      } else {
        elements[element].classList.remove(...errorClasses);
      }
    });

    if (errorFields.length > 0) {
      scrollIntoView(elements[errorFields[0]]);
      elements[errorFields[0]].focus({ preventScroll: true });
    }
  }

  displayAlertError();
};

export const displayAlertError = () => {
  const successAlert = document.querySelector(".alert-success");
  const errorAlert = document.querySelector(".alert-error");

  successAlert?.classList.add("hidden");
  errorAlert?.classList.remove("hidden");
};
