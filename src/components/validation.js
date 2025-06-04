const showInputError = (
  formElement,
  element,
  errorMessage,
  validationConfiguration
) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add(validationConfiguration.inputErrorClass);
  formError.classList.add(validationConfiguration.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, element, validationConfiguration) => {
  element.classList.remove(validationConfiguration.inputErrorClass);
  const formError = formElement.querySelector(`.${element.id}-error`);
  formError.classList.remove(validationConfiguration.errorClass);
  formError.textContent = "";
};

const checkFormValidity = (
  formElement,
  iputElement,
  validationConfiguration
) => {
  if (iputElement.validity.patternMismatch) {
    iputElement.setCustomValidity(iputElement.dataset.inputError);
  } else if (iputElement.validity.customError) {
    iputElement.setCustomValidity("");
  }
  if (iputElement.validity.valid) {
    hideInputError(formElement, iputElement, validationConfiguration);
  } else {
    showInputError(
      formElement,
      iputElement,
      iputElement.validationMessage,
      validationConfiguration
    );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleSubmitButton = (inputList, button, validationConfiguration) => {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfiguration.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfiguration.inactiveButtonClass);
  }
};

const setInputEventListener = (formElement, validationConfiguration) => {
  const inputElements = formElement.querySelectorAll(
    validationConfiguration.inputSelector
  );
  const submitButton = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  const inputList = Array.from(inputElements);
  toggleSubmitButton(inputList, submitButton, validationConfiguration);
  inputElements.forEach((inputSelector) => {
    inputSelector.addEventListener("input", (evnt) => {
      checkFormValidity(formElement, evnt.target, validationConfiguration);
      toggleSubmitButton(inputList, submitButton, validationConfiguration);
    });
  });
};

export const enableValidation = (validationConfiguration) => {
  const popupForms = document.querySelectorAll(validationConfiguration.formSelector);
  popupForms.forEach((popupForm) => {
    setInputEventListener(popupForm, validationConfiguration);
  });
};

export const clearValidation = (formElement, validationConfiguration) => {
  const inputElements = formElement.querySelectorAll(
    validationConfiguration.inputSelector
  );
  const submitButton = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  const inputList = Array.from(inputElements);
  toggleSubmitButton(inputList, submitButton, validationConfiguration);
  inputElements.forEach((inputSelector) => {
    hideInputError(formElement, inputSelector, validationConfiguration);
  });
};
