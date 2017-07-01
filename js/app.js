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
    this.addBtn = $("#addBtn");
    this.cancelBtn = $("#cancelBtn");
    this.artists = {};
    this.attachClickHandlers = () => {
        this.addBtn.click(this.handleAddClicked);
        this.cancelBtn.click(this.clear);
    }
    this.handleAddClicked = () => {
        const name = this.artistNameInput.val();
        const artist = new AddArtist(this);
        this.artists[name] = artist;
        this.addArtistToDom(this.artists);
        this.clear()
    }
    this.clear = () => {
        console.log("cancel")
    }
    function AddArtist(gallery){
        const artist = this;
        this.name = gallery.artistNameInput.val();
        this.dob = gallery.dobInput.val();
        this.email = gallery.emailInput.val();
    }
    this.addArtistToDom = (obj) => {
        this.removeAllArtistDomElements();
        const $tableBody = $('#tbody');
        for (let i in obj){
            const $tr = $('<tr>');
            const $name = $('<td>').text(obj[i].name);
            const $dob = $('<td>').text(obj[i].dob);
            const $email = $('<td>').text(obj[i].email);
            const $button = $('<button>', {
                type: 'button',
                id: 'DeleteArtistBtn' + i,
                class: 'btn btn-danger',
                text: 'Delete'
            });
            var index = i;
            $tableBody.append($tr.append($name, $dob, $email, $button));
            this.handleIndividualDelete($button, obj[i].name);
        }
    }
    this.removeAllArtistDomElements = () => {
        const $tableBody = $('#tbody').empty();
    }
    this.removeArtistFromDom = (targetButton) => {
        targetButton.parent($('<tr>')).remove();
    }
    this.handleIndividualDelete = (targetButton, name) => {
        targetButton.click(function() {
            delete gallery.artists[name];
            gallery.removeArtistFromDom(targetButton);
       })
    }
}
