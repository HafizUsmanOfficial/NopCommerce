/*
** nopCommerce custom js functions
*/

var newwindow;
var wheight = 0, wwidth = 0;

function OpenWindow(query, w, h, scroll) {
  var l = (screen.width - w) / 2;
  var t = (screen.height - h) / 2;

  winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
  if (scroll) winprops += ',scrollbars=1';
  var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
  window.location.href = url;
}

function displayAjaxLoading(display) {
  if (display) {
    $('.ajax-loading-block-window').show();
  }
  else {
    $('.ajax-loading-block-window').hide('slow');
  }
}

function displayPopupNotification(message, messagetype, modal) {
  //types: success, error, warning
  var container;
  if (messagetype == 'success') {
    //success
    container = $('#dialog-notifications-success');
  }
  else if (messagetype == 'error') {
    //error
    container = $('#dialog-notifications-error');
  }
  else if (messagetype == 'warning') {
    //warning
    container = $('#dialog-notifications-warning');
  }
  else {
    //other
    container = $('#dialog-notifications-success');
  }

  //we do not encode displayed message
  var htmlcode = '';
  if ((typeof message) == 'string') {
    htmlcode = '<p>' + message + '</p>';
  } else {
    for (var i = 0; i < message.length; i++) {
      htmlcode = htmlcode + '<p>' + message[i] + '</p>';
    }
  }

  container.html(htmlcode);

  var isModal = (modal ? true : false);
  container.dialog({
    modal: isModal,
    width: 350
  });
}

function displayJoinedPopupNotifications(notes) {
  if (Object.keys(notes).length === 0) return;

  var container = $('#dialog-notifications-success');
  var htmlcode = document.createElement('div');

  for (var note in notes) {
    if (notes.hasOwnProperty(note)) {
      var messages = notes[note];

      for (var i = 0; i < messages.length; ++i) {
        var elem = document.createElement("div");
        elem.innerHTML = messages[i];
        elem.classList.add('popup-notification');
        elem.classList.add(note);

        htmlcode.append(elem);
      }
    }
  }

  container.html(htmlcode);
  container.dialog({
    width: 350,
    modal: true
  });
}

function displayPopupContentFromUrl(url, title, modal, width) {
  var isModal = (modal ? true : false);
  var targetWidth = (width ? width : 550);
  var maxHeight = $(window).height() - 20;

  $('<div></div>').load(url)
    .dialog({
      modal: isModal,
      width: targetWidth,
      maxHeight: maxHeight,
      title: title,
      close: function (event, ui) {
        $(this).dialog('destroy').remove();
      }
    });
}

function displayBarNotification(message, messagetype, timeout) {
  var notificationTimeout;

  var messages = typeof message === 'string' ? [message] : message;
  if (messages.length === 0)
    return;

  //types: success, error, warning
  var cssclass = ['success', 'error', 'warning'].indexOf(messagetype) !== -1 ? messagetype : 'success';

  //remove previous CSS classes and notifications
  $('#bar-notification')
    .removeClass('success')
    .removeClass('error')
    .removeClass('warning');
  $('.bar-notification').remove();

  //add new notifications
  var htmlcode = document.createElement('div');
  htmlcode.classList.add('bar-notification', cssclass);

  //add close button for notification
  var close = document.createElement('span');
  close.classList.add('close');
  close.setAttribute('title', document.getElementById('bar-notification').dataset.close);

  for (var i = 0; i < messages.length; i++) {
    var content = document.createElement('p');
    content.classList.add('content');
    content.innerHTML = messages[i];

    htmlcode.append(content);
  }

  htmlcode.append(close);

  $('#bar-notification')
    .append(htmlcode);

  $(htmlcode)
    .fadeIn('slow')
    .on('mouseenter', function () {
      clearTimeout(notificationTimeout);
    });

  //callback for notification removing
  var removeNoteItem = function () {
    htmlcode.remove();
  };

  $(close).on('click', function () {
    $(htmlcode).fadeOut('slow', removeNoteItem);
  });

  //timeout (if set)
  if (timeout > 0) {
    notificationTimeout = setTimeout(function () {
      $(htmlcode).fadeOut('slow', removeNoteItem);
    }, timeout);
  }
}

function htmlEncode(value) {
  return $('<div/>').text(value).html();
}

function htmlDecode(value) {
  return $('<div/>').html(value).text();
}


// CSRF (XSRF) security
function addAntiForgeryToken(data) {
  //if the object is undefined, create a new one.
  if (!data) {
    data = {};
  }
  //add token
  var tokenInput = $('input[name=__RequestVerificationToken]');
  if (tokenInput.length) {
    data.__RequestVerificationToken = tokenInput.val();
  }
  return data;
};

// Loader
let loaderDiv;

//#region doc ready
$(document).ready(function () {
  var url = window.location.href;

  let br = document.createElement("br");
  let br2 = document.createElement("br");
  let br3 = document.createElement("br");
  let br4 = document.createElement("br");


  //.. Banner addition
  var img = document.createElement("img");
  //img.src = "http://localhost:15536/Themes/DefaultClean/Content/images/banner_static.gif";
  //img.src = "http://localhost:15536/Themes/DefaultClean/Content/images/banner.gif";
  img.src = "../../Themes/DefaultClean/Content/images/banner.gif";

  //.. 0.008.4 Banner to 70% form 80%
  img.style.width = "70%"
  var e = document.getElementsByClassName("header-logo")[0];
  e.append(img);


  //#region //* Prod. page in doc ready
  if (url.lastIndexOf("/word-signs-dev") > -1) {
    console.log("Custom product");

    $(".attribute-description").hide();

    var link = document.getElementsByClassName('cart-label')[0];

    if (url.lastIndexOf("localhost") > -1) {

      //.. Loader initiation

      //loaderDiv = document.createElement("div");
      //loaderDiv.setAttribute("class", "loader");

      //let el1 = document.getElementById("product_attribute_label_6");

      //el1.append(loaderDiv);

      //var logoImg = document.createElement("img");
      //document.getElementsByClassName("loader")[0].appendChild(logoImg);

      /*
      logoImg.onload = function () {
      //ctx.drawImage(img, 5, 5);
              console.log("img loading");
      }
        */
      //logoImg.src = "https://media.geeksforgeeks.org/wp-content/uploads/20210610212340/gfglogo.png";

      //document.getElementsByClassName("loader")[0].style.display = "none";

      //. Proceed to checkout (cart page) from product page
        //. Proceed to checkout (cart page) from product page
        $('dl').append('<input type="button" id="proceed-to-checkout-button" style="width:25%; margin:5px; background-color: #248ece; height: 43px; border: none; background-color: #4ab2f1; padding: 0 24px; font-size: 15px; color: #fff; text-transform: uppercase;" type="button" value="proceed to Checkout" >');

        var co = document.getElementById("proceed-to-checkout-button");
      co.addEventListener("click", function () {
        console.log("updating");

        document.getElementById("addtocart_1_EnteredQuantity").value = document.getElementById("product_attribute_5").value;
        document.getElementsByClassName("ico-cart")[0].click();

        // Not needed here
        ////.. Top green/red bar appearance time
        //console.log("updated");
        //setTimeout(function () {
        //  console.log("waited");
        //  //link.click()
        //}, 500);

        console.log("link 2");
        //return false;
      }, false);
    };

    //. Hide product title
    document.getElementsByClassName("product-name")[0].style.display = "none";

    //. Hide price default label
    document.getElementsByClassName("product-price")[0].style.display = "none";

    //. Hide Add to Cart button, with quantity button input control part
    document.getElementById("addtocart_1_EnteredQuantity").style.display = "none"
    document.getElementsByClassName("add-to-cart")[0].style.display = "none";

    //. Hide pricing table
    document.getElementsByClassName("prices-table")[0].style.display = "none";

    //- Inputs to 75% of width, except main input
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {

      if (inputs[i].id == "product_attribute_1")
        continue

      if (inputs[i].id == "add-to-cart-button-1")
        continue

      // List of labels
      if (
        inputs[i].id == "product_attribute_6" ||
        inputs[i].id == "product_attribute_11" ||
        inputs[i].id == "product_attribute_15" ||
        inputs[i].id == "product_attribute_18" ||
        inputs[i].id == "product_attribute_21" ||
        inputs[i].id == "product_attribute_24" ||
        inputs[i].id == "product_attribute_27" ||
        inputs[i].id == "product_attribute_30" ||
        inputs[i].id == "product_attribute_33" ||
        inputs[i].id == "product_attribute_36" ||
        inputs[i].id == "product_attribute_39" ||
        inputs[i].id == "product_attribute_42" ||
        inputs[i].id == "product_attribute_45" ||
        inputs[i].id == "product_attribute_48" ||
        inputs[i].id == "product_attribute_51" ||
        inputs[i].id == "product_attribute_54" ||
        inputs[i].id == "product_attribute_57" ||
        inputs[i].id == "product_attribute_60" ||
        inputs[i].id == "product_attribute_63" ||
        inputs[i].id == "product_attribute_66" ||
        inputs[i].id == "product_attribute_69" ||
        inputs[i].id == "product_attribute_72" ||
        inputs[i].id == "product_attribute_75" ||
        inputs[i].id == "product_attribute_78" ||
        inputs[i].id == "product_attribute_81" ||
        inputs[i].id == "product_attribute_84"
      ) {
        inputs[i].style.width = "95%";
        continue
      }

      inputs[i].style.width = "75%";
    }

    document.getElementById("proceed-to-checkout-button").style.width = "25%";
  }


  //#region //- Remove sign
  function del(_id) {
    switch (_id) {
      case "del1":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_6").value = "";
          document.getElementById("product_attribute_9").value = "";
          document.getElementById("product_attribute_10").value = "";

          //document.getElementById("product_attribute_6").style.display = "none"
          //document.getElementById("product_attribute_9").style.display = "none"
          //document.getElementById("product_attribute_input_10").style.display = "none"
          //document.getElementById("del1").style.display = "none"

          hideSign1();
          updateTotal();

          break;
        }

      case "del2":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_11").value = "";
          document.getElementById("product_attribute_12").value = "";
          document.getElementById("product_attribute_13").value = "";

          hideSign2();
          updateTotal();

          //document.getElementById("product_attribute_11").style.display = "none";
          //document.getElementById("product_attribute_12").style.display = "none";
          //document.getElementById("product_attribute_13").style.display = "none";
          //document.getElementById("del2").style.display = "none"

          break;
        }

      case "del3":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_15").value = "";
          document.getElementById("product_attribute_16").value = "";
          document.getElementById("product_attribute_17").value = "";

          //document.getElementById("product_attribute_15").style.display = "none";
          //document.getElementById("product_attribute_16").style.display = "none";
          //document.getElementById("product_attribute_17").style.display = "none";
          //document.getElementById("del3").style.display = "none"

          hideSign3();
          updateTotal();

          break;
        }

      case "del4":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_18").value = "";
          document.getElementById("product_attribute_19").value = "";
          document.getElementById("product_attribute_20").value = "";

          //document.getElementById("product_attribute_18").style.display = "none";
          //document.getElementById("product_attribute_19").style.display = "none";
          //document.getElementById("product_attribute_20").style.display = "none";
          //document.getElementById("del4").style.display = "none"

          hideSign4();
          updateTotal();

          break;
        }

      case "del5":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_21").value = "";
          document.getElementById("product_attribute_22").value = "";
          document.getElementById("product_attribute_23").value = "";

          //document.getElementById("product_attribute_21").style.display = "none";
          //document.getElementById("product_attribute_22").style.display = "none";
          //document.getElementById("product_attribute_23").style.display = "none";
          //document.getElementById("del5").style.display = "none"

          hideSign5();
          updateTotal();

          break;
        }

      case "del6":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_24").value = "";
          document.getElementById("product_attribute_25").value = "";
          document.getElementById("product_attribute_26").value = "";

          //document.getElementById("product_attribute_24").style.display = "none";
          //document.getElementById("product_attribute_25").style.display = "none";
          //document.getElementById("product_attribute_26").style.display = "none";
          //document.getElementById("del6").style.display = "none"

          hideSign6();
          updateTotal();

          break;
        }

      case "del7":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_27").value = "";
          document.getElementById("product_attribute_28").value = "";
          document.getElementById("product_attribute_29").value = "";

          //document.getElementById("product_attribute_27").style.display = "none";
          //document.getElementById("product_attribute_28").style.display = "none";
          //document.getElementById("product_attribute_29").style.display = "none";
          //document.getElementById("del7").style.display = "none"

          hideSign7();
          updateTotal();

          break;
        }

      case "del8":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_30").value = "";
          document.getElementById("product_attribute_31").value = "";
          document.getElementById("product_attribute_32").value = "";

          //document.getElementById("product_attribute_30").style.display = "none";
          //document.getElementById("product_attribute_31").style.display = "none";
          //document.getElementById("product_attribute_32").style.display = "none";
          //document.getElementById("del8").style.display = "none"

          hideSign8();
          updateTotal();

          break;
        }

      case "del9":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_33").value = "";
          document.getElementById("product_attribute_34").value = "";
          document.getElementById("product_attribute_35").value = "";

          //document.getElementById("product_attribute_33").style.display = "none";
          //document.getElementById("product_attribute_34").style.display = "none";
          //document.getElementById("product_attribute_35").style.display = "none";
          //document.getElementById("del9").style.display = "none"

          hideSign9();
          updateTotal();

          break;
        }

      case "del10":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_36").value = "";
          document.getElementById("product_attribute_37").value = "";
          document.getElementById("product_attribute_38").value = "";

          //document.getElementById("product_attribute_36").style.display = "none";
          //document.getElementById("product_attribute_37").style.display = "none";
          //document.getElementById("product_attribute_38").style.display = "none";
          //document.getElementById("del10").style.display = "none"

          hideSign10();
          updateTotal();

          break;
        }

      case "del11":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_39").value = "";
          document.getElementById("product_attribute_40").value = "";
          document.getElementById("product_attribute_41").value = "";

          //document.getElementById("product_attribute_39").style.display = "none";
          //document.getElementById("product_attribute_40").style.display = "none";
          //document.getElementById("product_attribute_41").style.display = "none";
          //document.getElementById("del11").style.display = "none"

          hideSign11();
          updateTotal();

          break;
        }

      case "del12":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_42").value = "";
          document.getElementById("product_attribute_43").value = "";
          document.getElementById("product_attribute_44").value = "";

          //document.getElementById("product_attribute_42").style.display = "none";
          //document.getElementById("product_attribute_43").style.display = "none";
          //document.getElementById("product_attribute_44").style.display = "none";
          //document.getElementById("del12").style.display = "none"

          hideSign12();
          updateTotal();

          break;
        }

      case "del13":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_45").value = "";
          document.getElementById("product_attribute_46").value = "";
          document.getElementById("product_attribute_47").value = "";

          //document.getElementById("product_attribute_45").style.display = "none";
          //document.getElementById("product_attribute_46").style.display = "none";
          //document.getElementById("product_attribute_47").style.display = "none";
          //document.getElementById("del13").style.display = "none"

          hideSign13();
          updateTotal();

          break;
        }

      case "del14":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_48").value = "";
          document.getElementById("product_attribute_49").value = "";
          document.getElementById("product_attribute_50").value = "";

          //document.getElementById("product_attribute_48").style.display = "none";
          //document.getElementById("product_attribute_49").style.display = "none";
          //document.getElementById("product_attribute_50").style.display = "none";
          //document.getElementById("del14").style.display = "none"

          hideSign14();
          updateTotal();

          break;
        }

      case "del15":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_51").value = "";
          document.getElementById("product_attribute_52").value = "";
          document.getElementById("product_attribute_53").value = "";

          //document.getElementById("product_attribute_51").style.display = "none";
          //document.getElementById("product_attribute_52").style.display = "none";
          //document.getElementById("product_attribute_53").style.display = "none";
          //document.getElementById("del15").style.display = "none"

          hideSign15();
          updateTotal();

          break;
        }

      case "del16":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_54").value = "";
          document.getElementById("product_attribute_55").value = "";
          document.getElementById("product_attribute_56").value = "";

          //document.getElementById("product_attribute_54").style.display = "none";
          //document.getElementById("product_attribute_55").style.display = "none";
          //document.getElementById("product_attribute_56").style.display = "none";
          //document.getElementById("del16").style.display = "none"

          hideSign16();
          updateTotal();

          break;
        }

      case "del17":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_57").value = "";
          document.getElementById("product_attribute_58").value = "";
          document.getElementById("product_attribute_59").value = "";

          //document.getElementById("product_attribute_57").style.display = "none";
          //document.getElementById("product_attribute_58").style.display = "none";
          //document.getElementById("product_attribute_59").style.display = "none";
          //document.getElementById("del17").style.display = "none"

          hideSign17();
          updateTotal();

          break;
        }

      case "del18":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_60").value = "";
          document.getElementById("product_attribute_61").value = "";
          document.getElementById("product_attribute_62").value = "";

          //document.getElementById("product_attribute_60").style.display = "none";
          //document.getElementById("product_attribute_61").style.display = "none";
          //document.getElementById("product_attribute_62").style.display = "none";
          //document.getElementById("del18").style.display = "none"

          hideSign18();
          updateTotal();

          break;
        }

      case "del19":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_63").value = "";
          document.getElementById("product_attribute_64").value = "";
          document.getElementById("product_attribute_65").value = "";

          //document.getElementById("product_attribute_63").style.display = "none";
          //document.getElementById("product_attribute_64").style.display = "none";
          //document.getElementById("product_attribute_65").style.display = "none";
          //document.getElementById("del19").style.display = "none"

          hideSign19();
          updateTotal();

          break;
        }

      case "del20":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_66").value = "";
          document.getElementById("product_attribute_67").value = "";
          document.getElementById("product_attribute_68").value = "";

          //document.getElementById("product_attribute_66").style.display = "none";
          //document.getElementById("product_attribute_67").style.display = "none";
          //document.getElementById("product_attribute_68").style.display = "none";
          //document.getElementById("del20").style.display = "none"

          hideSign20();
          updateTotal();

          break;
        }

      case "del21":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_69").value = "";
          document.getElementById("product_attribute_70").value = "";
          document.getElementById("product_attribute_71").value = "";

          //document.getElementById("product_attribute_69").style.display = "none";
          //document.getElementById("product_attribute_70").style.display = "none";
          //document.getElementById("product_attribute_71").style.display = "none";
          //document.getElementById("del21").style.display = "none"

          hideSign21();
          updateTotal();

          break;
        }

      case "del22":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_72").value = "";
          document.getElementById("product_attribute_73").value = "";
          document.getElementById("product_attribute_74").value = "";

          //document.getElementById("product_attribute_72").style.display = "none";
          //document.getElementById("product_attribute_73").style.display = "none";
          //document.getElementById("product_attribute_74").style.display = "none";
          //document.getElementById("del22").style.display = "none"

          hideSign22();
          updateTotal();

          break;
        }

      case "del23":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_75").value = "";
          document.getElementById("product_attribute_76").value = "";
          document.getElementById("product_attribute_77").value = "";

          hideSign23();
          updateTotal();

          break;
        }

      case "del24":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_78").value = "";
          document.getElementById("product_attribute_79").value = "";
          document.getElementById("product_attribute_80").value = "";

          hideSign24();
          updateTotal();

          break;
        }

      case "del25":
        {
          console.log("Removing: " + _id);

          document.getElementById("product_attribute_81").value = "";
          document.getElementById("product_attribute_82").value = "";
          document.getElementById("product_attribute_83").value = "";

          hideSign25();
          updateTotal();

          break;
        }
    }
  }
  //#endregion //- Remove sign


  // Adds text, initial quantity
  //.. Adding button event listener, resolving page reloading issue
    function AddText(e) {
      //Usman Comment
      debugger
    console.log("Add text");
    console.log("Add text");
    e.preventDefault();
    //return false;

    //. In case label text to add has no value
    if (!document.getElementById("product_attribute_1").value) {
      //.. 0.009.1 No dialog
      //alert("Please enter text to make label");
      return false;
    }

    //. Check which last sign's controls are populated, enter new value to add them
    // 1
    if (!document.getElementById("product_attribute_6").value) {
      document.getElementById("product_attribute_6").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_9").value = "1";
      showSign1();
    }

    // 2
    else if (!document.getElementById("product_attribute_11").value) {
      document.getElementById("product_attribute_11").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_12").value = "1";
      showSign2();
    }

    else if (!document.getElementById("product_attribute_15").value) {
      document.getElementById("product_attribute_15").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_16").value = "1";
      showSign3();
    }

    else if (!document.getElementById("product_attribute_18").value) {
      document.getElementById("product_attribute_18").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_19").value = "1";
      showSign4();
    }

    //5
    else if (!document.getElementById("product_attribute_21").value) {
      document.getElementById("product_attribute_21").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_22").value = "1";
      showSign5();
    }

    else if (!document.getElementById("product_attribute_24").value) {
      document.getElementById("product_attribute_24").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_25").value = "1";
      showSign6();

      DistFromCount();
    }

    else if (!document.getElementById("product_attribute_27").value) {
      document.getElementById("product_attribute_27").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_28").value = "1";
      showSign7();
    }

    else if (!document.getElementById("product_attribute_30").value) {
        //Usman Comment
        debugger
      document.getElementById("product_attribute_30").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_31").value = "1";
      showSign8();
    }

    else if (!document.getElementById("product_attribute_33").value) {
      document.getElementById("product_attribute_33").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_34").value = "1";
      showSign9();
    }

    // 10
    else if (!document.getElementById("product_attribute_36").value) {
      document.getElementById("product_attribute_36").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_37").value = "1";

      //.. Scrollability option (fast scroll)
      //location.hash = "product_attribute_36";

      showSign10();
    }

    else if (!document.getElementById("product_attribute_39").value) {
      document.getElementById("product_attribute_39").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_40").value = "1";
      showSign11();
    }

    else if (!document.getElementById("product_attribute_42").value) {
      document.getElementById("product_attribute_42").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_43").value = "1";
      showSign12();
    }

    else if (!document.getElementById("product_attribute_45").value) {
      document.getElementById("product_attribute_45").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_46").value = "1";
      showSign13();
    }

    else if (!document.getElementById("product_attribute_48").value) {
      document.getElementById("product_attribute_48").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_49").value = "1";
      showSign14();
    }

    else if (!document.getElementById("product_attribute_51").value) {
      document.getElementById("product_attribute_51").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_52").value = "1";
      showSign15();
    }

    else if (!document.getElementById("product_attribute_54").value) {
      document.getElementById("product_attribute_54").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_55").value = "1";
      showSign16();
    }

    else if (!document.getElementById("product_attribute_57").value) {
      document.getElementById("product_attribute_57").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_58").value = "1";
      showSign17();
    }

    else if (!document.getElementById("product_attribute_60").value) {
      document.getElementById("product_attribute_60").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_61").value = "1";
      showSign18();
    }

    else if (!document.getElementById("product_attribute_63").value) {
      document.getElementById("product_attribute_63").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_64").value = "1";
      showSign19();
    }

    // 20
    else if (!document.getElementById("product_attribute_66").value) {
      document.getElementById("product_attribute_66").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_67").value = "1";
      showSign20();
    }

    else if (!document.getElementById("product_attribute_69").value) {
      document.getElementById("product_attribute_69").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_70").value = "1";
      showSign21();
    }

    else if (!document.getElementById("product_attribute_72").value) {
      document.getElementById("product_attribute_72").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_73").value = "1";
      showSign22();
    }

    else if (!document.getElementById("product_attribute_75").value) {
      document.getElementById("product_attribute_75").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_76").value = "1";
      showSign23();
    }

    else if (!document.getElementById("product_attribute_78").value) {
      document.getElementById("product_attribute_78").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_79").value = "1";
      showSign24();
    }

    // 25
    else if (!document.getElementById("product_attribute_81").value) {
      document.getElementById("product_attribute_81").value = document.getElementById("product_attribute_1").value;
      document.getElementById("product_attribute_82").value = "1";
      showSign25();
    }

    document.getElementById("product_attribute_1").value = "";

    lbBfPrwOnAdd();

    //.. Scroll bottom
    var messageBody = document.querySelector('.scrolldiv');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    updateTotal();
  };
  // Adds text, initial quantity


  function updateTotal() {
    console.log("Updating total");
      //Usman Comment
      debugger
    document.getElementById("product_attribute_5").value =
      (document.getElementById("product_attribute_9").value ? parseInt(document.getElementById("product_attribute_9").value) : 0) +
      (document.getElementById("product_attribute_12").value ? parseInt(document.getElementById("product_attribute_12").value) : 0) +
      (document.getElementById("product_attribute_16").value ? parseInt(document.getElementById("product_attribute_16").value) : 0) +
      (document.getElementById("product_attribute_19").value ? parseInt(document.getElementById("product_attribute_19").value) : 0) +
      (document.getElementById("product_attribute_22").value ? parseInt(document.getElementById("product_attribute_22").value) : 0) +
      (document.getElementById("product_attribute_25").value ? parseInt(document.getElementById("product_attribute_25").value) : 0) +
      (document.getElementById("product_attribute_28").value ? parseInt(document.getElementById("product_attribute_28").value) : 0) +
      (document.getElementById("product_attribute_31").value ? parseInt(document.getElementById("product_attribute_31").value) : 0) +
      (document.getElementById("product_attribute_34").value ? parseInt(document.getElementById("product_attribute_34").value) : 0) +
      (document.getElementById("product_attribute_37").value ? parseInt(document.getElementById("product_attribute_37").value) : 0) +
      (document.getElementById("product_attribute_40").value ? parseInt(document.getElementById("product_attribute_40").value) : 0) +
      (document.getElementById("product_attribute_43").value ? parseInt(document.getElementById("product_attribute_43").value) : 0) +
      (document.getElementById("product_attribute_46").value ? parseInt(document.getElementById("product_attribute_46").value) : 0) +
      (document.getElementById("product_attribute_49").value ? parseInt(document.getElementById("product_attribute_49").value) : 0) +
      (document.getElementById("product_attribute_52").value ? parseInt(document.getElementById("product_attribute_52").value) : 0) +
      (document.getElementById("product_attribute_55").value ? parseInt(document.getElementById("product_attribute_55").value) : 0) +
      (document.getElementById("product_attribute_58").value ? parseInt(document.getElementById("product_attribute_58").value) : 0) +
      (document.getElementById("product_attribute_61").value ? parseInt(document.getElementById("product_attribute_61").value) : 0) +
      (document.getElementById("product_attribute_64").value ? parseInt(document.getElementById("product_attribute_64").value) : 0) +
      (document.getElementById("product_attribute_67").value ? parseInt(document.getElementById("product_attribute_67").value) : 0) +
      (document.getElementById("product_attribute_70").value ? parseInt(document.getElementById("product_attribute_70").value) : 0) +
      (document.getElementById("product_attribute_73").value ? parseInt(document.getElementById("product_attribute_73").value) : 0) +
      (document.getElementById("product_attribute_76").value ? parseInt(document.getElementById("product_attribute_76").value) : 0) +
      (document.getElementById("product_attribute_79").value ? parseInt(document.getElementById("product_attribute_79").value) : 0) +
      (document.getElementById("product_attribute_82").value ? parseInt(document.getElementById("product_attribute_82").value) : 0);

    //.. Set value of an input element
    document.getElementById("addtocart_1_EnteredQuantity").value = document.getElementById("product_attribute_5").value;

    //if ($(".cart-qty").text().lastIndexOf('(0)') > -1) {
    console.log("Empty cart, updating");

    //. Updating cart, flyout cart quantity and price
    UpdateCartQty();
    //}

    console.log("Quantity: " + document.getElementById("product_attribute_5").value);
  }

  function UpdateCartQty() {
    //console.log(Date.now());
    setTimeout(function () {
      $("#add-to-cart-button-1").click()
      //console.log(Date.now());
      return false;
    }, 500);

    console.log("Updating cart and flyout cart qty, price.");

  }

  var currentUrl2 = window.location.href;

  if (currentUrl2.lastIndexOf("/word-signs-dev") > -1) {

    //#region // End scroll
    //.. Scrollable controls - Start
    var div = document.createElement('div');
    div.className = 'scrolldiv';


    //TODO: Null check at adding to Cart, Jun 7, 22
    // Uncaught TypeError: dd_pai6 is null
    //1 
    var dd_pai6 = document.querySelector("#product_attribute_input_6");
    dd_pai6.parentNode.insertBefore(div, dd_pai6);
    div.appendChild(dd_pai6);

    var dt_pal9 = document.querySelector("#product_attribute_label_9");
    dt_pal9.parentNode.insertBefore(div, dt_pal9);
    div.appendChild(dt_pal9);

    var dd_pai9 = document.querySelector("#product_attribute_input_9");
    dd_pai9.parentNode.insertBefore(div, dd_pai9);
    div.appendChild(dd_pai9);

    var dt_pal10 = document.querySelector("#product_attribute_label_10");
    dt_pal10.parentNode.insertBefore(div, dt_pal10);
    div.appendChild(dt_pal10);

    var dd_pai10 = document.querySelector("#product_attribute_input_10");
    dd_pai10.parentNode.insertBefore(div, dd_pai10);
    div.appendChild(dd_pai10);

    //var i_del1 = document.querySelector("#del1");
    //i_del1.parentNode.insertBefore(div, i_del1);
    //div.appendChild(i_del1);


    //2 11-13
    var dt_pal11 = document.querySelector("#product_attribute_label_11");
    dt_pal11.parentNode.insertBefore(div, dt_pal11);
    div.appendChild(dt_pal11);

    var dd_pai11 = document.querySelector("#product_attribute_input_11");
    dd_pai11.parentNode.insertBefore(div, dd_pai11);
    div.appendChild(dd_pai11);

    var dt_pal12 = document.querySelector("#product_attribute_label_12");
    dt_pal12.parentNode.insertBefore(div, dt_pal12);
    div.appendChild(dt_pal12);

    var dd_pai12 = document.querySelector("#product_attribute_input_12");
    dd_pai12.parentNode.insertBefore(div, dd_pai12);
    div.appendChild(dd_pai12);

    var dt_pal13 = document.querySelector("#product_attribute_label_13");
    dt_pal13.parentNode.insertBefore(div, dt_pal13);
    div.appendChild(dt_pal13);

    var dd_pai13 = document.querySelector("#product_attribute_input_13");
    dd_pai13.parentNode.insertBefore(div, dd_pai13);
    div.appendChild(dd_pai13);


    //3 15-17
    var dt_pal15 = document.querySelector("#product_attribute_label_15");
    dt_pal15.parentNode.insertBefore(div, dt_pal15);
    div.appendChild(dt_pal15);

    var dd_pai15 = document.querySelector("#product_attribute_input_15");
    dd_pai15.parentNode.insertBefore(div, dd_pai15);
    div.appendChild(dd_pai15);

    var dt_pal16 = document.querySelector("#product_attribute_label_16");
    dt_pal16.parentNode.insertBefore(div, dt_pal16);
    div.appendChild(dt_pal16);

    var dd_pai16 = document.querySelector("#product_attribute_input_16");
    dd_pai16.parentNode.insertBefore(div, dd_pai16);
    div.appendChild(dd_pai16);

    var dt_pal17 = document.querySelector("#product_attribute_label_17");
    dt_pal17.parentNode.insertBefore(div, dt_pal17);
    div.appendChild(dt_pal17);

    var dd_pai17 = document.querySelector("#product_attribute_input_17");
    dd_pai17.parentNode.insertBefore(div, dd_pai17);
    div.appendChild(dd_pai17);


    //4 18-20
    var dt_pal18 = document.querySelector("#product_attribute_label_18");
    dt_pal18.parentNode.insertBefore(div, dt_pal18);
    div.appendChild(dt_pal18);

    var dd_pai18 = document.querySelector("#product_attribute_input_18");
    dd_pai18.parentNode.insertBefore(div, dd_pai18);
    div.appendChild(dd_pai18);

    var dt_pal19 = document.querySelector("#product_attribute_label_19");
    dt_pal19.parentNode.insertBefore(div, dt_pal19);
    div.appendChild(dt_pal19);

    var dd_pai19 = document.querySelector("#product_attribute_input_19");
    dd_pai19.parentNode.insertBefore(div, dd_pai19);
    div.appendChild(dd_pai19);

    var dt_pal20 = document.querySelector("#product_attribute_label_20");
    dt_pal20.parentNode.insertBefore(div, dt_pal20);
    div.appendChild(dt_pal20);

    var dd_pai20 = document.querySelector("#product_attribute_input_20");
    dd_pai20.parentNode.insertBefore(div, dd_pai20);
    div.appendChild(dd_pai20);


    //5 21-23
    var dt_pal21 = document.querySelector("#product_attribute_label_21");
    dt_pal21.parentNode.insertBefore(div, dt_pal21);
    div.appendChild(dt_pal21);

    var dd_pai21 = document.querySelector("#product_attribute_input_21");
    dd_pai21.parentNode.insertBefore(div, dd_pai21);
    div.appendChild(dd_pai21);

    var dt_pal22 = document.querySelector("#product_attribute_label_22");
    dt_pal22.parentNode.insertBefore(div, dt_pal22);
    div.appendChild(dt_pal22);

    var dd_pai22 = document.querySelector("#product_attribute_input_22");
    dd_pai22.parentNode.insertBefore(div, dd_pai22);
    div.appendChild(dd_pai22);

    var dt_pal23 = document.querySelector("#product_attribute_label_23");
    dt_pal23.parentNode.insertBefore(div, dt_pal23);
    div.appendChild(dt_pal23);

    var dd_pai23 = document.querySelector("#product_attribute_input_23");
    dd_pai23.parentNode.insertBefore(div, dd_pai23);
    div.appendChild(dd_pai23);


    //6 24-26
    var dt_pal24 = document.querySelector("#product_attribute_label_24");
    dt_pal24.parentNode.insertBefore(div, dt_pal24);
    div.appendChild(dt_pal24);

    var dd_pai24 = document.querySelector("#product_attribute_input_24");
    dd_pai24.parentNode.insertBefore(div, dd_pai24);
    div.appendChild(dd_pai24);

    var dt_pal25 = document.querySelector("#product_attribute_label_25");
    dt_pal25.parentNode.insertBefore(div, dt_pal25);
    div.appendChild(dt_pal25);

    var dd_pai25 = document.querySelector("#product_attribute_input_25");
    dd_pai25.parentNode.insertBefore(div, dd_pai25);
    div.appendChild(dd_pai25);

    var dt_pal26 = document.querySelector("#product_attribute_label_26");
    dt_pal26.parentNode.insertBefore(div, dt_pal26);
    div.appendChild(dt_pal26);

    var dd_pai26 = document.querySelector("#product_attribute_input_26");
    dd_pai26.parentNode.insertBefore(div, dd_pai26);
    div.appendChild(dd_pai26);

    $("#product_attribute_label_24").hide();
    $("#product_attribute_label_25").hide();
    $("#product_attribute_label_26").hide();


    //7 27-29
    var dt_pal27 = document.querySelector("#product_attribute_label_27");
    dt_pal27.parentNode.insertBefore(div, dt_pal27);
    div.appendChild(dt_pal27);

    var dd_pai27 = document.querySelector("#product_attribute_input_27");
    dd_pai27.parentNode.insertBefore(div, dd_pai27);
    div.appendChild(dd_pai27);

    var dt_pal28 = document.querySelector("#product_attribute_label_28");
    dt_pal28.parentNode.insertBefore(div, dt_pal28);
    div.appendChild(dt_pal28);

    var dd_pai28 = document.querySelector("#product_attribute_input_28");
    dd_pai28.parentNode.insertBefore(div, dd_pai28);
    div.appendChild(dd_pai28);

    var dt_pal29 = document.querySelector("#product_attribute_label_29");
    dt_pal29.parentNode.insertBefore(div, dt_pal29);
    div.appendChild(dt_pal29);

    var dd_pai29 = document.querySelector("#product_attribute_input_29");
    dd_pai29.parentNode.insertBefore(div, dd_pai29);
    div.appendChild(dd_pai29);


    //8 30-32
    var dt_pal30 = document.querySelector("#product_attribute_label_30");
    dt_pal30.parentNode.insertBefore(div, dt_pal30);
    div.appendChild(dt_pal30);

    var dd_pai30 = document.querySelector("#product_attribute_input_30");
    dd_pai30.parentNode.insertBefore(div, dd_pai30);
    div.appendChild(dd_pai30);

    var dt_pal31 = document.querySelector("#product_attribute_label_31");
    dt_pal31.parentNode.insertBefore(div, dt_pal31);
    div.appendChild(dt_pal31);

    var dd_pai31 = document.querySelector("#product_attribute_input_31");
    dd_pai31.parentNode.insertBefore(div, dd_pai31);
    div.appendChild(dd_pai31);

    var dt_pal32 = document.querySelector("#product_attribute_label_32");
    dt_pal32.parentNode.insertBefore(div, dt_pal32);
    div.appendChild(dt_pal32);

    var dd_pai32 = document.querySelector("#product_attribute_input_32");
    dd_pai32.parentNode.insertBefore(div, dd_pai32);
    div.appendChild(dd_pai32);


    //9 33-35
    var dt_pal33 = document.querySelector("#product_attribute_label_33");
    dt_pal33.parentNode.insertBefore(div, dt_pal33);
    div.appendChild(dt_pal33);

    var dd_pai33 = document.querySelector("#product_attribute_input_33");
    dd_pai33.parentNode.insertBefore(div, dd_pai33);
    div.appendChild(dd_pai33);

    var dt_pal34 = document.querySelector("#product_attribute_label_34");
    dt_pal34.parentNode.insertBefore(div, dt_pal34);
    div.appendChild(dt_pal34);

    var dd_pai34 = document.querySelector("#product_attribute_input_34");
    dd_pai34.parentNode.insertBefore(div, dd_pai34);
    div.appendChild(dd_pai34);

    var dt_pal35 = document.querySelector("#product_attribute_label_35");
    dt_pal35.parentNode.insertBefore(div, dt_pal35);
    div.appendChild(dt_pal35);

    var dd_pai35 = document.querySelector("#product_attribute_input_35");
    dd_pai35.parentNode.insertBefore(div, dd_pai35);
    div.appendChild(dd_pai35);


    //10 36-38
    var dt_pal36 = document.querySelector("#product_attribute_label_36");
    dt_pal36.parentNode.insertBefore(div, dt_pal36);
    div.appendChild(dt_pal36);

    var dd_pai36 = document.querySelector("#product_attribute_input_36");
    dd_pai36.parentNode.insertBefore(div, dd_pai36);
    div.appendChild(dd_pai36);

    var dt_pal37 = document.querySelector("#product_attribute_label_37");
    dt_pal37.parentNode.insertBefore(div, dt_pal37);
    div.appendChild(dt_pal37);

    var dd_pai37 = document.querySelector("#product_attribute_input_37");
    dd_pai37.parentNode.insertBefore(div, dd_pai37);
    div.appendChild(dd_pai37);

    var dt_pal38 = document.querySelector("#product_attribute_label_38");
    dt_pal38.parentNode.insertBefore(div, dt_pal38);
    div.appendChild(dt_pal38);

    var dd_pai38 = document.querySelector("#product_attribute_input_38");
    dd_pai38.parentNode.insertBefore(div, dd_pai38);
    div.appendChild(dd_pai38);


    //11 39-41
    var dt_pal39 = document.querySelector("#product_attribute_label_39");
    dt_pal39.parentNode.insertBefore(div, dt_pal39);
    div.appendChild(dt_pal39);

    var dd_pai39 = document.querySelector("#product_attribute_input_39");
    dd_pai39.parentNode.insertBefore(div, dd_pai39);
    div.appendChild(dd_pai39);

    var dt_pal40 = document.querySelector("#product_attribute_label_40");
    dt_pal40.parentNode.insertBefore(div, dt_pal40);
    div.appendChild(dt_pal40);

    var dd_pai40 = document.querySelector("#product_attribute_input_40");
    dd_pai40.parentNode.insertBefore(div, dd_pai40);
    div.appendChild(dd_pai40);

    var dt_pal41 = document.querySelector("#product_attribute_label_41");
    dt_pal41.parentNode.insertBefore(div, dt_pal41);
    div.appendChild(dt_pal41);

    var dd_pai41 = document.querySelector("#product_attribute_input_41");
    dd_pai41.parentNode.insertBefore(div, dd_pai41);
    div.appendChild(dd_pai41);


    //12 42-44
    var dt_pal42 = document.querySelector("#product_attribute_label_42");
    dt_pal42.parentNode.insertBefore(div, dt_pal42);
    div.appendChild(dt_pal42);

    var dd_pai42 = document.querySelector("#product_attribute_input_42");
    dd_pai42.parentNode.insertBefore(div, dd_pai42);
    div.appendChild(dd_pai42);

    var dt_pal43 = document.querySelector("#product_attribute_label_43");
    dt_pal43.parentNode.insertBefore(div, dt_pal43);
    div.appendChild(dt_pal43);

    var dd_pai43 = document.querySelector("#product_attribute_input_43");
    dd_pai43.parentNode.insertBefore(div, dd_pai43);
    div.appendChild(dd_pai43);

    var dt_pal44 = document.querySelector("#product_attribute_label_44");
    dt_pal44.parentNode.insertBefore(div, dt_pal44);
    div.appendChild(dt_pal44);

    var dd_pai44 = document.querySelector("#product_attribute_input_44");
    dd_pai44.parentNode.insertBefore(div, dd_pai44);
    div.appendChild(dd_pai44);


    //13 45-47
    var dt_pal45 = document.querySelector("#product_attribute_label_45");
    dt_pal45.parentNode.insertBefore(div, dt_pal45);
    div.appendChild(dt_pal45);

    var dd_pai45 = document.querySelector("#product_attribute_input_45");
    dd_pai45.parentNode.insertBefore(div, dd_pai45);
    div.appendChild(dd_pai45);

    var dt_pal46 = document.querySelector("#product_attribute_label_46");
    dt_pal46.parentNode.insertBefore(div, dt_pal46);
    div.appendChild(dt_pal46);

    var dd_pai46 = document.querySelector("#product_attribute_input_46");
    dd_pai46.parentNode.insertBefore(div, dd_pai46);
    div.appendChild(dd_pai46);

    var dt_pal47 = document.querySelector("#product_attribute_label_47");
    dt_pal47.parentNode.insertBefore(div, dt_pal47);
    div.appendChild(dt_pal47);

    var dd_pai47 = document.querySelector("#product_attribute_input_47");
    dd_pai47.parentNode.insertBefore(div, dd_pai47);
    div.appendChild(dd_pai47);


    //14 48-50
    var dt_pal48 = document.querySelector("#product_attribute_label_48");
    dt_pal48.parentNode.insertBefore(div, dt_pal48);
    div.appendChild(dt_pal48);

    var dd_pai48 = document.querySelector("#product_attribute_input_48");
    dd_pai48.parentNode.insertBefore(div, dd_pai48);
    div.appendChild(dd_pai48);

    var dt_pal49 = document.querySelector("#product_attribute_label_49");
    dt_pal49.parentNode.insertBefore(div, dt_pal49);
    div.appendChild(dt_pal49);

    var dd_pai49 = document.querySelector("#product_attribute_input_49");
    dd_pai49.parentNode.insertBefore(div, dd_pai49);
    div.appendChild(dd_pai49);

    var dt_pal50 = document.querySelector("#product_attribute_label_50");
    dt_pal50.parentNode.insertBefore(div, dt_pal50);
    div.appendChild(dt_pal50);

    var dd_pai50 = document.querySelector("#product_attribute_input_50");
    dd_pai50.parentNode.insertBefore(div, dd_pai50);
    div.appendChild(dd_pai50);


    //15 51-53
    var dt_pal51 = document.querySelector("#product_attribute_label_51");
    dt_pal51.parentNode.insertBefore(div, dt_pal51);
    div.appendChild(dt_pal51);

    var dd_pai51 = document.querySelector("#product_attribute_input_51");
    dd_pai51.parentNode.insertBefore(div, dd_pai51);
    div.appendChild(dd_pai51);

    var dt_pal52 = document.querySelector("#product_attribute_label_52");
    dt_pal52.parentNode.insertBefore(div, dt_pal52);
    div.appendChild(dt_pal52);

    var dd_pai52 = document.querySelector("#product_attribute_input_52");
    dd_pai52.parentNode.insertBefore(div, dd_pai52);
    div.appendChild(dd_pai52);

    var dt_pal53 = document.querySelector("#product_attribute_label_53");
    dt_pal53.parentNode.insertBefore(div, dt_pal53);
    div.appendChild(dt_pal53);

    var dd_pai53 = document.querySelector("#product_attribute_input_53");
    dd_pai53.parentNode.insertBefore(div, dd_pai53);
    div.appendChild(dd_pai53);


    //16 54-56
    var dt_pal54 = document.querySelector("#product_attribute_label_54");
    dt_pal54.parentNode.insertBefore(div, dt_pal54);
    div.appendChild(dt_pal54);

    var dd_pai54 = document.querySelector("#product_attribute_input_54");
    dd_pai54.parentNode.insertBefore(div, dd_pai54);
    div.appendChild(dd_pai54);

    var dt_pal55 = document.querySelector("#product_attribute_label_55");
    dt_pal55.parentNode.insertBefore(div, dt_pal55);
    div.appendChild(dt_pal55);

    var dd_pai55 = document.querySelector("#product_attribute_input_55");
    dd_pai55.parentNode.insertBefore(div, dd_pai55);
    div.appendChild(dd_pai55);

    var dt_pal56 = document.querySelector("#product_attribute_label_56");
    dt_pal56.parentNode.insertBefore(div, dt_pal56);
    div.appendChild(dt_pal56);

    var dd_pai56 = document.querySelector("#product_attribute_input_56");
    dd_pai56.parentNode.insertBefore(div, dd_pai56);
    div.appendChild(dd_pai56);


    //17 57-59
    var dt_pal57 = document.querySelector("#product_attribute_label_57");
    dt_pal57.parentNode.insertBefore(div, dt_pal57);
    div.appendChild(dt_pal57);

    var dd_pai57 = document.querySelector("#product_attribute_input_57");
    dd_pai57.parentNode.insertBefore(div, dd_pai57);
    div.appendChild(dd_pai57);

    var dt_pal58 = document.querySelector("#product_attribute_label_58");
    dt_pal58.parentNode.insertBefore(div, dt_pal58);
    div.appendChild(dt_pal58);

    var dd_pai58 = document.querySelector("#product_attribute_input_58");
    dd_pai58.parentNode.insertBefore(div, dd_pai58);
    div.appendChild(dd_pai58);

    var dt_pal59 = document.querySelector("#product_attribute_label_59");
    dt_pal59.parentNode.insertBefore(div, dt_pal59);
    div.appendChild(dt_pal59);

    var dd_pai59 = document.querySelector("#product_attribute_input_59");
    dd_pai59.parentNode.insertBefore(div, dd_pai59);
    div.appendChild(dd_pai59);


    //18 60-62
    var dt_pal60 = document.querySelector("#product_attribute_label_60");
    dt_pal60.parentNode.insertBefore(div, dt_pal60);
    div.appendChild(dt_pal60);

    var dd_pai60 = document.querySelector("#product_attribute_input_60");
    dd_pai60.parentNode.insertBefore(div, dd_pai60);
    div.appendChild(dd_pai60);

    var dt_pal61 = document.querySelector("#product_attribute_label_61");
    dt_pal61.parentNode.insertBefore(div, dt_pal61);
    div.appendChild(dt_pal61);

    var dd_pai61 = document.querySelector("#product_attribute_input_61");
    dd_pai61.parentNode.insertBefore(div, dd_pai61);
    div.appendChild(dd_pai61);

    var dt_pal62 = document.querySelector("#product_attribute_label_62");
    dt_pal62.parentNode.insertBefore(div, dt_pal62);
    div.appendChild(dt_pal62);

    var dd_pai62 = document.querySelector("#product_attribute_input_62");
    dd_pai62.parentNode.insertBefore(div, dd_pai62);
    div.appendChild(dd_pai62);


    //19 63-65
    var dt_pal63 = document.querySelector("#product_attribute_label_63");
    dt_pal63.parentNode.insertBefore(div, dt_pal63);
    div.appendChild(dt_pal63);

    var dd_pai63 = document.querySelector("#product_attribute_input_63");
    dd_pai63.parentNode.insertBefore(div, dd_pai63);
    div.appendChild(dd_pai63);

    var dt_pal64 = document.querySelector("#product_attribute_label_64");
    dt_pal64.parentNode.insertBefore(div, dt_pal64);
    div.appendChild(dt_pal64);

    var dd_pai64 = document.querySelector("#product_attribute_input_64");
    dd_pai64.parentNode.insertBefore(div, dd_pai64);
    div.appendChild(dd_pai64);

    var dt_pal65 = document.querySelector("#product_attribute_label_65");
    dt_pal65.parentNode.insertBefore(div, dt_pal65);
    div.appendChild(dt_pal65);

    var dd_pai65 = document.querySelector("#product_attribute_input_65");
    dd_pai65.parentNode.insertBefore(div, dd_pai65);
    div.appendChild(dd_pai65);


    //20 66-68
    var dt_pal66 = document.querySelector("#product_attribute_label_66");
    dt_pal66.parentNode.insertBefore(div, dt_pal66);
    div.appendChild(dt_pal66);

    var dd_pai66 = document.querySelector("#product_attribute_input_66");
    dd_pai66.parentNode.insertBefore(div, dd_pai66);
    div.appendChild(dd_pai66);

    var dt_pal67 = document.querySelector("#product_attribute_label_67");
    dt_pal67.parentNode.insertBefore(div, dt_pal67);
    div.appendChild(dt_pal67);

    var dd_pai67 = document.querySelector("#product_attribute_input_67");
    dd_pai67.parentNode.insertBefore(div, dd_pai67);
    div.appendChild(dd_pai67);

    var dt_pal68 = document.querySelector("#product_attribute_label_68");
    dt_pal68.parentNode.insertBefore(div, dt_pal68);
    div.appendChild(dt_pal68);

    var dd_pai68 = document.querySelector("#product_attribute_input_68");
    dd_pai68.parentNode.insertBefore(div, dd_pai68);
    div.appendChild(dd_pai68);


    //21 69-71
    var dt_pal69 = document.querySelector("#product_attribute_label_69");
    dt_pal69.parentNode.insertBefore(div, dt_pal69);
    div.appendChild(dt_pal69);

    var dd_pai69 = document.querySelector("#product_attribute_input_69");
    dd_pai69.parentNode.insertBefore(div, dd_pai69);
    div.appendChild(dd_pai69);

    var dt_pal70 = document.querySelector("#product_attribute_label_70");
    dt_pal70.parentNode.insertBefore(div, dt_pal70);
    div.appendChild(dt_pal70);

    var dd_pai70 = document.querySelector("#product_attribute_input_70");
    dd_pai70.parentNode.insertBefore(div, dd_pai70);
    div.appendChild(dd_pai70);

    var dt_pal71 = document.querySelector("#product_attribute_label_71");
    dt_pal71.parentNode.insertBefore(div, dt_pal71);
    div.appendChild(dt_pal71);

    var dd_pai71 = document.querySelector("#product_attribute_input_71");
    dd_pai71.parentNode.insertBefore(div, dd_pai71);
    div.appendChild(dd_pai71);


    //22 72-74
    var dt_pal72 = document.querySelector("#product_attribute_label_72");
    dt_pal72.parentNode.insertBefore(div, dt_pal72);
    div.appendChild(dt_pal72);

    var dd_pai72 = document.querySelector("#product_attribute_input_72");
    dd_pai72.parentNode.insertBefore(div, dd_pai72);
    div.appendChild(dd_pai72);

    var dt_pal73 = document.querySelector("#product_attribute_label_73");
    dt_pal73.parentNode.insertBefore(div, dt_pal73);
    div.appendChild(dt_pal73);

    var dd_pai73 = document.querySelector("#product_attribute_input_73");
    dd_pai73.parentNode.insertBefore(div, dd_pai73);
    div.appendChild(dd_pai73);

    var dt_pal74 = document.querySelector("#product_attribute_label_74");
    dt_pal74.parentNode.insertBefore(div, dt_pal74);
    div.appendChild(dt_pal74);

    var dd_pai74 = document.querySelector("#product_attribute_input_74");
    dd_pai74.parentNode.insertBefore(div, dd_pai74);
    div.appendChild(dd_pai74);


    //23 75-77
    var dt_pal75 = document.querySelector("#product_attribute_label_75");
    dt_pal75.parentNode.insertBefore(div, dt_pal75);
    div.appendChild(dt_pal75);

    var dd_pai75 = document.querySelector("#product_attribute_input_75");
    dd_pai75.parentNode.insertBefore(div, dd_pai75);
    div.appendChild(dd_pai75);

    var dt_pal76 = document.querySelector("#product_attribute_label_76");
    dt_pal76.parentNode.insertBefore(div, dt_pal76);
    div.appendChild(dt_pal76);

    var dd_pai76 = document.querySelector("#product_attribute_input_76");
    dd_pai76.parentNode.insertBefore(div, dd_pai76);
    div.appendChild(dd_pai76);

    var dt_pal77 = document.querySelector("#product_attribute_label_77");
    dt_pal77.parentNode.insertBefore(div, dt_pal77);
    div.appendChild(dt_pal77);

    var dd_pai77 = document.querySelector("#product_attribute_input_77");
    dd_pai77.parentNode.insertBefore(div, dd_pai77);
    div.appendChild(dd_pai77);


    //24 78-80
    var dt_pal78 = document.querySelector("#product_attribute_label_78");
    dt_pal78.parentNode.insertBefore(div, dt_pal78);
    div.appendChild(dt_pal78);

    var dd_pai78 = document.querySelector("#product_attribute_input_78");
    dd_pai78.parentNode.insertBefore(div, dd_pai78);
    div.appendChild(dd_pai78);

    var dt_pal79 = document.querySelector("#product_attribute_label_79");
    dt_pal79.parentNode.insertBefore(div, dt_pal79);
    div.appendChild(dt_pal79);

    var dd_pai79 = document.querySelector("#product_attribute_input_79");
    dd_pai79.parentNode.insertBefore(div, dd_pai79);
    div.appendChild(dd_pai79);

    var dt_pal80 = document.querySelector("#product_attribute_label_80");
    dt_pal80.parentNode.insertBefore(div, dt_pal80);
    div.appendChild(dt_pal80);

    var dd_pai80 = document.querySelector("#product_attribute_input_80");
    dd_pai80.parentNode.insertBefore(div, dd_pai80);
    div.appendChild(dd_pai80);


    //25 81-83
    var dt_pal81 = document.querySelector("#product_attribute_label_81");
    dt_pal81.parentNode.insertBefore(div, dt_pal81);
    div.appendChild(dt_pal81);

    var dd_pai81 = document.querySelector("#product_attribute_input_81");
    dd_pai81.parentNode.insertBefore(div, dd_pai81);
    div.appendChild(dd_pai81);

    var dt_pal82 = document.querySelector("#product_attribute_label_82");
    dt_pal82.parentNode.insertBefore(div, dt_pal82);
    div.appendChild(dt_pal82);

    var dd_pai82 = document.querySelector("#product_attribute_input_82");
    dd_pai82.parentNode.insertBefore(div, dd_pai82);
    div.appendChild(dd_pai82);

    var dt_pal83 = document.querySelector("#product_attribute_label_83");
    dt_pal83.parentNode.insertBefore(div, dt_pal83);
    div.appendChild(dt_pal83);

    var dd_pai83 = document.querySelector("#product_attribute_input_83");
    dd_pai83.parentNode.insertBefore(div, dd_pai83);
    div.appendChild(dd_pai83);

    DistFromCount();

    //#endregion // End scroll


    //#region // Button (del?)
    // Button (del?) addition: https://stackoverflow.com/questions/8650975/javascript-to-create-a-button-with-onclick
    //    Make it i element instead with font awesome: https://stackoverflow.com/questions/38661902/how-to-change-button-text-to-font-awesome-icon-using-jquery
    //    Font awesone trash code ref: https://fontawesome.com/v4/icon/trash
    var ed1 = document.createElement('i'); ed1.setAttribute('id', 'del1'); ed1.setAttribute('class', 'fa fa-trash');
    //-- Button after div (not inside): https://www.tutorialkart.com/javascript/how-to-insert-element-in-document-after-specific-div-element-using-javascript/
    document.getElementById("product_attribute_input_10").after(ed1);
    //-- Call a function on adEventListener: https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    ed1.addEventListener("click", function () { del(this.id) }, false);

    var ed2 = document.createElement('i'); ed2.setAttribute('id', 'del2'); ed2.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_13").after(ed2);
    ed2.addEventListener("click", function () { del(this.id) }, false);

    var ed3 = document.createElement('i'); ed3.setAttribute('id', 'del3'); ed3.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_17").after(ed3);
    ed3.addEventListener("click", function () { del(this.id) }, false);

    var ed4 = document.createElement('i'); ed4.setAttribute('id', 'del4'); ed4.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_20").after(ed4);
    ed4.addEventListener("click", function () { del(this.id) }, false);

    var ed5 = document.createElement('i'); ed5.setAttribute('id', 'del5'); ed5.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_23").after(ed5);
    ed5.addEventListener("click", function () { del(this.id) }, false);

    var ed6 = document.createElement('i'); ed6.setAttribute('id', 'del6'); ed6.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_26").after(ed6);
    ed6.addEventListener("click", function () { del(this.id) }, false);

    var ed7 = document.createElement('i'); ed7.setAttribute('id', 'del7'); ed7.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_29").after(ed7);
    ed7.addEventListener("click", function () { del(this.id) }, false);

    var ed8 = document.createElement('i'); ed8.setAttribute('id', 'del8'); ed8.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_32").after(ed8);
    ed8.addEventListener("click", function () { del(this.id) }, false);

    var ed9 = document.createElement('i'); ed9.setAttribute('id', 'del9'); ed9.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_35").after(ed9);
    ed9.addEventListener("click", function () { del(this.id) }, false);

    var ed10 = document.createElement('i'); ed10.setAttribute('id', 'del10'); ed10.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_38").after(ed10);
    ed10.addEventListener("click", function () { del(this.id) }, false);

    var ed11 = document.createElement('i'); ed11.setAttribute('id', 'del11'); ed11.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_41").after(ed11);
    ed11.addEventListener("click", function () { del(this.id) }, false);

    var ed12 = document.createElement('i'); ed12.setAttribute('id', 'del12'); ed12.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_44").after(ed12);
    ed12.addEventListener("click", function () { del(this.id) }, false);

    var ed13 = document.createElement('i'); ed13.setAttribute('id', 'del13'); ed13.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_47").after(ed13);
    ed13.addEventListener("click", function () { del(this.id) }, false);

    var ed14 = document.createElement('i'); ed14.setAttribute('id', 'del14'); ed14.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_50").after(ed14);
    ed14.addEventListener("click", function () { del(this.id) }, false);

    var ed15 = document.createElement('i'); ed15.setAttribute('id', 'del15'); ed15.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_53").after(ed15);
    ed15.addEventListener("click", function () { del(this.id) }, false);

    var ed16 = document.createElement('i'); ed16.setAttribute('id', 'del16'); ed16.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_56").after(ed16);
    ed16.addEventListener("click", function () { del(this.id) }, false);

    var ed17 = document.createElement('i'); ed17.setAttribute('id', 'del17'); ed17.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_59").after(ed17);
    ed17.addEventListener("click", function () { del(this.id) }, false);

    var ed18 = document.createElement('i'); ed18.setAttribute('id', 'del18'); ed18.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_62").after(ed18);
    ed18.addEventListener("click", function () { del(this.id) }, false);

    var ed19 = document.createElement('i'); ed19.setAttribute('id', 'del19'); ed19.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_65").after(ed19);
    ed19.addEventListener("click", function () { del(this.id) }, false);

    var ed20 = document.createElement('i'); ed20.setAttribute('id', 'del20'); ed20.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_68").after(ed20);
    ed20.addEventListener("click", function () { del(this.id) }, false);

    var ed21 = document.createElement('i'); ed21.setAttribute('id', 'del21'); ed21.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_71").after(ed21);
    ed21.addEventListener("click", function () { del(this.id) }, false);

    var ed22 = document.createElement('i'); ed22.setAttribute('id', 'del22'); ed22.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_74").after(ed22);
    ed22.addEventListener("click", function () { del(this.id) }, false);

    var ed23 = document.createElement('i'); ed23.setAttribute('id', 'del23'); ed23.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_77").after(ed23);
    ed23.addEventListener("click", function () { del(this.id) }, false);

    var ed24 = document.createElement('i'); ed24.setAttribute('id', 'del24'); ed24.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_80").after(ed24);
    ed24.addEventListener("click", function () { del(this.id) }, false);

    var ed25 = document.createElement('i'); ed25.setAttribute('id', 'del25'); ed25.setAttribute('class', 'fa fa-trash');
    document.getElementById("product_attribute_input_83").after(ed25);
    ed25.addEventListener("click", function () { del(this.id) }, false);
    //#endregion // Button (del?)


    // MainInput
    // Attribute: 001_MainInput
    $("#product_attribute_label_1").hide();
    // Style added inline: height:72px;width:60%
    // Main text input larger
    //.. 0.008.4 main input height
    document.getElementById("product_attribute_1").setAttribute("style", "height:90px;width:720px;font-size:36px;color:#777!important");

    //.. Main input placeholder color - 1 of 2
    document.getElementById("product_attribute_1").classList.add("main_text_input");

    document.getElementById("product_attribute_1").setAttribute("placeholder", "Type here and create your labels");

    //.. Main max chars to 56
    document.getElementById("product_attribute_1").setAttribute("maxlength", "56");

    var aTBtn = document.createElement('button'); aTBtn.setAttribute('id', 'aTBtn1');
    //.. 0.008.4 Add button
    aTBtn.setAttribute('style', 'width:110px;height:90px;background-color:#4ab2f1;color:white;font-size:48px;border:2px solid #777');
    ed1.setAttribute('style', 'font-size:18px;color:#CCCCCC');
    aTBtn.textContent = '+';
    document.getElementById("product_attribute_input_1").append(aTBtn);
    //ed1.addEventListener("click", function () { del(this.id) }, false);
    //aTBtn.value = "AddTextBtn1"; aTBtn.addEventListener("click", (e) => { alert("") }, false);

    aTBtn.value = "AddTextBtn1";
    aTBtn.addEventListener("click", AddText);

    //- Vertically center align button in its container
    // https://stackoverflow.com/questions/33631177/using-vertical-align-to-vertically-center-a-button-within-a-div
    document.getElementById("aTBtn1").style.verticalAlign = "middle"


    // "Main Input button" (control / product attribute removed from product). Use instead following:
    // Add button after main text input
    // Option 2 - add button
    //document.getElementById("product_attribute_input_1").innerHTML += ("<button>AddText</button>");

    // Temp (kept extra control)
    // Attribute: 003_Temp
    $("#product_attribute_label_3").hide();
    $("#product_attribute_input_3").hide();


    // LabelTotalQuantity (ketpt just a label control for quantity label in case needed (to remove?))
    // Attribute: 004_LabelTotalQuantity. Re. "Total Labels Added To Cart:" caption, not used (to use appended text). Ids: product_attribute_label_4, product_attribute_input_4
    $("#product_attribute_label_4").hide();
    $("#product_attribute_input_4").hide();

    // TotalQuantity
    // Not hidden, used for quantity label
    // Attribute: 005_TotalQuantity. Use input so it persists
    //$("#product_attribute_label_5").hide();

    document.getElementById("product_attribute_label_5").setAttribute("style", "text-align:right;float: left;width: 50%;padding:0;margin:0;font-size:14px;font-weight:normal;color:#CDCDCD!important");
    document.getElementById("product_attribute_label_5").textContent = "Total Labels Added To Cart:";
    document.getElementById("product_attribute_input_5").setAttribute("style", "text-align:left;important;float:left;width:50%;padding:0;margin:0");

    document.getElementById("product_attribute_5").setAttribute("style", "font-size:20px;color:#4ab2f1;border:0px;padding:23px");
    document.getElementById("product_attribute_5").append("<br /><br />")
    //document.getElementById("product_attribute_9").onblur="alertMe()" 



    //function myFocusFunction2() { console.log("4") }
    //var quantity1 = document.getElementById("product_attribute_9");

    let quantity01 = document.getElementById("product_attribute_9");
    let quantity02 = document.getElementById("product_attribute_12");
    let quantity03 = document.getElementById("product_attribute_16");
    let quantity04 = document.getElementById("product_attribute_19");
    let quantity05 = document.getElementById("product_attribute_22");
    let quantity06 = document.getElementById("product_attribute_25");
    let quantity07 = document.getElementById("product_attribute_28");
    let quantity08 = document.getElementById("product_attribute_31");
    let quantity09 = document.getElementById("product_attribute_34");
    let quantity10 = document.getElementById("product_attribute_37");
    let quantity11 = document.getElementById("product_attribute_40");
    let quantity12 = document.getElementById("product_attribute_43");
    let quantity13 = document.getElementById("product_attribute_46");
    let quantity14 = document.getElementById("product_attribute_49");
    let quantity15 = document.getElementById("product_attribute_52");
    let quantity16 = document.getElementById("product_attribute_55");
    let quantity17 = document.getElementById("product_attribute_58");
    let quantity18 = document.getElementById("product_attribute_61");
    let quantity19 = document.getElementById("product_attribute_64");
    let quantity20 = document.getElementById("product_attribute_67");
    let quantity21 = document.getElementById("product_attribute_70");
    let quantity22 = document.getElementById("product_attribute_73");
    let quantity23 = document.getElementById("product_attribute_76");
    let quantity24 = document.getElementById("product_attribute_79");
    let quantity25 = document.getElementById("product_attribute_82");

    //.. onblur wouldn’t fire on input, use addEventListner
    quantity01.addEventListener("focusout", updateTotal);
    quantity02.addEventListener("focusout", updateTotal);
    quantity03.addEventListener("focusout", updateTotal);
    quantity04.addEventListener("focusout", updateTotal);
    quantity05.addEventListener("focusout", updateTotal);
    quantity06.addEventListener("focusout", updateTotal);
    quantity07.addEventListener("focusout", updateTotal);
    quantity08.addEventListener("focusout", updateTotal);
    quantity09.addEventListener("focusout", updateTotal);
    quantity10.addEventListener("focusout", updateTotal);
    quantity11.addEventListener("focusout", updateTotal);
    quantity12.addEventListener("focusout", updateTotal);
    quantity13.addEventListener("focusout", updateTotal);
    quantity14.addEventListener("focusout", updateTotal);
    quantity15.addEventListener("focusout", updateTotal);
    quantity16.addEventListener("focusout", updateTotal);
    quantity17.addEventListener("focusout", updateTotal);
    quantity18.addEventListener("focusout", updateTotal);
    quantity19.addEventListener("focusout", updateTotal);
    quantity20.addEventListener("focusout", updateTotal);
    quantity21.addEventListener("focusout", updateTotal);
    quantity22.addEventListener("focusout", updateTotal);
    quantity23.addEventListener("focusout", updateTotal);
    quantity24.addEventListener("focusout", updateTotal);
    quantity25.addEventListener("focusout", updateTotal);




    document.getElementById("product_attribute_label_5").prepend(br2);
    //document.getElementById("product_attribute_label_6").append(br3);
    //document.getElementById("product_attribute_input_6").prepend(br);


    //- Insert break before first sign's text input
    // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
    var dd1 = document.createElement("dd");
    dd1.innerHTML = "&nbsp";
    var refNode = document.getElementById("product_attribute_input_6");
    refNode.parentNode.insertBefore(dd1, refNode);

    lbBfPrw();


    // Sign 1
    // Attribute: 006_LabelText_001
    $("label:contains('006_LabelText_001')").hide()
    // Can it be hidden via
    //    product_attribute_label_6 ?
    $("label:contains('007_LabelQuantity_001')").hide() // dt id: product_attribute_label_9
    $("label:contains('008_LabelColor_001')").hide(); // relevant input color sign 1: product_attribute_10


    // Sign 2 control labels
    $("label:contains('009_LabelText_002')").hide()
    $("label:contains('010_LabelQuantity_002')").hide()
    $("label:contains('011_LabelColor_002')").hide()

    // Sign 3 to 25 control labels
    $("#product_attribute_label_15").hide();
    $("#product_attribute_label_16").hide();
    $("#product_attribute_label_17").hide();
    $("#product_attribute_label_18").hide();
    $("#product_attribute_label_19").hide();
    $("#product_attribute_label_20").hide();
    $("#product_attribute_label_21").hide();
    $("#product_attribute_label_22").hide();
    $("#product_attribute_label_23").hide();
    $("#product_attribute_label_24").hide();
    $("#product_attribute_label_25").hide();
    $("#product_attribute_label_26").hide();
    $("#product_attribute_label_27").hide();
    $("#product_attribute_label_28").hide();
    $("#product_attribute_label_29").hide();
    $("#product_attribute_label_30").hide();
    $("#product_attribute_label_31").hide();
    $("#product_attribute_label_32").hide();
    $("#product_attribute_label_33").hide();
    $("#product_attribute_label_34").hide();
    $("#product_attribute_label_35").hide();
    $("#product_attribute_label_36").hide();
    $("#product_attribute_label_37").hide();
    $("#product_attribute_label_38").hide();
    $("#product_attribute_label_39").hide();
    $("#product_attribute_label_40").hide();
    $("#product_attribute_label_41").hide();
    $("#product_attribute_label_42").hide();
    $("#product_attribute_label_43").hide();
    $("#product_attribute_label_44").hide();
    $("#product_attribute_label_45").hide();
    $("#product_attribute_label_46").hide();
    $("#product_attribute_label_47").hide();
    $("#product_attribute_label_48").hide();
    $("#product_attribute_label_49").hide();
    $("#product_attribute_label_50").hide();
    $("#product_attribute_label_51").hide();
    $("#product_attribute_label_52").hide();
    $("#product_attribute_label_53").hide();
    $("#product_attribute_label_54").hide();
    $("#product_attribute_label_55").hide();
    $("#product_attribute_label_56").hide();
    $("#product_attribute_label_57").hide();
    $("#product_attribute_label_58").hide();
    $("#product_attribute_label_59").hide();
    $("#product_attribute_label_60").hide();
    $("#product_attribute_label_61").hide();
    $("#product_attribute_label_62").hide();
    $("#product_attribute_label_63").hide();
    $("#product_attribute_label_64").hide();
    $("#product_attribute_label_65").hide();
    $("#product_attribute_label_66").hide();
    $("#product_attribute_label_67").hide();
    $("#product_attribute_label_68").hide();
    $("#product_attribute_label_69").hide();
    $("#product_attribute_label_70").hide();
    $("#product_attribute_label_71").hide();
    $("#product_attribute_label_72").hide();
    $("#product_attribute_label_73").hide();
    $("#product_attribute_label_74").hide();
    $("#product_attribute_label_75").hide();
    $("#product_attribute_label_76").hide();
    $("#product_attribute_label_77").hide();
    $("#product_attribute_label_78").hide();
    $("#product_attribute_label_79").hide();
    $("#product_attribute_label_80").hide();
    $("#product_attribute_label_81").hide();
    $("#product_attribute_label_82").hide();
    $("#product_attribute_label_83").hide();
    $("#product_attribute_label_84").hide();
    $("#product_attribute_label_85").hide();
    $("#product_attribute_label_86").hide();


    //?
    //$("label:contains('001_MainInput')").hide()
    //$("label:contains('002_MainInputButton')").hide()
    //$("label:contains('003_Temp')").hide()
    //$("label:contains('004_LabelTotalQuantity')").hide()
    //$("label:contains('005_TotalQuantity')").hide()


    // Hide color inputs
    $("#product_attribute_10").hide();
    $("#product_attribute_13").hide();
    $("#product_attribute_17").hide();
    $("#product_attribute_20").hide();
    $("#product_attribute_23").hide();
    $("#product_attribute_26").hide();
    $("#product_attribute_29").hide();
    $("#product_attribute_32").hide();
    $("#product_attribute_35").hide();
    $("#product_attribute_38").hide();
    $("#product_attribute_41").hide();
    $("#product_attribute_44").hide();
    $("#product_attribute_47").hide();
    $("#product_attribute_50").hide();
    $("#product_attribute_53").hide();
    $("#product_attribute_56").hide();
    $("#product_attribute_59").hide();
    $("#product_attribute_62").hide();
    $("#product_attribute_65").hide();
    $("#product_attribute_68").hide();
    $("#product_attribute_71").hide();
    $("#product_attribute_74").hide();
    $("#product_attribute_77").hide();
    $("#product_attribute_80").hide();
    $("#product_attribute_83").hide();

    $("#product_attribute_label_11").hide();
    $("#product_attribute_label_12").hide();


    // Bring controls on same line (commented Apr 20, 22 as it affected atrrib 9 input box only)
    //$("#product_attribute_input_9").css({ "display": "inline-block", "white-space": "nowrap", "width": "255px", "margin-right": "250px" });


    // Main input and button on same line
    //$("#product_attribute_input_1").css({ "display": "inline-block", "white-space": "nowrap" });
    //$("#product_attribute_input_2").css({ "display": "inline-block", "white-space": "nowrap" });

    // Line below main input 0.007.4
    $("#product_attribute_input_1").css({ "padding-bottom": "20px", "border-bottom": "1px solid #ddd" });


    //.. Headings row
    var list_of_labels_div = document.createElement('div');
    list_of_labels_div.id = "list_of_labels_div";
    list_of_labels_div.style.cssText = 'float:left;width:55%;padding:0;margin:0 0 1.5% 15%;color:#4ab2f1;text-align:left;padding-left:2%';
    document.getElementsByClassName("scrolldiv")[0].prepend(list_of_labels_div);
    document.getElementById("list_of_labels_div").innerHTML = ("List of labels");

    //Quantiry
    var quantity_div = document.createElement('div');
    quantity_div.id = "quantity_div";
    list_of_labels_div.parentNode.insertBefore(quantity_div, list_of_labels_div.nextSibling);
    quantity_div.style.cssText = 'float:left;width:9%;padding:0;margin:0;color:#4ab2f1;text-align:left;padding-left:1%';
    document.getElementById("quantity_div").innerHTML = ("Quantity");

    //Text color
    var text_color_div = document.createElement('div');
    text_color_div.id = "text_color_div";
    quantity_div.parentNode.insertBefore(text_color_div, quantity_div.nextSibling);
    text_color_div.style.cssText = 'float:left;width:8%;padding:0;margin:0 0 0 0.3%;color:#4ab2f1;';
    document.getElementById("text_color_div").innerHTML = ("Text Color");


    //-- Centering HTML Controls Horizontally on Page
    document.getElementsByTagName("dl")[0].setAttribute("style", "width: 100%; overflow: hidden; padding: 0; margin: 0;text-align: center");


    //-- Bringing more than one HTML controls in a line - white-space nowrap
    // /* adjust the width; make sure the total is 100% */

    document.getElementById("product_attribute_input_6").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_9").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_10").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%;");
    document.getElementById("del1").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");
    //ed1.setAttribute('style', 'font-size:18px;color:#CCCCCC');

    //Old (ref)
    //    document.getElementById("product_attribute_input_6").setAttribute("style", "float: left;width: 33%;padding: 0;margin: 0");
    //    document.getElementById("product_attribute_input_9").setAttribute("style", "float: left;width: 33%;padding: 0;margin: 0");
    //    document.getElementById("product_attribute_input_10").setAttribute("style", "float: left;width: 33%;padding: 0;margin: 0");

    document.getElementById("product_attribute_input_11").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_12").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_13").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del2").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_15").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_16").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_17").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del3").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_18").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_19").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_20").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del4").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    //document.getElementById("product_attribute_input_20").setAttribute("style", "float: left;width: 55%;padding: 0;margin: 0");
    //5
    document.getElementById("product_attribute_input_21").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_22").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_23").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del5").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_24").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_25").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_26").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del6").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_27").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_28").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_29").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del7").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_30").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_31").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_32").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del8").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_33").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_34").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_35").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del9").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_36").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_37").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_38").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del10").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_39").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_40").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_41").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del11").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_42").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_43").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_44").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del12").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_45").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_46").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_47").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del13").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_48").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_49").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_50").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del14").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_51").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_52").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_53").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del15").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_54").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_55").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_56").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del16").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_57").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_58").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_59").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del17").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_60").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_61").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_62").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del18").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_63").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_64").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_65").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del19").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_66").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_67").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_68").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del20").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_69").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_70").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_71").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del21").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_72").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_73").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_74").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del22").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_75").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_76").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_77").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del23").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_78").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_79").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_80").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del24").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");

    document.getElementById("product_attribute_input_81").setAttribute("style", "float: left;width: 55%;padding: 0;margin:0 0 1.5% 15%; color:#000");
    document.getElementById("product_attribute_input_82").setAttribute("style", "float: left;width: 9%;padding: 0;margin: 0; color:#000");
    document.getElementById("product_attribute_input_83").setAttribute("style", "float: left;width: 8%;padding: 0;margin:0 0 0 0.3%; opacity:60%");
    document.getElementById("del25").setAttribute("style", "float: left;width: 3%;padding: 0;margin-top:10px;font-size:14px;color:#CCCCCC");


    //- Initially hide 2-25 signs controls which have no text value
    if (document.getElementById("product_attribute_11").value) {
      showSign2();
    }
    else
      hideSign2();

    if (document.getElementById("product_attribute_15").value) {
      showSign3();
    }
    else
      hideSign3();

    if (document.getElementById("product_attribute_18").value) {
      showSign4();
    }
    else
      hideSign4();

    if (document.getElementById("product_attribute_21").value) {
      showSign5();
    }
    else
      hideSign5();

    if (document.getElementById("product_attribute_24").value) {
      showSign6();
    }
    else
      hideSign6();

    if (document.getElementById("product_attribute_27").value) {
      showSign7();
    }
    else
      hideSign7();

    if (document.getElementById("product_attribute_30").value) {
      showSign8();
    }
    else
      hideSign8();

    if (document.getElementById("product_attribute_33").value) {
      showSign9();
    }
    else
      hideSign9();

    if (document.getElementById("product_attribute_36").value) {
      showSign10();
    }
    else
      hideSign10();

    if (document.getElementById("product_attribute_39").value) {
      showSign11();
    }
    else
      hideSign11();

    if (document.getElementById("product_attribute_42").value) {
      showSign12();
    }
    else
      hideSign12();

    if (document.getElementById("product_attribute_45").value) {
      showSign13();
    }
    else
      hideSign13();

    if (document.getElementById("product_attribute_48").value) {
      showSign14();
    }
    else
      hideSign14();

    if (document.getElementById("product_attribute_51").value) {
      showSign15();
    }
    else
      hideSign15();

    if (document.getElementById("product_attribute_54").value) {
      showSign16();
    }
    else
      hideSign16();

    if (document.getElementById("product_attribute_57").value) {
      showSign17();
    }
    else
      hideSign17();

    if (document.getElementById("product_attribute_60").value) {
      showSign18();
    }
    else
      hideSign18();

    if (document.getElementById("product_attribute_63").value) {
      showSign19();
    }
    else
      hideSign19();

    if (document.getElementById("product_attribute_66").value) {
      showSign20();
    }
    else
      hideSign20();

    if (document.getElementById("product_attribute_69").value) {
      showSign21();
    }
    else
      hideSign21();

    if (document.getElementById("product_attribute_72").value) {
      showSign22();
    }
    else
      hideSign22();

    if (document.getElementById("product_attribute_75").value) {
      showSign23();
    }
    else
      hideSign23();

    if (document.getElementById("product_attribute_78").value) {
      showSign24();
    }
    else
      hideSign24();

    if (document.getElementById("product_attribute_81").value) {
      showSign25();
    }
    else
      hideSign25();
  }

  //#endregion //* Prod. page in doc ready


  //#region / Cart page in doc ready

  var currentUrlCart = window.location.href;

  if (currentUrlCart.lastIndexOf("/cart") > -1) {

    console.log("cart");
    //var currentUrl = window.location.href;

    //. Hide all field names in Cart
    //document.getElementsByClassName("attributes")[1].style.display = "none";

    //.. JavaScript forEach
    // Ref.

    //.. Triggering click event of a button via JS
    //document.getElementsByClassName("button-2 update-cart-button")[0].click();

    //.. Removing same event propagation by enclosing div when click is triggered on Update button


    //. Top logo link

    //console.log("bef logo upd");
    setTimeout(function () {

      if (document.getElementsByClassName('edit-item')[0]) {
        //console.log("waited");
        $('.header-logo').children("a:first").attr("href", document.getElementsByClassName('edit-item')[0].getElementsByTagName('a')[0].href);
        //link.click()
      }
    }, 500);

    //. Hide Continue Shopping button
    if (document.getElementsByClassName("button-2 continue-shopping-button")[0]) {
      document.getElementsByClassName("button-2 continue-shopping-button")[0].style.display = "none";
    }

    //. Edit order button
    var continueShoppingButton = $(".button-2.continue-shopping-button");
    continueShoppingButton.after('<input type="button" id="edit-button" style="width:25%; margin:5px; background-color: #248ece; height: 43px; border: none; background-color: #4ab2f1; padding: 0 24px; font-size: 15px; color: #fff; text-transform: uppercase;" type="button" value="Edit your Order" >');
    var coEdit = document.getElementById("edit-button");

    if (coEdit !== null) {
      coEdit.addEventListener("click", function () {

      //? using tag name 
      //var coEdit = document.getElementsByTagName("continueshopping");  //$(".button-2.continue-shopping-button");

      document.getElementsByClassName('edit-item')[0].getElementsByTagName('a')[0].click();

      console.log("link 3");
      //return false;
    }, false);
    //};
    }

    // Pricing info
    console.log("pricing info");
    console.log(info);

    let prices = info.split(',');

    const price1 = prices[6]; console.log(prices[6]);
    const price2 = prices[7]; console.log(prices[7]);
    const price3 = prices[8]; console.log(prices[8]);
    const price4 = prices[9]; console.log(prices[9]);

    const quantity1 = prices[10]; console.log(prices[10]);
    const quantity2 = prices[11]; console.log(prices[11]);
    const quantity3 = prices[12]; console.log(prices[12]);
    const quantity4 = prices[13]; console.log(prices[13]);

    var container = $('.footer-block.customer-service').find("li");

    var li = document.createElement('li');
    //li.innerHTML = "<a href='javascript:void(0);' onclick='alert()'>Pricing</a>";
    //li.innerHTML = "<a href='javascript:pop()'>Pricing</a>";

    //li.innerHTML = "<a href='javascript:void(0);' onclick='pop()'>Pricing2</a>";
    li.innerHTML = "<a href='javascript:void(0);' id='id2'>Pricing</a>";

    //"onclick='pop()

    container[1].after(li);

    var last_div = $('.header').find("div");//center-1

    var pricing_div = document.createElement('div');

    /*    '<div class="popup center"><div class="description"><p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur </p></div></div>';*/
    pricing_div.innerHTML +=
      '<div class="popup center">' +
      '<div class="description">' +
      '</div>' +
    '<div class="tier-prices">' +
    '<div class="title"><strong>PRICE BREAKS - The more you buy, the more you save</strong></div>' +
    '<div class="table-wrapper">' +
    '<table class="prices-table">' +
    '<tbody>' +
    '<tr>' +
    '<td class="field-header">Quantity</td>' +
    '<td class="item-quantity">' + quantity1 + '+</td>' +
    '<td class="item-quantity">' + quantity2 + '+</td>' +
    '<td class="item-quantity">' + quantity3 + '+</td>' +
    '<td class="item-quantity">' + quantity4 + '+</td>' +
    '</tr>' +
    '<tr>' +
    '<td class="field-header">Price</td>' +
    '<td class="item-price">$' + price1.substring(0,4) + '</td>' +
    '<td class="item-price">$' + price2.substring(0, 4) + '</td > ' +
    '<td class="item-price">$' + price3.substring(0, 4) + '</td > ' +
    '<td class="item-price">$' + price4.substring(0, 4) + '</td > ' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
      '<div class="dismiss-btn">' +
      '<button id="dismiss-popup-btn">' +
      'Dismiss' +
      '</button>' +
      '</div>' +
      '</div >';

    last_div.after(pricing_div);

    $("#id2").on("click", function () {
      console.log('radius1');
      document.getElementsByClassName("popup")[0].classList.add("active");
      return null;
    });

    $("#dismiss-popup-btn").on("click", function () {
      console.log('radius2');

      //document.getElementById("open-popup-btn").style.display = "block";
      document.getElementsByClassName("popup")[0].classList.remove("active");

      return null;
    });
  }

  //. Remove hyperlink from product name
  var el_pn = document.getElementsByClassName("product-name")[0];
  if (el_pn) {
    document.getElementsByClassName("product-name")[0].removeAttribute("href");
  }


  var currentUrl3 = window.location.href;

  if (currentUrl3.lastIndexOf("/login") > -1) {
    document.querySelector(".topic-block").style.display = "none";

    // Center align New Customer text, make spacing in lines wider
    document.getElementsByClassName("text")[0].style.textAlign = "center"
    document.getElementsByClassName("text")[0].style.lineHeight = "200%";
  }

  //.. Logo to link to product page
  //document.querySelector(".header-logo").getElementsByTagName('a')[0].href = "/news"
  //. Link removal, Sep 18, 22
  //document.querySelector(".header-logo").getElementsByTagName('a')[0].href = ""
});

function pop() {
  console.log("popped4");
  //console.log(i);
}

//function editYourOrder() {
//  alert();
//}

//#endregion doc ready


//#region // ** Prod. page
function lbBfPrw() {
}

function lbBfPrwOnAdd() {
    //Usman Comment
    debugger
  var dd11 = document.createElement("dd");
  dd11.innerHTML = ""; //"<br /><br />";
}


//- Hide visible controls per sign
function hideSign1() {
  $("#product_attribute_input_6").hide();
  $("#product_attribute_input_9").hide();
  $("#product_attribute_input_10").hide();
  $("#del1").hide();
}

function hideSign2() {
  $("#product_attribute_input_11").hide();
  $("#product_attribute_input_12").hide();
  $("#product_attribute_input_13").hide();
  $("#del2").hide();
}

function hideSign3() {
  $("#product_attribute_input_15").hide();
  $("#product_attribute_input_16").hide();
  $("#product_attribute_input_17").hide();
  $("#del3").hide();
}

function hideSign4() {
  $("#product_attribute_input_18").hide();
  $("#product_attribute_input_19").hide();
  $("#product_attribute_input_20").hide();
  $("#del4").hide();
}

function hideSign5() {
  $("#product_attribute_input_21").hide();
  $("#product_attribute_input_22").hide();
  $("#product_attribute_input_23").hide();
  $("#del5").hide();
}

function hideSign6() {
  $("#product_attribute_input_24").hide();
  $("#product_attribute_input_25").hide();
  $("#product_attribute_input_26").hide();
  $("#del6").hide();
}

function hideSign7() {
  $("#product_attribute_input_27").hide();
  $("#product_attribute_input_28").hide();
  $("#product_attribute_input_29").hide();
  $("#del7").hide();
}

function hideSign8() {
  $("#product_attribute_input_30").hide();
  $("#product_attribute_input_31").hide();
  $("#product_attribute_input_32").hide();
  $("#del8").hide();
}

function hideSign9() {
  $("#product_attribute_input_33").hide();
  $("#product_attribute_input_34").hide();
  $("#product_attribute_input_35").hide();
  $("#del9").hide();
}

// 10
function hideSign10() {
  $("#product_attribute_input_36").hide();
  $("#product_attribute_input_37").hide();
  $("#product_attribute_input_38").hide();
  $("#del10").hide();
}

function hideSign11() {
  $("#product_attribute_input_39").hide();
  $("#product_attribute_input_40").hide();
  $("#product_attribute_input_41").hide();
  $("#del11").hide();
}

function hideSign12() {
  $("#product_attribute_input_42").hide();
  $("#product_attribute_input_43").hide();
  $("#product_attribute_input_44").hide();
  $("#del12").hide();
}

function hideSign13() {
  $("#product_attribute_input_45").hide();
  $("#product_attribute_input_46").hide();
  $("#product_attribute_input_47").hide();
  $("#del13").hide();
}

function hideSign14() {
  $("#product_attribute_input_48").hide();
  $("#product_attribute_input_49").hide();
  $("#product_attribute_input_50").hide();
  $("#del14").hide();
}

function hideSign15() {
  $("#product_attribute_input_51").hide();
  $("#product_attribute_input_52").hide();
  $("#product_attribute_input_53").hide();
  $("#del15").hide();
}

function hideSign16() {
  $("#product_attribute_input_54").hide();
  $("#product_attribute_input_55").hide();
  $("#product_attribute_input_56").hide();
  $("#del16").hide();
}

function hideSign17() {
  $("#product_attribute_input_57").hide();
  $("#product_attribute_input_58").hide();
  $("#product_attribute_input_59").hide();
  $("#del17").hide();
}

function hideSign18() {
  $("#product_attribute_input_60").hide();
  $("#product_attribute_input_61").hide();
  $("#product_attribute_input_62").hide();
  $("#del18").hide();
}

function hideSign19() {
  $("#product_attribute_input_63").hide();
  $("#product_attribute_input_64").hide();
  $("#product_attribute_input_65").hide();
  $("#del19").hide();
}

function hideSign20() {
  $("#product_attribute_input_66").hide();
  $("#product_attribute_input_67").hide();
  $("#product_attribute_input_68").hide();
  $("#del20").hide();
}

function hideSign21() {
  $("#product_attribute_input_69").hide();
  $("#product_attribute_input_70").hide();
  $("#product_attribute_input_71").hide();
  $("#del21").hide();
}

function hideSign22() {
  $("#product_attribute_input_72").hide();
  $("#product_attribute_input_73").hide();
  $("#product_attribute_input_74").hide();
  $("#del22").hide();
}

function hideSign23() {
  $("#product_attribute_input_75").hide();
  $("#product_attribute_input_76").hide();
  $("#product_attribute_input_77").hide();
  $("#del23").hide();
}

function hideSign24() {
  $("#product_attribute_input_78").hide();
  $("#product_attribute_input_79").hide();
  $("#product_attribute_input_80").hide();
  $("#del24").hide();
}

function hideSign25() {
  $("#product_attribute_input_81").hide();
  $("#product_attribute_input_82").hide();
  $("#product_attribute_input_83").hide();
  $("#del25").hide();
}


function showSign1() {
  $("#product_attribute_input_6").show();
  $("#product_attribute_input_9").show();
  $("#product_attribute_input_10").show();
  $("#del1").show();

  //. Bring ow to front
  //location.hash = "product_attribute_input_6";
}

function showSign2() {
  $("#product_attribute_input_11").show();
  $("#product_attribute_input_12").show();
  $("#product_attribute_input_13").show();
  $("#del2").show();

  //location.hash = "product_attribute_input_6";
}

function showSign3() {
  $("#product_attribute_input_15").show();
  $("#product_attribute_input_16").show();
  $("#product_attribute_input_17").show();
  $("#del3").show();

  //location.hash = "product_attribute_input_11";
}

function showSign4() {
  $("#product_attribute_input_18").show();
  $("#product_attribute_input_19").show();
  $("#product_attribute_input_20").show();
  $("#del4").show();

  //location.hash = "product_attribute_input_6";
}

function showSign5() {
  $("#product_attribute_input_21").show();
  $("#product_attribute_input_22").show();
  $("#product_attribute_input_23").show();

  $("#del5").show();

  //location.hash = "product_attribute_input_11";
}

function showSign6() {
  $("#product_attribute_input_24").show();
  $("#product_attribute_input_25").show();
  $("#product_attribute_input_26").show();
  $("#del6").show();

  //location.hash = "product_attribute_input_15";
}

function showSign7() {
  $("#product_attribute_input_27").show();
  $("#product_attribute_input_28").show();
  $("#product_attribute_input_29").show();
  $("#del7").show();

  //location.hash = "product_attribute_input_18";
}

function showSign8() {
    //Usman Comment
    debugger
  $("#product_attribute_input_30").show();
  $("#product_attribute_input_31").show();
  $("#product_attribute_input_32").show();
  $("#del8").show();
}

function showSign9() {
  $("#product_attribute_input_33").show();
  $("#product_attribute_input_34").show();
  $("#product_attribute_input_35").show();
  $("#del9").show();
}

function showSign10() {
  $("#product_attribute_input_36").show();
  $("#product_attribute_input_37").show();
  $("#product_attribute_input_38").show();
  $("#del10").show();
}

function showSign11() {
  $("#product_attribute_input_39").show();
  $("#product_attribute_input_40").show();
  $("#product_attribute_input_41").show();
  $("#del11").show();
}

function showSign12() {
  $("#product_attribute_input_42").show();
  $("#product_attribute_input_43").show();
  $("#product_attribute_input_44").show();
  $("#del12").show();
}

function showSign13() {
  $("#product_attribute_input_45").show();
  $("#product_attribute_input_46").show();
  $("#product_attribute_input_47").show();
  $("#del13").show();
}

function showSign14() {
  $("#product_attribute_input_48").show();
  $("#product_attribute_input_49").show();
  $("#product_attribute_input_50").show();
  $("#del14").show();
}

function showSign15() {
  $("#product_attribute_input_51").show();
  $("#product_attribute_input_52").show();
  $("#product_attribute_input_53").show();
  $("#del15").show();
}

function showSign16() {
  $("#product_attribute_input_54").show();
  $("#product_attribute_input_55").show();
  $("#product_attribute_input_56").show();
  $("#del16").show();
}

function showSign17() {
  $("#product_attribute_input_57").show();
  $("#product_attribute_input_58").show();
  $("#product_attribute_input_59").show();
  $("#del17").show();
}

function showSign18() {
  $("#product_attribute_input_60").show();
  $("#product_attribute_input_61").show();
  $("#product_attribute_input_62").show();
  $("#del18").show();
}

function showSign19() {
  $("#product_attribute_input_63").show();
  $("#product_attribute_input_64").show();
  $("#product_attribute_input_65").show();
  $("#del19").show();
}

function showSign20() {
  $("#product_attribute_input_66").show();
  $("#product_attribute_input_67").show();
  $("#product_attribute_input_68").show();
  $("#del20").show();
}

function showSign21() {
  $("#product_attribute_input_69").show();
  $("#product_attribute_input_70").show();
  $("#product_attribute_input_71").show();
  $("#del21").show();
}

function showSign22() {
  $("#product_attribute_input_72").show();
  $("#product_attribute_input_73").show();
  $("#product_attribute_input_74").show();
  $("#del22").show();
}

function showSign23() {
  $("#product_attribute_input_75").show();
  $("#product_attribute_input_76").show();
  $("#product_attribute_input_77").show();
  $("#del23").show();
}

function showSign24() {
  $("#product_attribute_input_78").show();
  $("#product_attribute_input_79").show();
  $("#product_attribute_input_80").show();
  $("#del24").show();
}

function showSign25() {
  $("#product_attribute_input_81").show();
  $("#product_attribute_input_82").show();
  $("#product_attribute_input_83").show();
  $("#del25").show();
}

//.. Distance from counter to list items
function DistFromCount() {
  linebreak1 = document.createElement("br");
  linebreak2 = document.createElement("br");
  $(".scrolldiv").before(linebreak1);
  $(".scrolldiv").before(linebreak2);
  //document.getElementsByClassName("scrolldiv")[0].prepend(linebreak)
}

function showLoading() {
  console.log("Calling Loder / Spinner");
}

function hideLoading() {

  //document.getElementsByClassName("loader")[0].style.display = "none";
}

//#endregion // ** Prod. page


//#region // ** Cart page

//http://localhost:15536/cart


//#endregion // ** Cart page


//#region // ** Common
function currentEnvUrl() {

  var url = window.location.href;

  if (url.lastIndexOf("localhost:15536") > -1) {
  }
}
//#endregion // ** Common
