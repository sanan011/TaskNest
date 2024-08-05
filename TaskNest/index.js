document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const addListButton = document.querySelector('.add-list');

    class ListInformation {
        constructor(listHeader, cards) {
            this.listHeader = listHeader;
            this.cards = cards;
        }
    }

    let lists = [];

    addListButton.addEventListener('click', () => {
        const listObject = createList();
        board.insertBefore(listObject.element, addListButton);
        lists.push(listObject.info);
        displayLists();
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

        const listInfo = new ListInformation('', []);

        listTitleInput.addEventListener('blur', () => {
            if (listTitleInput.value.trim()) {
                const listTitle = document.createElement('h3');
                listTitle.className = 'list-title';
                listTitle.textContent = listTitleInput.value.trim();
                listHeader.replaceChild(listTitle, listTitleInput);
                addCardButton.style.display = 'block';
                listInfo.listHeader = listTitle.textContent;
            }
        });

        addCardButton.addEventListener('click', () => {
            const cardTitle = prompt('Enter card title:');
            if (cardTitle) {
                const card = createCard(cardTitle, listInfo);
                listInfo.cards.push(cardTitle);
                cardsContainer.appendChild(card);
                displayLists();
            }
        });

        list.appendChild(listHeader);
        list.appendChild(cardsContainer);
        list.appendChild(addCardButton);

        return { element: list, info: listInfo };
    }

    function createCard(title, listInfo) {
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

        const menu = createMenu(card, listInfo, title);

        card.appendChild(radio);
        card.appendChild(cardContent);
        card.appendChild(menuButton);
        card.appendChild(menu);
        return card;
    }

    function createMenu(card, listInfo, cardTitle) {
        const menu = document.createElement('div');
        menu.className = 'menu';

        const deleteOption = document.createElement('div');
        deleteOption.textContent = 'Delete Card';
        deleteOption.addEventListener('click', () => {
            card.remove();
            const cardIndex = listInfo.cards.indexOf(cardTitle);
            if (cardIndex > -1) {
                listInfo.cards.splice(cardIndex, 1);
                displayLists();
            }
        });

        const editOption = document.createElement('div');
        editOption.textContent = 'Edit Card';
        editOption.addEventListener('click', () => {
            const newContent = prompt('Edit card content:', card.querySelector('span').textContent);
            if (newContent !== null) {
                const cardIndex = listInfo.cards.indexOf(cardTitle);
                if (cardIndex > -1) {
                    listInfo.cards[cardIndex] = newContent;
                }
                card.querySelector('span').textContent = newContent;
                displayLists();
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

    function displayLists() {
        console.log('Current Lists:', JSON.stringify(lists, null, 2));
    }

    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
});
