$(document).ready(function () {

  console.log("doc loaded");
  var url = window.location.href;

  if (url.lastIndexOf("/word-signs-dev") > -1) {
    console.log("In sign doc");

    let ids =                     ['1',  '2',   '3',  '4', '5',  '6',  '7',  '8',   '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
    let product_attribute_input = ['10', '13', '17', '20', '23', '26', '29', '32', '35', '38', '41', '44', '47', '50', '53', '56', '59', '62', '65', '68', '71', '74', '77', '80', '83'];
    let palette = ["#4ab2f1", "#0000FF", "#C0C0C0", "#800000", "#008000", "#800080", "#008080", "#FFD700", "#964B00", "#000080", "#808000", "#FFFF00", "#00FFFF", "#FF00FF", "#000000"];

    function del(_id) { console.log(_id) };

    var e = document.createElement('div'); //$('<div></div>'); // style="display:block; float:left;width:' + 20 + 'px; height:' + 20 + 'px;   margin-top:' + positionY + 'px;margin-left:' + positionX + 'px;border:1px dashed #CCCCCC;

    //const el = Object.assign(document.createElement('div'), { id: 'picker1',class: 'picker' });
    //document.getElementsByClassName("attributes")[0].appendChild(e);
    document.getElementById("product_attribute_input_10").append(e);

    e.setAttribute('id', 'picker1');
    e.setAttribute('class', 'picker');
    console.log("added div in sign doc");

    $("#picker1").colorPick({
      'initialColor': palette[0], //'#FF0000',
      'palette': palette,
      'onColorSelected': function () {
        console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_10").value = this.color;
      }
    });

    //// Button addition: https://stackoverflow.com/questions/8650975/javascript-to-create-a-button-with-onclick
    ////    Make it i element instead with font awesome: https://stackoverflow.com/questions/38661902/how-to-change-button-text-to-font-awesome-icon-using-jquery
    ////    Font awesone trash code ref: https://fontawesome.com/v4/icon/trash
    //var ed1 = document.createElement('i'); ed1.setAttribute('id', 'del1'); ed1.setAttribute('class', 'fa fa-trash'); ed1.setAttribute('style', 'font-size:18px;color:#CCCCCC');
    ////-- Button after div (not inside): https://www.tutorialkart.com/javascript/how-to-insert-element-in-document-after-specific-div-element-using-javascript/
    //document.getElementById("product_attribute_input_10").after(ed1);
    ////-- Call a function on adEventListener: https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    //ed1.addEventListener("click", function () { del(this.id) }, false);


    var e2 = document.createElement('div');
    document.getElementById("product_attribute_input_13").appendChild(e2);

    e2.setAttribute('id', 'picker2');
    e2.setAttribute('class', 'picker');
    //console.log("added div in sign doc 2");

    $("#picker2").colorPick({
      'initialColor': palette[1],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_13").value = this.color;
      }
    });

    //var ed2 = document.createElement('i'); ed2.setAttribute('id', 'del2'); ed2.setAttribute('class', 'fa fa-trash'); ed2.setAttribute('style', 'font-size:18px;color:#CCCCCC');
    //document.getElementById("product_attribute_input_13").after(ed2);
    //ed2.addEventListener("click", function () { del(this.id) }, false);


    var e3 = document.createElement('div');
    document.getElementById("product_attribute_input_17").appendChild(e3);

    e3.setAttribute('id', 'picker3');
    e3.setAttribute('class', 'picker');
    //console.log("added div in sign doc 3");

    $("#picker3").colorPick({
      'initialColor': palette[2],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_17").value = this.color;
      }
    });

    //var ed3 = document.createElement('i'); ed3.setAttribute('id', 'del3'); ed3.setAttribute('class', 'fa fa-trash'); ed3.setAttribute('style', 'font-size:18px;color:#CCCCCC');
    //document.getElementById("product_attribute_input_17").after(ed3);
    //ed3.addEventListener("click", function () { del(this.id) }, false);


    var e4 = document.createElement('div');
    document.getElementById("product_attribute_input_20").appendChild(e4);

    e4.setAttribute('id', 'picker4');
    e4.setAttribute('class', 'picker');
    //console.log("added div in sign doc 4");

    $("#picker4").colorPick({
      'initialColor': palette[3],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_20").value = this.color;
      }
    });

    //var ed4 = document.createElement('i'); ed4.setAttribute('id', 'del4'); ed4.setAttribute('class', 'fa fa-trash'); ed4.setAttribute('style', 'font-size:18px;color:#CCCCCC');
    //document.getElementById("product_attribute_input_20").after(ed4);
    //ed4.addEventListener("click", function () { del(this.id) }, false);


    var e5 = document.createElement('div');
    document.getElementById("product_attribute_input_23").appendChild(e5);

    e5.setAttribute('id', 'picker5');
    e5.setAttribute('class', 'picker');
    //console.log("added div in sign doc 5");

    $("#picker5").colorPick({
      'initialColor': palette[4],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_23").value = this.color;
      }
    });


    var e6 = document.createElement('div');
    document.getElementById("product_attribute_input_26").appendChild(e6);

    e6.setAttribute('id', 'picker6');
    e6.setAttribute('class', 'picker');
    //console.log("added div in sign doc 6");

    $("#picker6").colorPick({
      'initialColor': palette[5],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_26").value = this.color;
      }
    });


    var e7 = document.createElement('div');
    document.getElementById("product_attribute_input_29").appendChild(e7);

    e7.setAttribute('id', 'picker7');
    e7.setAttribute('class', 'picker');
    //console.log("added div in sign doc 7");

    $("#picker7").colorPick({
      'initialColor': palette[6],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_29").value = this.color;
      }
    });


    var e8 = document.createElement('div');
    document.getElementById("product_attribute_input_32").appendChild(e8);

    e8.setAttribute('id', 'picker8');
    e8.setAttribute('class', 'picker');
    //console.log("added div in sign doc 8");

    $("#picker8").colorPick({
      'initialColor': palette[7],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_32").value = this.color;
      }
    });


    var e9 = document.createElement('div');
    document.getElementById("product_attribute_input_35").appendChild(e9);

    e9.setAttribute('id', 'picker9');
    e9.setAttribute('class', 'picker');
    //console.log("added div in sign doc 9");

    $("#picker9").colorPick({
      'initialColor': palette[8],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_35").value = this.color;
      }
    });


    var e10 = document.createElement('div');
    document.getElementById("product_attribute_input_38").appendChild(e10);

    e10.setAttribute('id', 'picker10');
    e10.setAttribute('class', 'picker');
    //console.log("added div in sign doc 10");

    $("#picker10").colorPick({
      'initialColor': palette[9],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_38").value = this.color;
      }
    });


    var e11 = document.createElement('div');
    document.getElementById("product_attribute_input_41").appendChild(e11);

    e11.setAttribute('id', 'picker11');
    e11.setAttribute('class', 'picker');
    //console.log("added div in sign doc 11");

    $("#picker11").colorPick({
      'initialColor': palette[10],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_41").value = this.color;
      }
    });


    var e12 = document.createElement('div');
    document.getElementById("product_attribute_input_44").appendChild(e12);

    e12.setAttribute('id', 'picker12');
    e12.setAttribute('class', 'picker');
    //console.log("added div in sign doc 12");

    $("#picker12").colorPick({
      'initialColor': palette[11],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_44").value = this.color;
      }
    });


    var e13 = document.createElement('div');
    document.getElementById("product_attribute_input_47").appendChild(e13);

    e13.setAttribute('id', 'picker13');
    e13.setAttribute('class', 'picker');
    //console.log("added div in sign doc 13");

    $("#picker13").colorPick({
      'initialColor': palette[12],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_47").value = this.color;
      }
    });


    var e14 = document.createElement('div');
    document.getElementById("product_attribute_input_50").appendChild(e14);

    e14.setAttribute('id', 'picker14');
    e14.setAttribute('class', 'picker');
    //console.log("added div in sign doc 14");

    $("#picker14").colorPick({
      'initialColor': palette[13],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_50").value = this.color;
      }
    });


    var e15 = document.createElement('div');
    document.getElementById("product_attribute_input_53").appendChild(e15);

    e15.setAttribute('id', 'picker15');
    e15.setAttribute('class', 'picker');
    //console.log("added div in sign doc 15");

    $("#picker15").colorPick({
      'initialColor': palette[14],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_53").value = this.color;
      }
    });


    var e16 = document.createElement('div');
    document.getElementById("product_attribute_input_56").appendChild(e16);

    e16.setAttribute('id', 'picker16');
    e16.setAttribute('class', 'picker');
    //console.log("added div in sign doc 16");

    $("#picker16").colorPick({
      'initialColor': palette[0],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_56").value = this.color;
      }
    });


    var e17 = document.createElement('div');
    document.getElementById("product_attribute_input_59").appendChild(e17);

    e17.setAttribute('id', 'picker17');
    e17.setAttribute('class', 'picker');
    //console.log("added div in sign doc 17");

    $("#picker17").colorPick({
      'initialColor': palette[1],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_59").value = this.color;
      }
    });


    var e18 = document.createElement('div');
    document.getElementById("product_attribute_input_62").appendChild(e18);

    e18.setAttribute('id', 'picker18');
    e18.setAttribute('class', 'picker');
    //console.log("added div in sign doc 18");

    $("#picker18").colorPick({
      'initialColor': palette[2],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_62").value = this.color;
      }
    });


    var e19 = document.createElement('div');
    document.getElementById("product_attribute_input_65").appendChild(e19);

    e19.setAttribute('id', 'picker19');
    e19.setAttribute('class', 'picker');
    //console.log("added div in sign doc 19");

    $("#picker19").colorPick({
      'initialColor': palette[3],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_65").value = this.color;
      }
    });


    var e20 = document.createElement('div');
    document.getElementById("product_attribute_input_68").appendChild(e20);

    e20.setAttribute('id', 'picker20');
    e20.setAttribute('class', 'picker');
    //console.log("added div in sign doc 20");

    $("#picker20").colorPick({
      'initialColor': palette[4],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_68").value = this.color;
      }
    });


    var e21 = document.createElement('div');
    document.getElementById("product_attribute_input_71").appendChild(e21);

    e21.setAttribute('id', 'picker21');
    e21.setAttribute('class', 'picker');
    //console.log("added div in sign doc 21");

    $("#picker21").colorPick({
      'initialColor': palette[5],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_71").value = this.color;
      }
    });


    var e22 = document.createElement('div');
    document.getElementById("product_attribute_input_74").appendChild(e22);

    e22.setAttribute('id', 'picker22');
    e22.setAttribute('class', 'picker');
    //console.log("added div in sign doc 22");

    $("#picker22").colorPick({
      'initialColor': palette[6],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_74").value = this.color;
      }
    });


    var e23 = document.createElement('div');
    document.getElementById("product_attribute_input_77").appendChild(e23);

    e23.setAttribute('id', 'picker23');
    e23.setAttribute('class', 'picker');
    //console.log("added div in sign doc 23");

    $("#picker23").colorPick({
      'initialColor': palette[7],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_77").value = this.color;
      }
    });


    var e24 = document.createElement('div');
    document.getElementById("product_attribute_input_80").appendChild(e24);

    e24.setAttribute('id', 'picker24');
    e24.setAttribute('class', 'picker');
    //console.log("added div in sign doc 24");

    $("#picker24").colorPick({
      'initialColor': palette[8],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_80").value = this.color;
      }
    });


    var e25 = document.createElement('div');
    document.getElementById("product_attribute_input_83").appendChild(e25);

    e25.setAttribute('id', 'picker25');
    e25.setAttribute('class', 'picker');
    //console.log("added div in sign doc 25");

    $("#picker25").colorPick({
      'initialColor': palette[9],
      'palette': palette,
      'onColorSelected': function () {
        //console.log("Selected color: " + this.color)
        this.element.css({ 'backgroundColor': this.color, 'color': this.color });
        document.getElementById("product_attribute_83").value = this.color;
      }
    });
  }
})
