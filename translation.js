document.addEventListener('DOMContentLoaded', function () {

    let currentLanguage = 'en';
    
    let translations = {};
    
    function changeLanguage(language) {
        currentLanguage = language;

        fetch(`lang/${language}.json`)
        .then(response => response.json())
        .then(data => {
            translations = data;
            Object.keys(translations).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                  element.innerHTML = translations[key];
                  console.log(element);
                }
              });
        })
        .catch(error => console.error('Error loading translations', error));
      }
      
      document.getElementById('op-en').addEventListener('click', function (event) {
        event.preventDefault();
        changeLanguage('en');
      });
      
      document.getElementById('op-id').addEventListener('click', function (event) {
        event.preventDefault();
        changeLanguage('id');
      });
      
      document.getElementById('op-jp').addEventListener('click', function (event) {
        event.preventDefault();
        changeLanguage('jp');
      });
    
});