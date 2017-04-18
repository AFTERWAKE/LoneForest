$(document).ready(function(){

$('#login').on('click', function ()
{
  swal(
  {
    title: 'Login',
    type: 'question',
    html:
      'Username: <input id="swal-input1" class="swal2-input" placeholder="username">' +
      'Password: <input id="swal-input2" class="swal2-input" placeholder="password" type="password">',
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Login',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    preConfirm: function ()
    {
      return new Promise(function (resolve)
      {
        resolve([
          $('#swal-input1').val(),
          $('#swal-input2').val()
        ])
      })
    },
    onOpen: function ()
    {
      $('#swal-input1').focus()
    }
  }).then(function (result)
  {
    var values = {'username': result[0], 'password': result[1]};
    var params = "username=" + values.username + "&password=" + values.password;
    var url = "login/testLogin/index.php";
    try
    {
      httpPost(url, params);
      var logged_in = getCookie("logged_in");
      if (logged_in == "true")
      {
        swal(
        {
          title: 'Success!',
          text: 'You have logged in.',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Lets play!'
        }).then(function ()
        {
          window.location.reload(false);
        })
      }
      else
      {
        swal(
        {
          title: 'Sorry!',
          text: 'Those are the wrong credentials.',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
      }
    }
    catch(err)
    {
      swal('Sorry!', 'Error Message: ' + err.message, 'error');
    }
  }).catch(swal.noop)
})

$('#register').on('click', function ()
{
  swal(
  {
    title: 'Register for an account',
    type: 'question',
    html:
      'First Name: <input id="swal-input1" class="swal2-input" placeholder="First Name">' +
      'Last Name: <input id="swal-input2" class="swal2-input" placeholder="Last Name">' +
      'Username: <input id="swal-input3" class="swal2-input" placeholder="username">' +
      'Password: <input id="swal-input4" class="swal2-input" placeholder="password" type="password">' +
      'What is your mother\'s maiden name? <input id="swal-input5" class="swal2-input" placeholder="Security Question 1">' +
      'What street did you grow up on? <input id="swal-input6" class="swal2-input" placeholder="Security Question 2">',
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Register',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    preConfirm: function ()
    {
      return new Promise(function (resolve)
      {
        resolve([
          $('#swal-input1').val(),
          $('#swal-input2').val(),
          $('#swal-input3').val(),
          $('#swal-input4').val(),
          $('#swal-input5').val(),
          $('#swal-input6').val()
        ])
      })
    },
    onOpen: function ()
    {
      $('#swal-input1').focus()
    }
  }).then(function (result)
  {
    swal(JSON.stringify(result))
  }).catch(swal.noop)
})

$('#about').on('click', function () {
  swal(
  {
    title: 'Hello!',
    text: 'Lone Forest is a text-based adventure game where you must find your way through the forest. Log in or Register an account to begin playing.',
    type: 'info',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Cool'
  })
})

});
