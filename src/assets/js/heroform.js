'use strict'

setTimeout(() => {
  var heroForm = document.querySelector("#heroForm");
  
  heroForm.addEventListener('submit', function() {
    var cant = parseInt(document.querySelector("#cant").value);
    var calidad = parseInt(document.querySelector("#calidad").value);
    var tipoEvento = parseInt(document.querySelector("#tipoEvento").value);
    var cantidad;
      console.log(tipoEvento, cant, calidad);
    
      if(tipoEvento < 4) {
        switch(calidad) {
          case 1: 
          cantidad = cant/10;
          break;
          case 2: 
          cantidad = cant/20;
          break;
          case 3: 
          cantidad = cant/30;
          break;
          default: "none";
        }
        var jefe = cant/500;
    
      }else if(tipoEvento > 3) {
          switch(calidad) {
            case 1: 
            cantidad = cant/15;
            break;
            case 2: 
            cantidad = cant/30;
            break;
            case 3: 
            cantidad = cant/45;
            break;
            default: "none;"
          }
          var jefe = 0;
        }else {

          console.log("no funcionó el código");
          // popupOtro = true;
          // var formOtro = document.querySelector("#formOtro");
      };

      console.log( typeof cantidad, cantidad);
    
      var m = Math.ceil(cantidad);
      var jefeMeseros = Math.ceil(jefe);
      
      console.log(m);
      // return m
    });
    
  }, 1000);
    
    
    // var meseros = this.m
    // console.log(meseros);
    
  