"use strict";

(() => {
  // (function () {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  // Аватарка пользователя должна загружаться через поле загрузки файлов в блоке .ad-form__field и показываться в блоке .ad-form-header__preview.
  const avatarChooser = window.form.ad.querySelector(`.ad-form__field  input[type=file]`);
  const avatarPreview = window.form.ad.querySelector(`.ad-form-header__preview img`);
  const avatarSrc = avatarPreview.src;

  // Фотография жилья должна загружаться через поле загрузки файлов в блоке .ad-form__upload и показываться в блоке .ad-form__photo.
  const photoChooser = window.form.ad.querySelector(`.ad-form__upload  input[type=file]`);
  const photoPreview = window.form.ad.querySelector(`.ad-form__photo`);

  avatarChooser.addEventListener(`change`, () => {
    const file = avatarChooser.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (file && matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener(`change`, () => {
    const file = photoChooser.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (file && matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const img = document.createElement(`img`);
        img.src = reader.result;
        img.style.width = `100%`;
        photoPreview.innerHTML = ``;
        photoPreview.appendChild(img);
      });

      reader.readAsDataURL(file);

    }
  });

  const clear = () => {
    avatarPreview.src = avatarSrc;
    if (photoPreview.firstChild) {
      photoPreview.firstChild.remove();
    }
  };

  window.photos = {
    clear
  };
})();
