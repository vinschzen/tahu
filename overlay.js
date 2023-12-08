const figures = document.querySelectorAll('#products figure');
			const overlay = document.getElementById('overlay');
		  
			figures.forEach((figure, index) => {
			  figure.addEventListener('click', () => {
				showOverlay(index);
			  });
			});
		  
			overlay.addEventListener('click', () => {
			  hideOverlay();
			});
		  
			function showOverlay(index) {
				const selectedFigure = figures[index];
				const clone = selectedFigure.cloneNode(true);

				overlay.innerHTML = '';
				overlay.appendChild(clone);
				overlay.appendChild(createImageInfo("Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."));
				overlay.classList.add('show');
			}
		  
			function hideOverlay() {
			  overlay.classList.remove('show');
			}

			function createImageInfo(title, description) {
				const imageInfo = document.createElement('div');
				imageInfo.classList.add('image-info');

				const titleElement = document.createElement('h2');
				titleElement.textContent = title;
				imageInfo.appendChild(titleElement);

				const descriptionElement = document.createElement('p');
				descriptionElement.textContent = description;
				imageInfo.appendChild(descriptionElement);

				return imageInfo;
			}