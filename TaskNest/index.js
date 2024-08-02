document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const addListButton = document.querySelector('.add-list');
  
    addListButton.addEventListener('click', () => {
        const list = createList();
        board.insertBefore(list, addListButton);
    });
  
    function createList() {
        const list = document.createElement('div');
        list.className = 'list';
  
        const listHeader = document.createElement('div');
        listHeader.className = 'list-header';
  
        const listTitleInput = document.createElement('input');
        listTitleInput.className = 'list-title-input';
        listTitleInput.placeholder = 'List Title';
  
        listHeader.appendChild(listTitleInput);
  
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards';
  
        const addCardButton = document.createElement('button');
        addCardButton.className = 'add-card';
        addCardButton.textContent = '+ Add a card';
        addCardButton.style.display = 'none';
  
        listTitleInput.addEventListener('blur', () => {
            if (listTitleInput.value.trim()) {
                const listTitle = document.createElement('h3');
                listTitle.className = 'list-title';
                listTitle.textContent = listTitleInput.value.trim();
                listHeader.replaceChild(listTitle, listTitleInput);
                addCardButton.style.display = 'block';
            }
        });
  
        addCardButton.addEventListener('click', () => {
            const cardTitle = prompt('Enter card title:');
            if (cardTitle) {
                const card = createCard(cardTitle);
                cardsContainer.appendChild(card);
            }
        });
  
        list.appendChild(listHeader);
        list.appendChild(cardsContainer);
        list.appendChild(addCardButton);
  
        return list;
    }
  
    function createCard(title) {
        const card = document.createElement('div');
        card.className = 'card';
  
        const radio = document.createElement('input');
        radio.type = 'checkbox';
        radio.addEventListener('change', () => {
            card.classList.toggle('completed');
        });
  
        const cardContent = document.createElement('span');
        cardContent.textContent = title;
  
        const menuButton = document.createElement('i');
        menuButton.className = 'fa-solid fa-ellipsis-vertical menu-button';
        menuButton.addEventListener('click', () => {
            toggleMenu(menuButton);
        });
  
        const menu = createMenu(card);
  
        card.appendChild(radio);
        card.appendChild(cardContent);
        card.appendChild(menuButton);
        card.appendChild(menu);
        return card;
    }
  
    function createMenu(card) {
        const menu = document.createElement('div');
        menu.className = 'menu';
  
        const deleteOption = document.createElement('div');
        deleteOption.textContent = 'Delete Card';
        deleteOption.addEventListener('click', () => {
            card.remove();
        });
  
        const editOption = document.createElement('div');
        editOption.textContent = 'Edit Card';
        editOption.addEventListener('click', () => {
            const newContent = prompt('Edit card content:', card.querySelector('span').textContent);
            if (newContent !== null) {
                card.querySelector('span').textContent = newContent;
            }
        });
  
        const starOption = document.createElement('div');
        starOption.textContent = 'Star Card';
        starOption.addEventListener('click', () => {
            card.classList.toggle('starred');
        });
  
        menu.appendChild(deleteOption);
        menu.appendChild(editOption);
        menu.appendChild(starOption);
  
        return menu;
    }
  
    function toggleMenu(button) {
        const menu = button.nextElementSibling;
        menu.classList.toggle('active');
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && event.target !== button) {
                menu.classList.remove('active');
            }
        }, { once: true });
    }
  
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
  
    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
  });
  