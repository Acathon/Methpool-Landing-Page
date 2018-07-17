$(document).ready(function() {
  $.getJSON('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DBIX,ETZ,UBIQ,EXP,EOSC&tsyms=USD', function(data) {
    $.each(data, function(key, val) {
      //$('#price').text(val.USD);
      if (key == 'UBIQ') {
        var ubq = val.USD;
        console.log("Ubiq " + ubq);
        $('#ubq').text(ubq);
      } else if (key == 'EXP') {
        var exp = val.USD;
        $('#exp').text(exp);
        console.log("Expanse " + exp);
      } else if (key == 'DBIX') {
        var dbix = val.USD;
        $('#dbix').text(dbix);
        console.log("DubaiCoin " + dbix);
      } else if (key == 'EOSC') {
        var eosc = val.USD;
        $('#eosc').text(eosc);
        console.log("Eos Classic " + eosc);
      } else if (key == 'ETZ') {
        var etz = val.USD;
        $('#etz').text(etz);
        console.log("EtherZero " + etz);
      } else if (key == 'ETH') {
        var eth = val.USD;
        $('#eth').text(eth);
        console.log("Ethereum " + eth);
      }
    });
  });
  $.getJSON('https://api.coinmarketcap.com/v2/ticker/2757/', function(data) {
    $.each(data, function(key, val) {

      if (key == "data") {
        //console.log(val);
        $.each(val, function(keys, vals) {
          if (keys == "quotes") {
            $.each(vals, function(keyd, vald) {
              if (keyd == "USD") {
                var clo = vald.price;
                $('#clo').text(clo);
                console.log("Callisto " + clo);
              }
            })
          }
        });
      }
    });
  });

  //stratum+tcp://eosc.methpool.com:8002
  //EthDcrMiner64.exe -epool eosc.methpool.com:8008 -ewal YOUR_WALLET_ADDRESS -eworker YOUR_RIG_NAME -epsw x -allcoins 1 -allpools 1

  var wallet;
  var claymore;

  //Eos Classic
  $("#wallet-eosc").change(function() {
    wallet = $("#wallet-eosc").val();
    claymore = $('.config-text').val("EthDcrMiner64.exe -epool stratum+tcp://eosc.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log(claymore);
  });
  //callisto
  $("#wallet-clo").change(function() {
    wallet = $("#wallet-clo").val();
    claymore = $(".config-text").val("EthDcrMiner64.exe -epool stratum+tcp://clo.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log(claymore);
  });
  //dubaicoin
  $("#wallet-dbix").change(function() {
    wallet = $("#wallet-dbix").val();
    claymore = $('.config-text').val("EthDcrMiner64.exe -epool stratum+tcp://dbix.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log(claymore);
  });
  //etherzero
  $("#wallet-etz").change(function() {
    wallet = $("#wallet-etz").val();
    claymore = $(".config-text").val("EthDcrMiner64.exe -epool stratum+tcp://etz.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log(claymore);
  });
  //expanse
  $("#wallet-exp").change(function() {
    wallet = $("#wallet-exp").val();

    claymore = $(".config-text").val("EthDcrMiner64.exe -epool stratum+tcp://exp.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log(claymore);
  });
  //ubiq
  $("#wallet-ubq").change(function() {
    wallet = $("#wallet-ubq").val();
    claymore = $(".config-text").val("EthDcrMiner64.exe -epool stratum+tcp://ubq.methpool.com:8002 -ewal " + wallet + " -eworker Chuck -epsw x -allcoins 1 -allpools 1");
    console.log($(".config-text").val());
  });

  $(".generate").bind("click", function() {
    console.log($(".config-text").val());
    var fileName = "methpool.bat";
    var clayLine = $(".config-text").val();
    var textFileAsBlob = new Blob([clayLine], {
      type: 'text/plain'
    });
    if ('Blob' in window) {
      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
      } else {
        var downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = 'Download File';

        if ('webkitURL' in window) {
          // Chrome allows the link to be clicked without actually adding it to the DOM.
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
          // Firefox requires the link to be added to the DOM before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.click(function() {
            document.body.removeChild(event.target);
          });

          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
        }
        downloadLink.click();
      }

    } else {
      console.log('Your browser does not support the HTML5 Blob.');
    }
  });




  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
          });
        }
      }
    });

});
