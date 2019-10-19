$(function() {
  
  function appendSearchUserResult(user) { 
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
    $("#user-search-result").append(html);
  }
  
  function appendUserToMemberList(name, id) {
    var html = `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#chat-group-users").append(html);
  }

  function noneSearchUserResult() {
    var html = `<div class="chat-group-user">
                  該当ユーザーなし
                </div>`
    $("#user-search-result").append(html);
  }

  function judgeSearchUserResult(users) {
    var user_apended_flag = false;
    var menber_names = $('.chat-group-user__name').map(function(index, elem){return $(elem).text();}).get();
    users.forEach(function(user) {
      if ($.inArray(user.user_name, menber_names) < 0) {
        appendSearchUserResult(user);
        user_apended_flag = true;
      }
    });
    return user_apended_flag;
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
  
      .done(function(users) { 
        $("#user-search-result").empty();
          if (!((users.length > 0) ? judgeSearchUserResult(users) : false)) {
              noneSearchUserResult();
            }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $(function(){
      $("#user-search-result").on("click", ".user-search-add", function() {
        var name = $(this).attr("data-user-name");
        var id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendUserToMemberList(name, id);
      });
      $(document).on("click", ".user-search-remove", function() {
        $(this).parent().remove();
      });
    });
  }); 
});

