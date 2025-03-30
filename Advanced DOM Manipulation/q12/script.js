const item2 = document.getElementById('item2');

item2.addEventListener('click', () => {
    alert(item2.parentNode.textContent.trim());

    if (item2.nextElementSibling) {
        console.log('Next sibling:', item2.nextElementSibling.textContent);
    } else {
        console.log('Next sibling: null');
    }

    if (item2.previousElementSibling) {
        console.log('Previous sibling:', item2.previousElementSibling.textContent);
    } else {
        console.log('Previous sibling: null');
    }
});
