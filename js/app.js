$(document).ready((event) => init());

let gallery = null;

const init = () => {
    gallery = new ArtistGallery();
    gallery.attachClickHandlers();
}

function ArtistGallery(){
    const gallery = this;
    this.artistFirstInput = $("#artistFirst");
    this.artistLastInput = $("#artistLast");
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
        const name = this.artistFirstInput.val() + " " + this.artistLastInput.val();
        const artist = new AddArtist(this);
        this.artists[name] = artist;
        this.addArtistToDom(this.artists);
        this.clear()
    }
    this.clear = () => {
        console.log("cancel")
    }
}
