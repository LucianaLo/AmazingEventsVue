//crear instancia de vue 
const { createApp } = Vue

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

createApp({

  //definir el estado de la aplicacion 
  data() {
    return {
      dataEveents: [],
      checkboxes: [],
      eveF: [],
      text: "",
      resultFilter: []
    }
  },

  created() {

    fetch(urlApi)
      .then(response => response.json())
      .then(data => {

        this.dataEveents = data.events.filter(elemento => new Date(elemento.date) > new Date(data.currentDate))
        console.log(this.dataEveents)
        this.checkboxes = [...new Set(data.events.map(evento => evento.category))]
        console.log(this.checkboxes)
      })
      .catch(error => console.log(error))

  },
  methods: {

  },

  computed: {

    filtrosCruzados: function () {
      let eventosFiltrados = this.eveF.length == 0 ? this.dataEveents : this.dataEveents.filter(evento => this.eveF.includes(evento.category))
      this.resultFilter = this.text == "" ? eventosFiltrados : eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(this.text.toLowerCase().trim()))
    console.log(eventosFiltrados)
    }

  }

  //inicializar la instancia de vue
}).mount('#app')