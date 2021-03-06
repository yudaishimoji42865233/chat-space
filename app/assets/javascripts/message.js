$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img  = message.image.url ? `<img class="lower-message__image" src="${ message.image.url }">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                        ${content}
                    </p>
                        ${img}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(".form__submit").prop("disabled", false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください');
    });
    return false;
  });

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){    
    var href = 'api/messages#index {:format=>"json"}'              
    var last_message_id = $('.message:last').data('message-id');   
    
      $.ajax({
        url:  href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })

      .done(function(messages){        
        var insertHTML='';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
      })
      .fail(function(){
        alert("自動メッセージ取得に失敗しました")
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
