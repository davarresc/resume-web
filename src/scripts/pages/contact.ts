import { ActionInputError } from "astro:actions";
import { actions } from "astro:actions";
import type { ActionError } from "astro:actions";

const init = () => {
  const successAlert = document.querySelector(".alert-success");
  const errorAlert = document.querySelector(".alert-error");
  const form = document.querySelector(
    "form[name='contactForm']",
  ) as HTMLFormElement;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const formData = new FormData(form);
    const { error } = await actions.contactForm(formData);
    if (!error) {
      onSuccess();
    } else {
      onError(error);
    }
  };

  const onSuccess = () => {
    successAlert?.classList.remove("hidden");
    errorAlert?.classList.add("hidden");
    form.reset();
  };

  const onError = (error: ActionError) => {
    if (error instanceof ActionInputError) {
      const errorFields = Object.keys(error.fields);
      const errorClasses = ["border-red-300", "focus:border-red-600"];
      const elements = form.elements as unknown as Record<string, HTMLElement>;

      Object.keys(elements).forEach((element) => {
        if (errorFields.includes(element)) {
          elements[element].classList.add(...errorClasses);
        } else {
          elements[element].classList.remove(...errorClasses);
        }
      });

      if (errorFields.length > 0) {
        elements[errorFields[0]].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        elements[errorFields[0]].focus({ preventScroll: true });
      }
    }

    successAlert?.classList.add("hidden");
    errorAlert?.classList.remove("hidden");
  };

  form.addEventListener("submit", handleSubmit);
};

export default init;
