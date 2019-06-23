//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

// events 
$('#buscar').click(function() {
  let url = '';
  if ($("#checkPersonalizada")[0].checked){
    //console.log($("#checkPersonalizada")[0].checked)
  }else{
    url = "http://localhost:3000/search"
  }
  $.ajax({
    url : url,
    type : 'GET',
    dataType : 'json' 
  }).done(function(data){
    if (!data.error){
      $('.lista').html(renderCardContent(data.datos))
    }
  })
})
// initialize
function initialize(){
  $.ajax({
    url : "http://localhost:3000/search/filters",
    type : 'GET',
    dataType : 'json'
  }).done(function(data){
    if(!data.error){
      $('#ciudad').append(renderOption(data.cities))
      $('#tipo').append(renderOption(data.types))
      // init materialize select element
      $("#ciudad").material_select();
      $("#tipo").material_select();
    }
  })
}
// render elements
function renderOption(info){
  
  let elements = ''
  info.forEach(function(value, index){
    elements += `<option value="${value}">${value}</option>`
  })
  return elements
}
function renderCardContent(array){
  let elements = ''
  array.forEach(function(value, index){
    elements += 
    `<div class="card horizontal">
        <div class="card-image">
            <img src="http://localhost:3000/img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div> <p><strong>Direccion: </strong>${value.Direccion}</p> </div>
            <div> <p><strong>Ciudad: </strong>${value.Ciudad}</p> </div>
            <div> <p><strong>Telefono: </strong>${value.Telefono}</p> </div>
            <div> <p><strong>Código postal: </strong>${value.Codigo_Postal}</p> </div>
            <div> <p><strong>Precio: </strong>${value.Precio}</p> </div>
            <div> <p><strong>Tipo: </strong>${value.Tipo}</p> </div>
          </div>
        </div>
    </div>`
  })
  return elements
}
function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}
setSearch()

initialize()