var usuario = function (ruta) {
  var camposPerfil = ['profileFirst', 'profileLast', 'profileEmail', 'profileTelfC'];
  var camposPass = ['profileNewPass', 'profileNewPass2'];
  var camposPassNuevo = ['passNuevo1UN', 'passNuevo2UN'];
  this.infoPerfil = function () {
    // sistema.check_session();
    $.ajax({
      url: ruta + 'get_profile',
      type: 'post',
      dataType: 'json',
      data: { token: sistema.token, accion: 'traerPerfil' },
      success: function (call) {

        call = call.data;

        html = '<div class="fotoPerfil" style="cursor:pointer;" id="editar_Modal"><img src="' + call.fotoC + '" style="width:70px;" align="left"><div id="sombraPerfil" style="display:none">Edit</div></div><p title="' + call.nombre + '" class="usuarioPerfil text-truncate">' + call.nombre + '</p><p title="' + call.cargo + '" class="text-truncate user-job-title">' + call.cargo + '</p><br clear="left">';
        $('#infoUsuario').html(html);
        $('.fotoPerfil').mouseenter(function () {
          $('#sombraPerfil').fadeIn('fast');
        }).mouseleave(function () {
          $('#sombraPerfil').fadeOut('fast');
        });
        helper.validaImgError();
        usuario.apis();
      },
    });
  };
  this.modalEditar = function () {
    $('#usuarioContenido').css('display', 'none');
    $('#loaderPerdil').css('display', 'block');
    usuario.limpiarModal();
    $('#modalPerfil').addClass('mostrar');
    $('#modalPerfil').removeClass('ocultar');

    $('#usuarioTwoStep').addClass('ocultar');
    $('#usuarioTwoStep').removeClass('mostrar');
    $('#validateTwoStep').addClass('ocultar');
    $('#validateTwoStep').removeClass('mostrar');
    $('#seccionChangePassword').addClass('mostrar');
    $('#seccionChangePassword').removeClass('ocultar');

    $('#modalPerfil').fadeTo(0.2, 1);
    $('body').css('overflow', 'hidden');

    $('#profileTelfA, #profileTelfB, #profileTelfC').intlTelInput({
      onlyCountries: ['us', 'co', 'in'],
      preferredCountries: ['us'],
      utilsScript: 'static/js/tools/telinput/js/utils.js'
    });
    $('#profileTelfA, #profileTelfB, #profileTelfC').on('input', function () {
      var actualValue = $(this).val();
      $(this).val(actualValue.replace(/[^0-9]/g, ''));
    });
    // sistema.check_session();
    $.ajax({
      url: ruta + 'get_profile',
      type: 'post',
      dataType: 'json',
      data: { token: sistema.token, accion: 'traerPerfil' },
      success: function (call) {

        call = call.data;
        $('#profileFirst').val(helper.decodeHtml(call.first))
        $('#profileLast').val(helper.decodeHtml(call.last))
        $('#profileTelfA').intlTelInput('setNumber', helper.decodeHtml(call.telefonoA));
        $('#profileTelfB').intlTelInput('setNumber', helper.decodeHtml(call.telefonoB));
        $('#profileTelfC').intlTelInput('setNumber', helper.decodeHtml(call.telefonoC));
        $('#profileEmail').val(helper.decodeHtml(call.correo))
        $('#profileDireccion').val(helper.decodeHtml(call.direccion));
        $('#loaderPerdil').css('display', 'none');
        $('#usuarioContenido').css('display', 'block');
      },
    });
  };

  this.apis = function () {
    $.ajax({
      url: 'api/api_permissions/full_list',
      type: 'POST',
      data: {
        token: sistema.token
      }
    })
      .done(function (data) {

        var apis = data.data;
        var htmlOptions = '';

        var apisLen = apis.length;

        if (apis.length) {
          apis.forEach(function (item) {
            htmlOptions += '<option value="' + item.api_id + '">' + item.api_name + '</option>\n';
          });

          var tab_api_tokens = document.querySelector('.pestanaProfile.api_tokens');
          if (tab_api_tokens) {
            var api_select_list = document.querySelector('#modalPerfil #api_token #api_list');
            api_select_list.empty()
            api_select_list.insertAdjacentHTML('beforeend', htmlOptions);
            $(api_select_list).multiselect({
              noneSelectedText: 'Select an API'
            });
            task.get_list_token();

          } else {
            var html =
              '<div class="pestanaProfile pestanaInactiva api_tokens" id="pestana2" style="left:17.8em">API Tokens</div>' +
              '<div id="api_token">' +
              '<p class="tituloCapa p_usuario-modal margin-bottom-1"></p>' +
              '<div id="select_api" class="margin-bottom-1">' +
              '<select name="api_list" id="api_list" multiple class="dropdown">' +
              '<option value="" selected>Select an API</option>' +
              htmlOptions +
              '</select>' +
              '</div>' +
              '<div id="generate_api" class="margin-bottom-1">' +
              '<button type="button" id="btn_generate_token" class="button primary">Generate Token</button>' +
              '</div>' +
              '<div id="api_token_list"></div>' +
              '</div>';
            document.querySelector('#modalPerfil #usuarioContenido').insertAdjacentHTML('afterend', html);
          }

        }
      })
      .fail(function (xhr) {
        console.warn(xhr);
      })
  };

  this.perfiles = function () {

    // sistema.check_session();
    $.ajax({
      url: ruta + 'profiles',
      type: 'post',
      dataType: 'json',
      data: { token: sistema.token, accion: 'perfiles' },
      success: function (call) {

        call = call.data;
        var select_default_text = "";
        html = '<option placeholder="Profile" value="NULL"></option>';
        $.each(call, function (index, val) {
          html += '<option value="' + val.id_item + '">' + val.titulo + '</option>';
        });
        $('#selectPerfilVer').html(html);
        $("#selectPerfilVer").select({
          noneSelectedText: select_default_text,
          minWidth: 300,
        })
        $('#selectPerfilVer').combobox();
        $('#selectPerfilVer').siblings('.custom-combobox').css('width', '200px');
        $('#selectPerfilVer').siblings('.custom-combobox').children('.custom-combobox-input').css("cssText", "background-color: white !important;");
        $('#selectPerfilVer').siblings('.custom-combobox').children('input').css({ "width": "90%", "border-radius": "10px" });
        $('#selectPerfilVer').siblings('.custom-combobox').children('.custom-combobox-input').attr("placeholder", "Profile");
        // $('#selectPerfilVer').siblings('.custom-combobox').children('input').data('ui-autocomplete').options.position = {my: "left bottom", at: "left top"};
      },
    });
  };

  this.actualizaPerfil = function (two_step_update_pass = false) {

    var telefonoA = $("#profileTelfA").intlTelInput('getNumber');
    var telefonoB = $("#profileTelfB").intlTelInput('getNumber');
    var telefonoC = $("#profileTelfC").intlTelInput('getNumber');
    if (telefonoA.length != 0 && telefonoA.length < 9 || telefonoA.length > 13) {
      alertas.warning('Invalid Home Phone must contain at least 9 characters');
      return false;
    }

    if (telefonoB.length != 0 && telefonoB.length < 9 || telefonoB.length > 13) {
      alertas.warning('Invalid Pager Phone must contain at least 9 characters');
      return false;
    }

    if (telefonoC.length < 9 || telefonoC.length > 13) {
      alertas.warning('Invalid Cell Phone must contain at least 9 characters');
      return false;
    }

    if (valida.validForm(camposPerfil)) {
      alertas.warning('Highlighted fields are required');
      return false;
    }

    var data = new FormData();
    data.append('token', sistema.token);
    data.append('accion', 'actualizaPerfil');
    data.append('nombre', $('#profileFirst').val());
    data.append('apellido', $('#profileLast').val());
    data.append('correo', $('#profileEmail').val());
    data.append('direccion', $('#profileDireccion').val());
    data.append('telefonoA', telefonoA);
    data.append('telefonoB', telefonoB);
    data.append('telefonoC', telefonoC);

    if ($('#profileNewPass').val() != "" || $('#profileNewPass2').val() != "") {
      if (valida.validForm(camposPass)) {
        alertas.warning('Highlighted fields are required');
        return false;
      }

      if ($('#profileNewPass').val() != $('#profileNewPass2').val()) {
        alertas.warning('Passwords do not match');
        $('#profileNewPass').val('');
        $('#profileNewPass2').val('');
        valida.validaPassword('profileNewPass');
        return false;
      }


      if (!usuario.validarPassword('profileNewPass')) {
        alertas.warning('Password conditions not valid');
        $('#profileNewPass').val('');
        $('#profileNewPass2').val('');
        valida.validaPassword('profileNewPass');
        return false;
      }

      data.append('actualizaPass', 'true');
      data.append('passNuevo', $('#profileNewPass').val());

      if (two_step_update_pass) {
        this.actualizaPerfilrequest(data);
        two_step.closeCode(ruta, sistema.token, camposPass);
      } else {
        var sendCode = this.sendCodePanel(data.get('correo'), data.get('telefonoC'));
        console.log(sendCode);
      }
    } else {
      data.append('actualizaPass', 'false');
      valida.limpiar(camposPass);
      this.actualizaPerfilrequest(data);
    }
  };

  this.actualizaPerfilrequest = function (data) {
    $.ajax({
      url: ruta + 'update_profile',
      type: 'post',
      dataType: 'json',
      contentType: false,
      processData: false,
      data: data,

      success: function (call) {
        call = call.data;
        switch (call) {
          case "1":
            alertas.mensaje('You are using a Password that you used before , please use a Different Password');
            usuario.limpiarPass();
            break;
          case "2":
            alertas.mensaje('At least 6 characters');
            usuario.limpiarPass();
            break;
          case "3":
            alertas.mensaje('It requires at least 1 Number (0-9)');
            usuario.limpiarPass();
            break;
          case "4":
            alertas.mensaje('It requires at least 1 (A-Z) Uppercase character');
            usuario.limpiarPass();
            break;
          case "5":
            alertas.mensaje('It requires at least one Lowercase character (a-z)');
            usuario.limpiarPass();
            break;
          case "6":
            alertas.mensaje('It requires at least 1 special character');
            usuario.limpiarPass();
            break;
          case "7":
            alertas.mensaje('Error, please try again');
            usuario.limpiarPass();
            break;
          case "8":
            alertas.mensaje('Error, please try again');
            usuario.limpiarSecondPass();
            break;
          case "9":
            alertas.mensaje('Only 4 numbers allowed');
            usuario.limpiarSecondPass();
            break;
          case "10":
            alertas.mensaje('Only numbers allowed');
            usuario.limpiarSecondPass();
            break;
          case "11":
            alertas.mensaje('The current password entered does not match, please enter your current password correctly to continue.');
            usuario.limpiarPass();
            break;
          case "You are using a password that you used before, please use a different password":
            alertas.mensaje(call);
            usuario.limpiarPass();
            break;
          default:
            alertas.mensaje("Changes Applied");
            usuario.infoPerfil();
            usuario.limpiarModal();
            break;
        }
        usuario.infoPerfil();
      },
      error: function (error) {
        alertas.error('Could not update information, missing fields.');
        usuario.infoPerfil();
        usuario.limpiarModal();
      }
    });
  };

  this.cambiaPerfil = function () {
    // sistema.check_session();
    /* if(valida.formul('#verComo')){
      return false;
    } */
    if ($('#selectPerfilVer').val() !== 'NULL') {
      var perfil = $('#selectPerfilVer').val();
      var status = '';
      $.ajax({
        url: ruta + 'profile_change',
        type: 'post',
        dataType: 'json',
        data: { id_perfil: perfil, token: sistema.token, accion: 'perfilCambio' },
        success: function (call) {
          var call = call.data;
          if ($('#selectPerfilVer').val().trim() == 'NULL') {
            alertas.error('You must select an option');
          } else {
            if (call['status'] == 'ok') {
              window.location.reload(true);
            }
            else {
              alertas.error('you do not have permissions to change your profile');
            }
          }
        },
        error: function (request) {
          var response = request.responseJSON;
          if (response) {
            if ('error' in response) {
              alertas.error(response.error.description);

            } else {
              alertas.error('An error has ocurred')
            }
          } else {
            alertas.error('An error has ocurred')
          }
        }
      });
    } else {
      alertas.error('You must select an option');
    }
  };

  this.pestana = function (opcion) {
    switch (opcion) {
      case 0:
        $('#api_token').css('display', 'none');
        $('#security').css('display', 'none');
        $('#usuarioContenido').css('display', 'block');
        $('#pestana1').addClass('pestanaActiva');
        $('#pestana1').removeClass('pestanaInactiva');
        $('#pestana2').addClass('pestanaInactiva');
        $('#pestana2').removeClass('pestanaActiva');
        $('#pestana3').addClass('pestanaInactiva');
        $('#pestana3').removeClass('pestanaActiva');
        $('#pestana4').addClass('pestanaInactivaTwoStep');
        $('#pestana4').removeClass('pestanaActivaTwoStep');

        break;
      case 1:
        $('#usuarioContenido').css('display', 'none');
        $('#api_token').css('display', 'block');
        $('#security').css('display', 'none');
        $('#pestana2').addClass('pestanaActiva');
        $('#pestana2').removeClass('pestanaInactiva');
        $('#pestana1').addClass('pestanaInactiva');
        $('#pestana1').removeClass('pestanaActiva');
        $('#pestana3').addClass('pestanaInactiva');
        $('#pestana3').removeClass('pestanaActiva');
        $('#pestana4').addClass('pestanaInactivaTwoStep');
        $('#pestana4').removeClass('pestanaActivaTwoStep');
        usuario.apis();
        break;
      case 2:
        $('#usuarioContenido').css('display', 'none');
        $('#api_token').css('display', 'none');
        $('#security').css('display', 'block');
        $('#pestana1').addClass('pestanaInactiva');
        $('#pestana1').removeClass('pestanaActiva');
        $('#pestana2').addClass('pestanaInactiva');
        $('#pestana2').removeClass('pestanaActiva');
        $('#pestana3').addClass('pestanaActiva');
        $('#pestana3').removeClass('pestanaInactiva');
        $('#pestana4').addClass('pestanaInactivaTwoStep');
        $('#pestana4').removeClass('pestanaActivaTwoStep');
    }
  };

  this.limpiarModal = function () {
    usuario.limpiarPass();
    usuario.limpiarSecondPass();
    valida.limpiar(camposPass);
    valida.limpiar(camposPerfil);
    $('#profileNewPass').removeClass('field-invalid');
    $('#profileNewPass2').removeClass('field-invalid');
  };

  this.limpiarPass = function () {
    $('#profileNewPass').val('');
    $('#profileNewPass2').val('');
    $('#profileOldPass').val('');
  };

  this.limpiarSecondPass = function () {
    $('#profileLastPassSecond').val('');
    $('#profileOldPass').val('');
    $('#profileNewPassSecond').val('');
    $('#profileNewPass2Second').val('');
  };

  this.cierraModal = function () {
    $('#modalPerfil').css('display', 'none');
    $('body').css('overflow', 'auto');
    $('#pestana1').addClass('pestanaActiva');
    $('#pestana1').removeClass('pestanaInactiva');
    $('#pestana2').removeClass('pestanaActiva');
    $('#pestana2').addClass('pestanaInactiva');
    $('#pestana3').removeClass('pestanaActiva');
    $('#pestana3').addClass('pestanaInactiva');
    $('#pestana4').addClass('pestanaInactivaTwoStep');
    $('#pestana4').removeClass('pestanaActivaTwoStep');
    $('#api_token').css('display', 'none');
    $('#security').css('display', 'none');
    $('#usuarioContenido').css('display', 'block');
    $('#updateUserprofile').prop('disabled', true);
  };

  this.formatTelf = function () {
  };

  this.inicio = function () {
    usuario.infoPerfil();
    usuario.perfiles();
    $('.numerico').keyup(function () {
      this.value = (this.value + '').replace(/[^0-9]/g, '');
    });
    usuario.formatTelf();
  };

  this.actualizaPassNuevo = function () {
    if (valida.validForm(camposPassNuevo)) {
      alertas.warning('Highlighted fields are required');
      return false;
    }
    if ($('#passNuevo1UN').val() != $('#passNuevo2UN').val()) {
      alertas.warning('Passwords do not match');
      $('#passAnteriorUN').val('');
      $('#passNuevo1UN').val('');
      $('#passNuevo2UN').val('');
      return false;
    }
    if (!usuario.validarPassword('passNuevo1UN')) {
      alertas.warning('Password conditions not valid');
      $('#profileNewPass').val('');
      $('#profileNewPass2').val('');
      valida.validaPassword('passNuevo1UN');
      return false;
    }
    passAnterior = $('#passAnteriorUN').val();
    passNuevo = $('#passNuevo2UN').val();
    // sistema.check_session();
    $.ajax({
      url: ruta + 'update_pass_new',
      dataType: 'json',
      type: 'post',
      data: { passAnterior: passAnterior, passNuevo: passNuevo, token: sistema.token, accion: 'actualizaPassNuevo', uuid: '' },
      success: function (call) {

        call = call.data;

        switch (call) {
          case "1":
            alertas.mensaje('You are using a Password that you used before , please use a Different Password');
            break;
          case "2":
            alertas.mensaje('At least 8 characters');
            break;
          case "3":
            alertas.mensaje('It requires at least 1 Number (0-9)');
            break;
          case "4":
            alertas.mensaje('It requires at least 1 (A-Z) Uppercase character');
            break;
          case "5":
            alertas.mensaje('It requires at least one Lowercase character (a-z)');
            break;
          case "6":
            alertas.mensaje('It requires at least 1 special character');
            break;
          case "7":
            alertas.mensaje('Error, please try again');
            break;
          case "0":
            alertas.mensaje("Changes Applied");
            $('#openModalNuevoUsr').css('display', 'none');
            break;
        }
        if (call != "" && call < 9) {
          $('#passAnteriorUN').val('');
          $('#passNuevo1UN').val('');
          $('#passNuevo2UN').val('');
        }
      }, error: function (request, status, error) {
        alertas.warning("An error has ocurred");
      }
    });
  };

  this.guardarPassword = function () { // Ruta no existente en el Handler de USUARIO
    var validar = valida.validForm(["recoveryPass1", "recoveryPass2"]);
    var password1 = $('#recoveryPass1').val();
    var password2 = $('#recoveryPass2').val();
    if (validar || password1 != password2) {
      alertas.warning('Passwords do not match');
      $('#recoveryPass1').val('');
      $('#recoveryPass2').val('');
      return false;
    }
    // sistema.check_session();
    $.ajax({
      url: ruta,
      type: 'post',
      dataType: 'json',
      data: { password: password1, token: sistema.token, accion: 'guardarPassword' },
      success: function (call) {

        call = call.data;

        switch (call.status) {
          case "ok":
            alertas.success("Changes Applied");
            $('#recoveryModal').css('display', 'none');
            break;
          case 'errorLongitud':
            alertas.mensaje('At least 6 characters');
            break;
          case "errorNumeros":
            alertas.mensaje('It requires at least 1 Number (0-9)');
            break;
          case "errorMayusculas":
            alertas.mensaje('It requires at least 1 (A-Z) Uppercase character');
            break;
          case "errorMinusculas":
            alertas.mensaje('It requires at least one Lowercase character (a-z)');
            break;
          case "errorCaracter":
            alertas.mensaje("It requires at least 1 special character");
            break;
        }
      }, error: function (request, status, error) {
        alertas.success("Changes Applied");
        $('#openModalNuevoUsr').css('display', 'none');
      }
    });
  };

  this.validarPassword = function (resource) {
    var password = $('#' + resource).val();

    var digit = /^(?=.*\d)/;
    var upper = /^(?=.*[A-Z])/;
    var lower = /^(?=.*[a-z])/;
    var symbol = /^(?=.*\W)/;
    var length = /^(?=^.{8,}$)/;
    var space = /^(?=.*\s)/;

    if (password == "" || !upper.test(password) || !lower.test(password) || !digit.test(password) || !symbol.test(password) || space.test(password) || !length.test(password)) {
      return false;
    }

    return true;
  };

  this.sendCodePanel = function (correo, telefono) {
    console.log('llegueeee');
    two_step.enableAllBoxes();
    two_step.showTime();

    if (!correo || !telefono) {
      alert('Correo electrónico o teléfono vacíos. Compruebe la información');
      return;
    }

    $('body').css('overflow', 'hidden');
    $('#usuarioTwoStep').addClass('mostrar');
    $('#usuarioTwoStep').removeClass('ocultar');
    $('#validateTwoStep').addClass('ocultar');
    $('#validateTwoStep').removeClass('mostrar');
    $('#seccionChangePassword').addClass('ocultar');
    $('#seccionChangePassword').removeClass('mostrar');

    $('#phoneLabel').text(telefono);
    $('#emailLabel').text(correo);

    const sendButton = document.querySelector('button.send');

    function handleSendClick() {
      var option = document.querySelector('input[type="radio"]:checked');

      if (!option) {
        alert('Please select an option');
        return;
      }

      var typeVerification = option.value;
      var data = new FormData();
      data.append('token', sistema.token);
      data.append('options', typeVerification);
      data.append('email', correo);
      data.append('accion', 'actualizaPerfil');

      if (sendButton.disabled) return;
      sendButton.disabled = true;

      $.ajax({
        url: ruta + "panel_two_step",
        type: "post",
        dataType: 'json',
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
          two_step.validatedCodeTwoStep(sistema.token, ruta);
        },
        complete: function () {
          sendButton.disabled = false;
        },
        error: function (request, status, error) {
          console.log("An error occurred: " + error);
        }
      });
    }

    sendButton.removeEventListener('click', handleSendClick);


    sendButton.addEventListener('click', handleSendClick);

    return true;
  };

};
var TwoStepValidate = function () {
  this.time = null;
  this.segundosInterval = null;
  this.token = "";
  this.attempts = 0;
  this.maxAttempts = 5;
}

TwoStepValidate.prototype.validatedCodeTwoStep = function (token, route) {

  $('body').css('overflow', 'hidden');
  $('#validateTwoStep').addClass('mostrar');
  $('#validateTwoStep').removeClass('ocultar');
  $('#usuarioTwoStep').addClass('ocultar');
  $('#usuarioTwoStep').removeClass('mostrar');
  $('#seccionChangePassword').addClass('ocultar');
  $('#seccionChangePassword').removeClass('mostrar');
  var data = new FormData();

  var panel = document.querySelector('div.panelTwoStep');

  document.getElementById('code1TwoStep').focus();
  var numberBoxes = document.querySelectorAll('input.codeStep');
  var nBoxes = numberBoxes.length;
  for (var i = 0; i < nBoxes; i++) {
    var numberBox = numberBoxes[i];

    var codeOne = document.getElementById('code1TwoStep');
    var codeTwo = document.getElementById('code2TwoStep');
    var codeThree = document.getElementById('code3TwoStep');
    var codeFour = document.getElementById('code4TwoStep');
    var codeFive = document.getElementById('code5TwoStep');
    var codeSix = document.getElementById('code6TwoStep');

    numberBox.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value) {
        switch (this.id) {
          case 'code1TwoStep':
            codeTwo.focus();
            break;
          case 'code2TwoStep':
            codeThree.focus();
            break;
          case 'code3TwoStep':
            codeFour.focus();
            break;
          case 'code4TwoStep':
            codeFive.focus();
            break;
          case 'code5TwoStep':
            codeSix.focus();
            break;
        }
      }
      if (codeOne.value && codeTwo.value && codeThree.value && codeFour.value && codeFive.value && codeSix.value) {
        two_step.checkTwoStep(codeOne.value + '' + codeTwo.value + '' + codeThree.value + '' + codeFour.value + '' + codeFive.value + '' + codeSix.value, token, route);
      }
    });

    numberBox.addEventListener('keydown', function (e) {
      if (e.keyCode == 8) {
        switch (this.id) {
          case 'code2TwoStep':
            codeTwo.value = '';
            codeOne.value = '';
            codeOne.focus();
            break;
          case 'code3TwoStep':
            codeThree.value = '';
            codeTwo.value = '';
            codeTwo.focus();
            break;
          case 'code4TwoStep':
            codeFour.value = '';
            codeThree.value = '';
            codeThree.focus();
            break;
          case 'code5TwoStep':
            codeFive.value = '';
            codeFour.value = '';
            codeFour.focus();
            break;
          case 'code6TwoStep':
            codeSix.value = '';
            codeFive.value = '';
            codeFive.focus();
            break;
        }
      }
    });
  }
  two_step.setTimeTwoStep(document.getElementById('seconds_left_2step').value).run();

  document.querySelector('#validateTwoStep div.panelTwoStep-close').addEventListener('click', function () {
    $.ajax({
      url: ruta + "clean_code",
      type: "post",
      dataType: 'json',
      contentType: false,
      processData: false,
      data: data,
      success: function (response) {
        usuario.cierraModal();
      }
    });
  });
  panel.classList.add('shown');

};

TwoStepValidate.prototype.setTimeTwoStep = function (secondsTime) {
  secondsTime = parseInt(secondsTime);
  var minutes = Math.floor(secondsTime / 60, 10);
  var seconds = secondsTime - minutes * 60;

  this.time = {
    min: minutes == 0 && seconds == 0 ? 0 : Math.abs(minutes - 5),
    sec: minutes == 0 && seconds == 0 ? 0 : Math.abs(seconds - 85)
  }
  return this;
};

TwoStepValidate.prototype.run = function () {
  var that = this;
  if (!this.time || (this.time.min === 0 && this.time.sec === 0)) {
    l.hide().then(function () {
      that.disableAllBoxes();
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Your code has expired, please request a new code',
        footer: '<span style="text-align: center">If you think that this is an error<br>Please contact MD Cloud Support</span>'
      }).then(function () {
        l.show().then(function () {
          post('/auth/clean', {}).then(function () {
            usuario.cierraModal();
            console.log("Recargando la página...");
          })
        });
      })
    });
  } else {
    this.timeIt();
  }
};

TwoStepValidate.prototype.timeIt = function () {
  var that = this;
  var segundosTmp = 0;

  if (two_step.segundosInterval) {
    clearInterval(two_step.segundosInterval);
  }

  if (!that.time || (!that.time.min && that.time.sec === 0)) {
    return;
  }

  two_step.segundosInterval = setInterval(function () {

    if (that.time !== null) {
      if (that.time.sec > 0) {
        that.time.sec--;
      } else if (that.time.sec === 0 && that.time.min > 0) {
        that.time.min--;
        that.time.sec = 59;
      }
      segundosTmp = that.time.sec < 10 ? "0" + that.time.sec : that.time.sec;
      document.getElementById('timerLabelTwoStep').textContent = "0" + that.time.min + ":" + segundosTmp;

      if (that.time.min === 0 && that.time.sec === 0) {
        clearInterval(two_step.segundosInterval);
        two_step.disableAllBoxes();

        alertas.warning('Your code has expired, please request a new code');


        $('#validateTwoStep').removeClass('mostrar');
        $('#validateTwoStep').addClass('ocultar');
        $('#seccionChangePassword').removeClass('ocultar');
        $('#seccionChangePassword').addClass('mostrar');
      }
    }

  }, 1000);
};

TwoStepValidate.prototype.disableAllBoxes = function () {
  this.cleanAllBoxes();
  document.getElementById('code1TwoStep').setAttribute('disabled', true);
  document.getElementById('code2TwoStep').setAttribute('disabled', true);
  document.getElementById('code3TwoStep').setAttribute('disabled', true);
  document.getElementById('code4TwoStep').setAttribute('disabled', true);
  document.getElementById('code5TwoStep').setAttribute('disabled', true);
  document.getElementById('code6TwoStep').setAttribute('disabled', true);
};

TwoStepValidate.prototype.enableAllBoxes = function () {
  this.cleanAllBoxes();
  document.getElementById('code1TwoStep').removeAttribute('disabled');
  document.getElementById('code2TwoStep').removeAttribute('disabled');
  document.getElementById('code3TwoStep').removeAttribute('disabled');
  document.getElementById('code4TwoStep').removeAttribute('disabled');
  document.getElementById('code5TwoStep').removeAttribute('disabled');
  document.getElementById('code6TwoStep').removeAttribute('disabled');
};

TwoStepValidate.prototype.cleanAllBoxes = function () {
  document.getElementById('code1TwoStep').value = '';
  document.getElementById('code2TwoStep').value = '';
  document.getElementById('code3TwoStep').value = '';
  document.getElementById('code4TwoStep').value = '';
  document.getElementById('code5TwoStep').value = '';
  document.getElementById('code6TwoStep').value = '';
  document.getElementById('code1TwoStep').focus();
};

TwoStepValidate.prototype.hideTime = function () {
  clearInterval(this.segundosInterval);
  document.getElementById('timerLabelTwoStep').style['display'] = 'none';
};

TwoStepValidate.prototype.showTime = function () {
  document.getElementById('timerLabelTwoStep').style['display'] = 'block';
};

TwoStepValidate.prototype.checkTwoStep = function (code, tokenPanel, route) {
  var data = new FormData();
  data.append('token', tokenPanel);
  data.append('code', code);
  data.append('accion', 'actualizaPerfil');

  const sendButton = document.querySelector('button.send');

  if (sendButton.disabled) return;
  sendButton.disabled = true;//

  $.ajax({
    url: route + "validate_two_step_panel",
    type: "post",
    dataType: 'json',
    contentType: false,
    processData: false,
    data: data,
    success: function (response) {
      if (response.status === true) {
        two_step.attempts = 0;
        two_step.cleanAllBoxes();
        two_step.disableAllBoxes();
        two_step.hideTime();

        $('#usuarioTwoStep').addClass('ocultar');
        $('#usuarioTwoStep').removeClass('mostrar');
        $('#validateTwoStep').addClass('ocultar');
        $('#validateTwoStep').removeClass('mostrar');
        $('#seccionChangePassword').addClass('mostrar');
        $('#seccionChangePassword').removeClass('ocultar');
        alertas.success('Two-Factor Authentication successfully validated');
        usuario.actualizaPerfil(true);
      } else {
        two_step.attempts += 1;

        if (two_step.attempts >= two_step.maxAttempts) {
          two_step.cleanAllBoxes();
          two_step.disableAllBoxes();
          alertas.error('You have exceeded the maximum number of attempts. The code has expired. Please request a new code.');
          usuario.cierraModal();

        } else {
          two_step.cleanAllBoxes();
          alertas.error('Two-Factor Authentication code is invalid. You have ' + (two_step.maxAttempts - two_step.attempts) + ' attempts remaining.');
        }
      }
    },
    complete: function () {
      sendButton.disabled = false;
    },

    error: function (request, status, error) {
      two_step.cleanAllBoxes();
      alertas.error('An error occurred while validating the code. Please try again.');
      return false;
    }
  });
  return true;
};

TwoStepValidate.prototype.closeCode = function (route, tokenModal, camposPass) {
  two_step.cleanAllBoxes();
  two_step.time = null;
  two_step.segundosInterval = null;
  valida.limpiar(camposPass);

  var data = new FormData();
  data.append("token", tokenModal);

  $.ajax({
    url: route + "clean_code",
    type: "post",
    dataType: 'json',
    contentType: false,
    processData: false,
    data: data,
    success: function (response) {
      console.log("LLEGO ADE CODIGO");
    }
  });
};

var two_step = new TwoStepValidate();

var usuario = new usuario("api/user/");

window.promiseSystem
  .then(function () {
    usuario.inicio();
    $('.recoveryPass').on('keyup', function () {
      valida.validaPassword(this.id);
    });
    $('#recoveryGuardar').on('click', function () {
      usuario.guardarPassword();
    });
    $("body").on("click", "#closemodal-profl", function (event) {
      usuario.cierraModal();
    });
    $("body").on("click", "#pestana1", function (event) {
      usuario.pestana(0);
    });
    $("body").on("click", "#pestana2", function (event) {
      usuario.pestana(1);
    });
    $("body").on("click", "#pestana3", function (event) {
      usuario.pestana(2);
    });
    $("body").on("click", "#editar_Modal", function (event) {
      usuario.modalEditar();
    });
    $("body").on("click", "#updateUserprofile", function (event) {
      usuario.actualizaPerfil();
    });
    $("body").on("click", "#updateUserprofileII", function (event) {
      usuario.actualizaPerfil();
    });
    $('.profileTelfA').on('keyup', function () {
      usuario.formatTelf()
    });
    $('#security').on('click', '#btnChange_profile', function () {
      usuario.cambiaPerfil();
    });
    $("body").on('keyup', '.pass_PrflUser', function () {
      valida.validaPassword(this.id)
    });
    $("body").on('keyup', '#profileFirst, #profileLast, #profileTelfA, #profileEmail, #profileTelfB, #profileDireccion, #profileTelfC, #profileNewPass, #profileNewPass2', function () {
      $('#updateUserprofile').prop('disabled', false);
    });

    document.addEventListener("paste", function (e) {
      if (e.target.type === "text") {
        var data = e.clipboardData.getData('Text');
        const dataArray = data.split('');
        var fillInputs = document.querySelectorAll("input[id^= 'code']");
        for (var i = 0; i < fillInputs.length; i++) {
          fillInputs[i].value = dataArray[i];
        }
        var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (!isChrome) {
          TwoStepValidate.checkTwoStep(data);
        }
      }
    });
  });
