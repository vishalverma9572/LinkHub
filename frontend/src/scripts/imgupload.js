document.addEventListener('DOMContentLoaded', function() {
    const selectImage = document.querySelector('.select-image');
    const inputFile = document.querySelector('#file');
    const imgArea = document.querySelector('.img-area');
  
    if (selectImage && inputFile && imgArea) {
      selectImage.addEventListener('click', function () {
        inputFile.click();
      });
  
      inputFile.addEventListener('change', function () {
        const image = this.files[0];
        if (image && image.size < 15000000) {
          const reader = new FileReader();
          reader.onload = ()=> {
            const allImg = imgArea.querySelectorAll('img');
            allImg.forEach(item=> item.remove());
            const imgUrl = reader.result;
            const img = document.createElement('img');
            img.src = imgUrl;
            imgArea.appendChild(img);
            imgArea.classList.add('active');
            imgArea.dataset.img = image.name;
          };
          reader.readAsDataURL(image);
        } else if (image && image.size >= 15000000) {
          alert("Image size more than 2MB");
        }
      });
    } else {
      console.error("One or more required elements not found in the DOM.");
    }
  });
  