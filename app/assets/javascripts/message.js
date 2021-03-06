$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat_main__message--list_name_date_message" data-message-id=${message.id}>
          <div class="chat_main__message--list_name_date_message_name_date">
            <div class="chat_main__message--list_name_date_message_name_date_name">
              ${message.user_name}
            </div>
            <div class="chat_main__message--list_name_date_message_name_date_date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat_main__message--list_name_date_message_message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="chat_main__message--list_name_date_message" data-message-id=${message.id}>
          <div class="chat_main__message--list_name_date_message_name_date">
            <div class="chat_main__message--list_name_date_message_name_date_name">
              ${message.user_name}
            </div>
            <div class="chat_main__message--list_name_date_message_name_date_date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat_main__message--list_name_date_message_message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
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
      $('.chat_main__message--list').append(html);
      $('form')[0].reset();
      $('.chat_main__message--list').animate({ scrollTop: $('.chat_main__message--list')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
  var reloadMessages = function() {
    console.log(reloadMessages)
    var last_message_id = $('.chat_main__message--list_name_date_message:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat_main__message--list').append(insertHTML);
        $('.chat_main__message--list').animate({ scrollTop: $('.chat_main__message--list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});