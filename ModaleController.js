class ModaleController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.optionModale(this.getOptionsModale)
        this.view.optionAddOnDb(this.addOnDb)
        this.model.ModaleChanged(this.onModaleChanged)
    }


    onModaleChanged = (modales) => {

        this.view.displayModale(modales)

    }
    getOptionsModale = (mbid) => {
        this.model.bindModale(mbid)
    }

    addOnDb = (mbid) => {
        this.model.addMusique(mbid)
    }

}

const appa = new ModaleController(new ModaleModel(), new ModaleView())
