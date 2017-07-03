$(document).ready((event) => init());
let gallery = null;

const init = () => {
    gallery = new ArtistGallery();
    gallery.attachClickHandlers();
}
function ArtistGallery(){
    const gallery = this;
    this.artistNameInput = $("#artistName");
    this.dobInput = $("#dob");
    this.emailInput = $("#email");
    this.artInput = $("#artName");
    this.priceInput = $("#artPrice");
    this.addBtn = $("#addBtn");
    this.cancelBtn = $("#cancelBtn");
    this.artists = {};
    this.attachClickHandlers = () => {
        this.addBtn.click(this.handleAddClicked);
        this.cancelBtn.click(this.clear);
    }
    this.handleAddClicked = () => {
        const name = this.artistNameInput.val();
        const art = this.artInput.val();
        const price = this.priceInput.val();
        if(!this.artists[name]){
            const artist = new AddArtist(this);
            this.artists[name] = artist;
            this.addArtistToDom(artist);
            this.addArtToDom(name, art, price);
            this.clearInput();
        } else {
            this.artists[name].artCollection.art = price;
            this.addArtToDom(name, art, price);
            this.clearInput();
        }
    }
    this.clearInput = () => {
        this.artistNameInput.val('');
        this.dobInput.val('');
        this.emailInput.val('');
        this.artInput.val('');
        this.priceInput.val('');
    }
    function AddArtist(gallery){
        this.name = gallery.artistNameInput.val();
        this.dob = gallery.dobInput.val();
        this.email = gallery.emailInput.val();
        this.artCollection = {};
        const art = gallery.artInput.val();
        const price = gallery.priceInput.val();
        this.artCollection[art] = price;
    }
    this.addArtistToDom = (obj) => {
        const $tableBody = $('#tbody');
        const $name = $('<td>').text(obj.name);
        const $tr = $('<tr>', {
            id: obj.name
        });
        const $dob = $('<td>').text(obj.dob);
        const $email = $('<td>').text(obj.email);
        const $art = $('<td>').text(obj.art);
        const $price = $('<td>').text('');
        const $button = $('<button>', {
            type: 'button',
            class: 'btn btn-danger',
            text: 'Remove'
        });
        $tableBody.append($tr.append($name, $dob, $email, $art, $price, $button));
        this.handleIndividualDelete($button, obj.name);
    }
    this.removeAllArtistDomElements = () => {
        const $tableBody = $('#tbody').empty();
    }
    this.removeFromDom = (targetButton, name) => {
        targetButton.parent($('<tr>')).siblings('.'+ name).remove();
        targetButton.parent($('<tr>')).remove();
    }
    this.addArtToDom = (name, art, price) => {
        const $tableBody = $('#tbody');
        const artistDomElement = $tableBody.find("#" + name);
        const $tr = $('<tr>', {
            class: name
        });
        const $name = $('<td>').text('');
        const $dob = $('<td>').text('');
        const $email = $('<td>').text('');
        const $art = $('<td>').text(art);
        const $price = $('<td>').text('$' + price);
        const $button = $('<button>', {
            type: 'button',
            class: 'btn btn-danger ',
            text: 'Remove'
        });
        artistDomElement.after($tr.append($name, $dob, $email, $art, $price, $button));
        this.handleArtDelete($button, name, art);
    }
    this.handleIndividualDelete = (targetButton, name) => {
        targetButton.click(function() {
            delete gallery.artists[name];
            gallery.removeFromDom(targetButton, name);
       })
    }
    this.handleArtDelete = (targetButton, name, art) => {
        targetButton.click(function() {
            delete gallery.artists[name].artCollection[art];
            gallery.removeFromDom(targetButton, name);
       })
    }
}
